import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Loader2, 
  FileWarning, 
  Maximize2 
} from "lucide-react";
import pdfjsWorker from "../../pdf-worker-polyfill?worker&url";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  description?: string;
}

export function PdfViewerModal({ isOpen, onClose, pdfUrl, title, description }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [rendering, setRendering] = useState<boolean>(false);
  const [pdfjs, setPdfjs] = useState<any>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  const resolvedPdfUrl = pdfUrl.startsWith("/")
    ? `${import.meta.env.BASE_URL.replace(/\/$/, "")}${pdfUrl}`
    : pdfUrl;

  const handleDownload = async () => {
    if (!resolvedPdfUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(resolvedPdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = objectURL;
      link.download = `${title || "catalogue"}.pdf`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Unable to download catalogue. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Dynamic import of pdfjs-dist on client side when modal is opened
  useEffect(() => {
    if (!isOpen) return;

    let isCurrent = true;

    import("pdfjs-dist")
      .then((pdfjsLib) => {
        if (!isCurrent) return;
        // Configure PDF.js worker using official Vite-compatible worker url
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        setPdfjs(pdfjsLib);
      })
      .catch((err) => {
        console.error("Error loading PDF.js dynamically:", err);
        if (isCurrent) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [isOpen]);

  // Reset states when URL changes
  useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
      // Auto-set scale based on window width
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setScale(0.65);
        } else if (window.innerWidth < 1024) {
          setScale(1.0);
        } else {
          setScale(1.25);
        }
      }
      setNumPages(null);
      setLoading(true);
      setError(false);
      pdfDocRef.current = null;
    }
  }, [pdfUrl, isOpen]);

  // Load the PDF Document
  useEffect(() => {
    if (!isOpen || !resolvedPdfUrl || !pdfjs) return;

    let isCurrent = true;
    setLoading(true);
    setError(false);

    if (typeof resolvedPdfUrl !== "string" || !resolvedPdfUrl.trim()) {
      console.warn("Invalid or empty PDF URL:", resolvedPdfUrl);
      setError(true);
      setLoading(false);
      return;
    }

    let loadingTask: any = null;

    const checkAndLoadPdf = async () => {
      try {
        loadingTask = pdfjs.getDocument({
          url: resolvedPdfUrl,
          withCredentials: false,
        });

        const pdfDoc = await loadingTask.promise;

        if (!isCurrent) return;

        pdfDocRef.current = pdfDoc;
        setNumPages(pdfDoc.numPages);
        setLoading(false);
        setError(false);
      } catch (err: any) {
        if (
          err?.name !== "RenderingCancelledException" &&
          err?.name !== "AbortError"
        ) {
          console.error("Failed to load PDF:", err);
        }

        if (isCurrent) {
          setError(true);
          setLoading(false);
        }
      }
    };

    checkAndLoadPdf();

    return () => {
      isCurrent = false;
      if (loadingTask) {
        loadingTask.destroy().catch(() => {});
      }
    };
  }, [resolvedPdfUrl, isOpen, pdfjs]);

  // Render the current page on canvas
  useEffect(() => {
    if (loading || error || !pdfDocRef.current || !isOpen) return;

    let isCurrent = true;
    setRendering(true);

    // Cancel existing render task to prevent overlaps
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    pdfDocRef.current.getPage(pageNumber).then(
      (page: any) => {
        if (!isCurrent || !canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        // Calculate viewport
        const viewport = page.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;

        // Set dimensions for high-DPI displays
        canvasRef.current.width = viewport.width * pixelRatio;
        canvasRef.current.height = viewport.height * pixelRatio;
        canvasRef.current.style.width = `${viewport.width}px`;
        canvasRef.current.style.height = `${viewport.height}px`;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0]
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        renderTask.promise.then(
          () => {
            if (isCurrent) {
              setRendering(false);
              renderTaskRef.current = null;
            }
          },
          (err: any) => {
            if (err.name !== "RenderingCancelledException") {
              console.error("Render task failed:", err);
            }
          }
        );
      },
      (err: any) => {
        console.error("Failed to get page:", err);
        setRendering(false);
      }
    );

    return () => {
      isCurrent = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pageNumber, scale, loading, error, isOpen]);

  // Esc key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle page changes
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  // Zoom controls
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const resetZoom = () => {
    if (window.innerWidth < 640) {
      setScale(0.65);
    } else if (window.innerWidth < 1024) {
      setScale(1.0);
    } else {
      setScale(1.25);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand/85 backdrop-blur-md p-2 sm:p-4 overflow-hidden"
          id="pdf-viewer-overlay"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[96vh] w-full max-w-6xl flex-col rounded-2xl bg-card border border-foreground/10 shadow-elegant overflow-hidden"
            id="pdf-modal-container"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3 sm:px-6 sm:py-4 bg-background">
              <div className="flex flex-col max-w-[70%]">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base sm:text-lg font-bold leading-tight truncate">
                    {title}
                  </h3>
                  <span className="hidden sm:inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent tracking-wide uppercase shrink-0">
                    Catalogue
                  </span>
                </div>
                {description && (
                  <p className="text-[10px] sm:text-xs text-foreground/50 mt-0.5 truncate hidden sm:block">
                    {description}
                  </p>
                )}
              </div>

              {/* Top actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {!error && !loading && (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-secondary/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                    title="Download Catalogue PDF"
                    id="pdf-header-download-btn"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-destructive hover:text-destructive-foreground transition-all cursor-pointer shadow-sm border border-foreground/5"
                  title="Close Catalogue"
                  id="pdf-header-close-btn"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Viewer Toolbar */}
            {!error && !loading && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 border-b border-foreground/10 bg-secondary/25 px-4 py-2 sm:px-6">
                {/* Page Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background border border-foreground/5 shadow-sm text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    id="pdf-prev-page-btn"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <span className="text-xs font-medium text-foreground/80">
                    Page <span className="font-bold">{pageNumber}</span> of <span className="font-bold">{numPages || "?"}</span>
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={numPages ? pageNumber >= numPages : true}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background border border-foreground/5 shadow-sm text-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    id="pdf-next-page-btn"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1.5 bg-background border border-foreground/10 px-2 py-1 rounded-full shadow-inner">
                  <button
                    onClick={zoomOut}
                    disabled={scale <= 0.5}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/75 hover:bg-secondary disabled:opacity-40 transition-colors cursor-pointer"
                    title="Zoom Out"
                    id="pdf-zoom-out-btn"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-medium px-2 min-w-[50px] text-center text-foreground/80">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    disabled={scale >= 3.0}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/75 hover:bg-secondary disabled:opacity-40 transition-colors cursor-pointer"
                    title="Zoom In"
                    id="pdf-zoom-in-btn"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <div className="h-4 w-[1px] bg-foreground/10 mx-0.5" />
                  <button
                    onClick={resetZoom}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/75 hover:bg-secondary transition-colors cursor-pointer"
                    title="Reset Zoom"
                    id="pdf-zoom-reset-btn"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-neutral-900/40 p-4 sm:p-6 flex items-start justify-center relative">
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/50"
                  >
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    <p className="text-xs font-semibold tracking-wide text-foreground/60">Loading document renderer...</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
                      <FileWarning className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Catalogue coming soon.</h3>
                    <p className="text-sm text-foreground/65 leading-relaxed mb-6">
                      Our high-resolution catalogue for <strong className="text-foreground">{title}</strong> is currently being prepared and will be available to view and download shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-6 py-2.5 text-xs font-medium text-foreground hover:border-foreground/30 hover:bg-card transition-all cursor-pointer shadow-soft"
                      id="pdf-error-back-btn"
                    >
                      Back to Categories
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Standard Canvas for PDF.js Rendering */}
              {!error && !loading && (
                <div className="relative shadow-2xl rounded bg-white overflow-hidden transition-all duration-150">
                  <canvas ref={canvasRef} className="max-w-full h-auto block" />
                  {rendering && (
                    <div className="absolute inset-0 bg-white/25 backdrop-blur-[1px] flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-accent" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Status / Quick Navigation Bar */}
            {!error && !loading && (
              <div className="flex items-center justify-between border-t border-foreground/10 px-4 py-2 bg-background text-[10px] sm:text-xs text-foreground/45">
                <span className="hidden sm:inline">Use Mouse Scroll / Pinch to Zoom inside the frame</span>
                <span className="sm:hidden">Swipe / Scroll down to view the full page</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground/60">{title}</span>
                  <span>v1.0</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

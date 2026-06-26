export function Logo({ className = "h-10 w-auto", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className} ${invert ? "text-white" : "text-brand"}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-accent shrink-0">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">
        PARAS <span className="text-accent font-sans text-xs font-semibold tracking-[0.2em] ml-1">PACKAGING</span>
      </span>
    </div>
  );
}

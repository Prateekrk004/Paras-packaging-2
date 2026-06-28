export function Logo({ className = "h-10 w-auto", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <img
      src="https://i.ibb.co/MyXPMDCp/Whats-App-Image-2026-06-28-at-22-09-22-removebg-preview.png"
      alt="Paras Packaging"
      className={`${className} object-contain select-none`}
      referrerPolicy="no-referrer"
    />
  );
}

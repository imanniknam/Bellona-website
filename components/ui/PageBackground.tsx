export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-page-mesh" />
      <div className="absolute -top-[20%] left-[10%] w-[700px] h-[700px] rounded-full opacity-50 bg-[radial-gradient(circle,rgba(34,211,255,0.18)_0%,transparent_70%)] hidden md:block" />
      <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-40 bg-[radial-gradient(circle,rgba(139,92,255,0.16)_0%,transparent_70%)] hidden md:block" />
      <div className="absolute inset-0 grid-bg opacity-10 md:opacity-20" />
    </div>
  );
}

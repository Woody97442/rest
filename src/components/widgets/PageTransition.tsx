export const PageTransition = ({
  phase,
}: {
  phase: "enter" | "exit" | null;
}) => {
  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div
        className={`transition-circle ${
          phase === "exit" ? "animate-exit" : "animate-enter"
        }`}
      />
    </div>
  );
};

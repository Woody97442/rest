import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RedirectContextType = {
  redirectTo: (path: string) => void;
};

const RedirectContext = createContext<RedirectContextType>({
  redirectTo: () => {},
});

export const useRedirect = () => useContext(RedirectContext);

export const RedirectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transitionPhase, setTransitionPhase] = useState<
    "enter" | "exit" | null
  >(null);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (path: string) => {
    if (path === location.pathname) return;
    setTransitionPhase("exit");
    setTargetPath(path);
  };

  useEffect(() => {
    if (transitionPhase === "exit" && targetPath) {
      const timeout = setTimeout(() => {
        navigate(targetPath);
        requestAnimationFrame(() => {
          setTransitionPhase("enter");
          setTimeout(() => setTransitionPhase(null), 800); // durée du shrink
        });
      }, 800); // durée de l'expansion
      return () => clearTimeout(timeout);
    }
  }, [transitionPhase, targetPath]);

  return (
    <RedirectContext.Provider value={{ redirectTo }}>
      {transitionPhase && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
          <div
            className={`transition-circle ${
              transitionPhase === "exit" ? "animate-exit" : "animate-enter"
            }`}
            style={{ zIndex: 10 }}
          />
          <span
            className="text-primary text-4xl font-bold absolute"
            style={{ zIndex: 20 }}>
            Rest
          </span>
        </div>
      )}
      {children}
    </RedirectContext.Provider>
  );
};

import { Auth } from "./Users/Auth";
import { PageTransition } from "./widgets/PageTransition";
import { useRedirect } from "@/context/RedirectContext";

export const Header = () => {
  const { redirectTo } = useRedirect();

  return (
    <header className="relative z-50 bg-dark backdrop-blur-md text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center z-10">
        <button
          onClick={() => redirectTo("/")}
          className="hover:scale-110 cursor-pointer w-6 h-6 flex items-center justify-center mx-2">
          <div className="flex items-center space-y-2 flex-col">
            <span className="text-3xl font-bold text-primary">Rest</span>
          </div>
        </button>
      </div>
      <div className="relative flex items-center z-10">
        <Auth />
      </div>
    </header>
  );
};

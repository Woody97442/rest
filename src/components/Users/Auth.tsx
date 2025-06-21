import { useState, useRef, useEffect } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ParseJwt } from "@/tools/tools";
import { useRedirect } from "@/context/RedirectContext";
const apiBaseUrl =
  import.meta.env.VITE_MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_BASE_URL;

export const Auth = () => {
  const { redirectTo } = useRedirect();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const loginRef = useRef<HTMLDivElement | null>(null);
  const signupRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<{ name?: string; email: string } | null>(
    null
  );

  // États pour l'inscription
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // États pour la connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = ParseJwt(token);
      if (payload) {
        setUser({ name: payload.name, email: payload.email });
      }
    }
  }, []);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmit = async () => {
    setSignupError(null);
    setSignupSuccess(false);

    try {
      const res = await fetch(apiBaseUrl + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Erreur lors de l'inscription");

      setSignupSuccess(true);
      setSignupData({ name: "", email: "", password: "" });
    } catch (err: any) {
      setSignupError(err.message);
    }
  };

  const handleLoginSubmit = async () => {
    setLoginError(null);
    setLoginSuccess(false);

    try {
      const res = await fetch(apiBaseUrl + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la connexion");

      localStorage.setItem("token", data.token);
      setUser({ name: data.name, email: data.email });
      setLoginSuccess(true);
      setLoginData({ email: "", password: "" });
      setShowLoginForm(false);
      // Recharger la page
      window.location.reload();
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.pathname = "/";
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-6">
            <span className="  flex flex-col items-center text-white">
              <button
                onClick={() => redirectTo("/account")}
                className="hover:scale-110 flex flex-col items-center">
                <div className="flex items-center space-y-2 flex-col">
                  <User className="w-6 h-6 mb-1 cursor-pointer hover:text-primary" />
                  <span className="text-sm">{user.name || user.email}</span>
                </div>
              </button>
            </span>
            <button
              onClick={handleLogout}
              title="Déconnexion"
              className="hover:scale-110">
              <div className="flex items-center space-y-2 flex-col">
                <LogOut className="cursor-pointer w-6 h-6 hover:text-primary" />
                <span className="text-xs">Déconnexion</span>
              </div>
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setShowLoginForm((prev) => !prev);
                setShowSignupForm(false);
              }}
              className="hover:scale-110"
              title="Connexion">
              <div className="flex items-center space-y-2 flex-col">
                <LogIn className="cursor-pointer w-6 h-6 hover:text-primary" />
                <span className="text-xs">Connexion</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowSignupForm((prev) => !prev);
                setShowLoginForm(false);
              }}
              title="Inscription"
              className="hover:scale-110">
              <div className="flex items-center space-y-2 flex-col">
                <UserPlus className="cursor-pointer w-6 h-6 hover:text-primary" />
                <span className="text-xs">Inscription</span>
              </div>
            </button>
          </>
        )}

        <button
          onClick={() => redirectTo("/cart")}
          className="hover:scale-110 cursor-pointer w-6 h-6 flex items-center justify-center mx-2">
          <div className="flex items-center space-y-2 flex-col">
            <ShoppingCart className="w-6 h-6 hover:text-primary" />
            <span className="text-xs">Panier</span>
          </div>
        </button>
      </div>

      {/* Formulaire Inscription */}
      <AnimatePresence>
        {showSignupForm && (
          <motion.div
            ref={signupRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-6 mt-2 bg-white text-black shadow-xl rounded-lg p-4 w-72 z-50">
            <h3 className="font-semibold text-lg mb-2">Inscription</h3>
            <input
              name="name"
              type="text"
              placeholder="Nom"
              className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
              value={signupData.name}
              onChange={handleSignupChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="w-full mb-3 px-3 py-2 border rounded-md text-sm"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />

            {signupError && (
              <p className="text-red-600 text-xs mb-2">
                Erreur lors de l'inscription
              </p>
            )}
            {signupSuccess && (
              <p className="text-green-600 text-xs mb-2">
                Compte créé avec succès !
              </p>
            )}

            <button
              onClick={handleSignupSubmit}
              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-opacity-90 transition mb-2">
              Valider
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulaire Connexion */}
      <AnimatePresence>
        {showLoginForm && (
          <motion.div
            ref={loginRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-6 mt-2 bg-white text-black shadow-xl rounded-lg p-4 w-72 z-50">
            <h3 className="font-semibold text-lg mb-2">Connexion</h3>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-2 px-3 py-2 border rounded-md text-sm"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="w-full mb-3 px-3 py-2 border rounded-md text-sm"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            {loginError && (
              <p className="text-red-600 text-xs mb-2">Erreur de connexion</p>
            )}
            {loginSuccess && (
              <p className="text-green-600 text-xs mb-2">Connexion réussie !</p>
            )}

            <button
              onClick={handleLoginSubmit}
              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-primary-90 transition mb-2">
              Valider
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

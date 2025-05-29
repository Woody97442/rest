import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ParseJwt } from "@/tools/tools";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const Auth = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const loginRef = useRef(null);
    const signupRef = useRef(null);
    const [user, setUser] = useState(null);
    // États pour l'inscription
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [signupError, setSignupError] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);
    // États pour la connexion
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
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
    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };
    const handleLoginChange = (e) => {
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
        }
        catch (err) {
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
            if (!res.ok)
                throw new Error(data.error || "Erreur lors de la connexion");
            localStorage.setItem("token", data.token);
            setUser({ name: data.name, email: data.email });
            setLoginSuccess(true);
            setLoginData({ email: "", password: "" });
            setShowLoginForm(false);
            // Recharger la page
            window.location.reload();
        }
        catch (err) {
            setLoginError(err.message);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-4", children: [user ? (_jsxs("div", { className: "flex items-center space-x-6", children: [_jsx("span", { className: "text-lg text-white", children: _jsx(Link, { to: "/account", title: "account", children: user.name || user.email }) }), _jsx("button", { onClick: handleLogout, title: "D\u00E9connexion", children: _jsx(LogOut, { className: "cursor-pointer w-6 h-6 hover:text-red-500" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => {
                                    setShowLoginForm((prev) => !prev);
                                    setShowSignupForm(false);
                                }, title: "Connexion", children: _jsx(LogIn, { className: "cursor-pointer w-6 h-6 hover:text-accent" }) }), _jsx("button", { onClick: () => {
                                    setShowSignupForm((prev) => !prev);
                                    setShowLoginForm(false);
                                }, title: "Inscription", children: _jsx(UserPlus, { className: "cursor-pointer w-6 h-6 hover:text-accent" }) })] })), _jsx(Link, { to: "/cart", title: "Panier", children: _jsx(ShoppingCart, { className: "w-6 h-6 hover:text-accent" }) })] }), _jsx(AnimatePresence, { children: showSignupForm && (_jsxs(motion.div, { ref: signupRef, initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.25 }, className: "absolute top-full right-6 mt-2 bg-white text-black shadow-xl rounded-lg p-4 w-72 z-50", children: [_jsx("h3", { className: "font-semibold text-lg mb-2", children: "Inscription" }), _jsx("input", { name: "name", type: "text", placeholder: "Nom", className: "w-full mb-2 px-3 py-2 border rounded-md text-sm", value: signupData.name, onChange: handleSignupChange, required: true }), _jsx("input", { name: "email", type: "email", placeholder: "Email", className: "w-full mb-2 px-3 py-2 border rounded-md text-sm", value: signupData.email, onChange: handleSignupChange, required: true }), _jsx("input", { name: "password", type: "password", placeholder: "Mot de passe", className: "w-full mb-3 px-3 py-2 border rounded-md text-sm", value: signupData.password, onChange: handleSignupChange, required: true }), signupError && (_jsx("p", { className: "text-red-600 text-xs mb-2", children: "Erreur lors de l'inscription" })), signupSuccess && (_jsx("p", { className: "text-green-600 text-xs mb-2", children: "Compte cr\u00E9\u00E9 avec succ\u00E8s !" })), _jsx("button", { onClick: handleSignupSubmit, className: "cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-opacity-90 transition mb-2", children: "OK" })] })) }), _jsx(AnimatePresence, { children: showLoginForm && (_jsxs(motion.div, { ref: loginRef, initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.25 }, className: "absolute top-full right-6 mt-2 bg-white text-black shadow-xl rounded-lg p-4 w-72 z-50", children: [_jsx("h3", { className: "font-semibold text-lg mb-2", children: "Connexion" }), _jsx("input", { name: "email", type: "email", placeholder: "Email", className: "w-full mb-2 px-3 py-2 border rounded-md text-sm", value: loginData.email, onChange: handleLoginChange, required: true }), _jsx("input", { name: "password", type: "password", placeholder: "Mot de passe", className: "w-full mb-3 px-3 py-2 border rounded-md text-sm", value: loginData.password, onChange: handleLoginChange, required: true }), loginError && (_jsx("p", { className: "text-red-600 text-xs mb-2", children: "Erreur de connexion" })), loginSuccess && (_jsx("p", { className: "text-green-600 text-xs mb-2", children: "Connexion r\u00E9ussie !" })), _jsx("button", { onClick: handleLoginSubmit, className: "cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-primary-90 transition mb-2", children: "OK" })] })) })] }));
};

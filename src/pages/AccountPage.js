import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserService } from "@/services/user.service";
const AccountPage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [showSidebar, setShowSidebar] = useState("account");
    const [newProfilName, setNewProfilName] = useState("");
    const [profilNameError, setProfilNameError] = useState("");
    const [profilNameSuccess, setProfilNameSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const LoadMyProfil = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await UserService.getUserProfile(token);
            if (response.success) {
                setUser(response.data);
            }
        }
        catch (error) {
            console.error("Error loading cart:", error);
        }
    };
    useEffect(() => {
        LoadMyProfil();
    }, []);
    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        if (!currentPassword) {
            setPasswordError("Veuillez entrer votre mot de passe actuel.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await UserService.updateProfilPassword(currentPassword, newPassword, token);
            if (!response.success) {
                throw new Error(response.message || "Erreur lors de la modification du mot de passe");
            }
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPasswordError("");
        }
        catch (err) {
            setPasswordError(err.message);
        }
    };
    const handleProfilNameSubmit = async () => {
        if (newProfilName.length < 3) {
            setProfilNameError("Le nom doit contenir au moins 3 caractères.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await UserService.updateProfileName(newProfilName, token);
            if (!response.success) {
                throw new Error(response.message || "Erreur lors de la modification du nom");
            }
            setUser({ ...user, name: newProfilName });
            setProfilNameSuccess(true);
            setProfilNameError("");
            setNewProfilName("");
        }
        catch (err) {
            setProfilNameError(err.message);
        }
    };
    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await UserService.deleteProfil(token);
            if (!response.success) {
                throw new Error(response.message || "Erreur lors de la suppression du compte");
            }
            setShowModal(false);
            // Déconnexion et redirection après suppression
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        catch (err) {
            console.error(err.message);
        }
    };
    return (_jsxs("div", { className: "bg-soft min-h-screen text-dark font-sans", children: [_jsx(Header, {}), _jsxs("div", { className: "flex", children: [_jsxs("div", { className: "w-64 bg-dark text-white p-6 h-screen", children: [_jsx("h3", { className: "text-xl font-semibold mb-6", children: "Param\u00E8tres du compte" }), _jsxs("div", { className: "space-y-4", children: [_jsx("button", { className: `w-full text-left py-2 px-4 rounded-md ${showSidebar === "account" ? "bg-gray-700" : ""}`, onClick: () => setShowSidebar("account"), children: "Mon compte" }), _jsx("button", { className: `w-full text-left py-2 px-4 rounded-md ${showSidebar === "orders" ? "bg-gray-700" : ""}`, onClick: () => setShowSidebar("orders"), children: "Mes commandes" })] })] }), _jsxs("div", { className: "flex-1 p-8 bg-gray-100", children: [showSidebar === "account" && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Mon compte" }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col space-y-4", children: [_jsx("h3", { className: "font-semibold text-xl mb-4", children: "Informations du compte" }), _jsxs("p", { children: ["Email : ", user.email] }), _jsxs("p", { children: ["Nom : ", user.name] }), _jsx("input", { type: "text", className: "w-full px-4 py-2 border rounded-md", placeholder: "Noveau nom", value: newProfilName, onChange: (e) => setNewProfilName(e.target.value) }), profilNameError && (_jsx("p", { className: "text-red-600", children: "Erreur de modification" })), profilNameSuccess && (_jsx("p", { className: "text-green-600", children: "Nom de profil modifi\u00E9 avec succ\u00E8s !" })), _jsx("button", { onClick: handleProfilNameSubmit, className: "cursor-pointer bg-primary text-white px-6 py-2 rounded-md w-full ", children: "Modifier son nom de profil" })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg mb-6", children: [_jsx("h3", { className: "font-semibold text-xl mb-4", children: "Modifier mon mot de passe" }), passwordError && (_jsx("p", { className: "text-red-600", children: passwordError })), passwordSuccess && (_jsx("p", { className: "text-green-600", children: "Mot de passe modifi\u00E9 avec succ\u00E8s !" })), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { type: "password", className: "w-full px-4 py-2 border rounded-md", placeholder: "Ancien mot de passe", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value) }), _jsx("input", { type: "password", className: "w-full px-4 py-2 border rounded-md", placeholder: "Nouveau mot de passe", value: newPassword, onChange: (e) => setNewPassword(e.target.value) }), _jsx("input", { type: "password", className: "w-full px-4 py-2 border rounded-md", placeholder: "Confirmer le mot de passe", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) }), _jsx("button", { onClick: handlePasswordSubmit, className: "cursor-pointer bg-primary text-white px-6 py-2 rounded-md w-full mt-4", children: "Modifier le mot de passe" })] })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg relative", children: [_jsx("h3", { className: "font-semibold text-xl mb-4 text-red-600", children: "Supprimer mon compte" }), _jsx("p", { className: "text-red-600 mb-4", children: "Cette action est irr\u00E9versible et supprimera toutes vos donn\u00E9es personnelles." }), _jsx("button", { onClick: () => setShowModal(true), className: "cursor-pointer bg-red-600 text-white px-6 py-2 rounded-md w-full", children: "Supprimer le compte" }), _jsx(AnimatePresence, { children: showModal && (_jsx(motion.div, { className: "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsxs(motion.div, { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.8, opacity: 0 }, transition: { duration: 0.2 }, children: [_jsx("h4", { className: "text-lg font-bold text-red-600 mb-4", children: "Confirmer la suppression" }), _jsxs("p", { className: "mb-6", children: ["\u00CAtes-vous s\u00FBr de vouloir supprimer votre compte ? Cette action est ", _jsx("strong", { children: "d\u00E9finitive" }), "."] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx("button", { onClick: () => setShowModal(false), className: "cursor-pointer px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300", children: "Annuler" }), _jsx("button", { onClick: handleDeleteAccount, className: "cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700", children: "Confirmer" })] })] }) })) })] })] })), showSidebar === "orders" && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Mes commandes" }), _jsx("div", { className: "bg-white p-6 rounded-lg shadow-lg", children: _jsx("p", { children: "Aucune commande trouv\u00E9e." }) })] }))] })] }), _jsx(Footer, {})] }));
};
export default AccountPage;

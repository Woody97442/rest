import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParseJwt } from "@/tools/tools";
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
    } catch (error) {
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
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères."
      );
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

      const response = await UserService.updateProfilPassword(
        currentPassword,
        newPassword,
        token
      );

      if (!response.success) {
        throw new Error(
          response.message || "Erreur lors de la modification du mot de passe"
        );
      }

      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (err: any) {
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

      const response = await UserService.updateProfileName(
        newProfilName,
        token
      );

      if (!response.success) {
        throw new Error(
          response.message || "Erreur lors de la modification du nom"
        );
      }

      setUser({ ...user, name: newProfilName });

      setProfilNameSuccess(true);
      setProfilNameError("");
      setNewProfilName("");
    } catch (err: any) {
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
        throw new Error(
          response.message || "Erreur lors de la suppression du compte"
        );
      }

      setShowModal(false);

      // Déconnexion et redirection après suppression
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-soft min-h-screen text-dark font-sans">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-dark text-white p-6 h-screen">
          <h3 className="text-xl font-semibold mb-6">Paramètres du compte</h3>
          <div className="space-y-4">
            <button
              className={`w-full text-left py-2 px-4 rounded-md ${
                showSidebar === "account" ? "bg-gray-700" : ""
              }`}
              onClick={() => setShowSidebar("account")}>
              Mon compte
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded-md ${
                showSidebar === "orders" ? "bg-gray-700" : ""
              }`}
              onClick={() => setShowSidebar("orders")}>
              Mes commandes
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-100">
          {showSidebar === "account" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-6">Mon compte</h1>
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col space-y-4">
                <h3 className="font-semibold text-xl mb-4">
                  Informations du compte
                </h3>
                <p>Email : {user.email}</p>
                <p>Nom : {user.name}</p>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Noveau nom"
                  value={newProfilName}
                  onChange={(e) => setNewProfilName(e.target.value)}
                />
                {profilNameError && (
                  <p className="text-red-600">Erreur de modification</p>
                )}
                {profilNameSuccess && (
                  <p className="text-green-600">
                    Nom de profil modifié avec succès !
                  </p>
                )}
                <button
                  onClick={handleProfilNameSubmit}
                  className="cursor-pointer bg-primary text-white px-6 py-2 rounded-md w-full ">
                  Modifier son nom de profil
                </button>
              </div>
              {/* Change Password */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h3 className="font-semibold text-xl mb-4">
                  Modifier mon mot de passe
                </h3>
                {passwordError && (
                  <p className="text-red-600">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-600">
                    Mot de passe modifié avec succès !
                  </p>
                )}

                <div className="space-y-4">
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Ancien mot de passe"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button
                    onClick={handlePasswordSubmit}
                    className="cursor-pointer bg-primary text-white px-6 py-2 rounded-md w-full mt-4">
                    Modifier le mot de passe
                  </button>
                </div>
              </div>

              {/* Delete Account */}
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <h3 className="font-semibold text-xl mb-4 text-red-600">
                  Supprimer mon compte
                </h3>
                <p className="text-red-600 mb-4">
                  Cette action est irréversible et supprimera toutes vos données
                  personnelles.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-md w-full">
                  Supprimer le compte
                </button>

                <AnimatePresence>
                  {showModal && (
                    <motion.div
                      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <h4 className="text-lg font-bold text-red-600 mb-4">
                          Confirmer la suppression
                        </h4>
                        <p className="mb-6">
                          Êtes-vous sûr de vouloir supprimer votre compte ?
                          Cette action est <strong>définitive</strong>.
                        </p>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => setShowModal(false)}
                            className="cursor-pointer px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300">
                            Annuler
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                            Confirmer
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {showSidebar === "orders" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-6">Mes commandes</h1>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Display orders here */}
                <p>Aucune commande trouvée.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;

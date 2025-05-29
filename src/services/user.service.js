import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const UserService = {
    getUserProfile: async (token) => {
        try {
            const response = await axios.get(apiBaseUrl + "/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true, data: response.data.user };
            }
            else {
                return { success: false, data: {}, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                data: {},
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    updateProfileName: async (newProfilName, token) => {
        try {
            const response = await axios.patch(apiBaseUrl + "/users/update/profil", { newProfilName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    updateProfilPassword: async (currentPassword, newPassword, token) => {
        try {
            const response = await axios.patch(apiBaseUrl + "/users/update/password", { currentPassword, newPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
    deleteProfil: async (token) => {
        try {
            const response = await axios.delete(apiBaseUrl + "/users/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
            else {
                return { success: false, message: response.data?.message || "Erreur inconnue" };
            }
        }
        catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erreur serveur",
            };
        }
    },
};

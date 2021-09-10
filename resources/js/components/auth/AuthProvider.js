import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
    const auth = useAuthProvider();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        data: {
            _id: "",
            type: "",
        },
    });

    const login = async (form) => {
        try {
            const response = await axios.post("/api/login", form);
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: true,
                    data: {
                        _id: response.data._id,
                        type: response.data._type,
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    const register = async (form) => {
        try {
            const response = await axios.post("/api/ched", form); // for univ login
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: true,
                    data: {
                        _id: response.data._id,
                        type: response.data.type,
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get("/api/logout");
            if (response.status === 200) {
                let userData = {
                    isLoggedIn: false,
                    data: {
                        _id: "",
                        type: "",
                    },
                };

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    };

    useEffect(() => {
        const local = localStorage.getItem("user");
        if (local && !user.isLoggedIn) {
            const localData = JSON.parse(local);
            setUser(localData);
        }
    }, []);

    return {
        user,
        login,
        register,
        logout,
    };
};

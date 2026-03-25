import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {
  login,
  logout,
  register,
  getUserDetails,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.loggedInUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, age, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, age, password });
      setUser(data.createdUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getUserDetails();
      setUser(data.userObj);
      setLoading(false);
    };

    getAndSetUser();
  });

  return { user, loading, handleRegister, handleLogin, handleLogout };
};

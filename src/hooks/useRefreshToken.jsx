import useAuth from "./useAuth";
import { refreshToken } from "../services/auth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await refreshToken();
    setAuth((prev) => {
      const updatedAuth = {
        ...prev,
        accessToken: response.token,
        roles: response.roles, 
      };
      localStorage.setItem('roles', JSON.stringify(response.roles)); 
      return updatedAuth;
    });

    return response;
  };

  return refresh;
};

export default useRefreshToken;

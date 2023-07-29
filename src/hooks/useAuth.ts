import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import isEmpty from "lodash/isEmpty";

import * as ROUTES from "@/constants/routes";
import { useRequestProcessor } from "@/settings/react-query";
import axios from "@/settings/axios";
import useAuthStore from "@/store/authStore";
import { REQUEST_AUTH_GOOGLE } from "@/constants/apis";

function useAuth() {
  const { mutation } = useRequestProcessor();
  const { login, logout, userProfile } = useAuthStore();

  const navigate = useNavigate();
  const authMutation = mutation(
    ["user-profile"],
    (token) => {
      return axios.post(REQUEST_AUTH_GOOGLE, {
        accessToken: token,
      });
    },
    {
      onSuccess: (data) => {
        login(data.data.accessToken, data.data.profile, data.data.expiresIn);
        navigate(ROUTES.SESSIONS_TODAY);
      },
    }
  );
  const loginWithGoogle = async (token: string) => {
    authMutation.mutate(token);
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response.access_token);
    },
  });

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };
  const isAuthenticated = !isEmpty(userProfile);

  const getTokenDuration = () => {
    const expirationDate = new Date(localStorage.getItem("expiration"));
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated,
    userProfile,
    getTokenDuration,
  };
}

export default useAuth;

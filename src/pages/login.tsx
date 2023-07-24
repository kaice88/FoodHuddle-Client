import { useNavigate } from 'react-router-dom';
import { Button, Center, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { IconLogin } from '@tabler/icons-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import Logo from '@/components/logo/logo';
import useAuthStore from '../store/authStore';

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse.access_token);
    },
  });

  const mutation = useMutation({
    mutationFn: (token) => {
      return axios.post('http://localhost:3003/api/v1/auth/google/callback', {
        accessToken: token,
      });
    },
    onSuccess: (data) => {
      login(data.data.accessToken, data.data.profile);
      navigate('/sessions-today');
    },
  });

  const getUserProfile = async (token: string) => {
    mutation.mutate(token);
  };

  return (
    <Center className="auth">
      <Logo className="auth__logo"></Logo>
      <div className="auth__form">
        <Title align="center" sx={() => ({ fontWeight: 500, fontSize: '25px' })}>
          Welcome to FoodHuddle,
        </Title>
        <Title align="center" sx={() => ({ fontWeight: 500, fontSize: '25px' })}>
          Let’s order some food right now!
        </Title>
        <Button
          variant="light"
          leftIcon={<IconLogin size="1rem" />}
          fullWidth
          onClick={() => handleLogin()}
          className="auth__form__button"
        >
          Login with NFQ account
        </Button>
      </div>
      <Title align="center" p="xs" sx={() => ({ fontWeight: 400, fontSize: '14px' })}>
        FoodHuddle v1 @
      </Title>
    </Center>
  );
}

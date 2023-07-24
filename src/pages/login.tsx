import { Button, Center,Title } from '@mantine/core'
import axios from 'axios'
import { useQuery } from 'react-query';
import { IconLogin } from '@tabler/icons-react'
import { useGoogleLogin } from '@react-oauth/google';


import Logo from '@/components/logo/logo'
import { useState } from 'react';

export default function LoginPage() {
  const handleLogin = useGoogleLogin({
    onSuccess: tokenResponse => getUserProfile(tokenResponse.access_token),
  });
  const getUserProfile = async (accessToken:string) => {
      try {
        const response = await axios.post('/api',{
          accessToken
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <Center className="auth">
      <Logo className="auth__logo"></Logo>
      <div className="auth__form">
      <Title
        align="center"
        sx={() => ({ fontWeight: 500, fontSize:'25px' })}
      >
        Welcome to FoodHuddle,
       
      </Title>
      <Title
        align="center"
        sx={() => ({ fontWeight: 500, fontSize:'25px' })}
      >
        Let’s order some food right now!
      </Title>
      <Button  variant="light" leftIcon={<IconLogin size="1rem" />} fullWidth onClick={() => handleLogin()} className='auth__form__button'>
        Login with NFQ account</Button>
      </div>
      <Title
        align="center"
        p='xs'
        sx={() => ({ fontWeight: 400, fontSize:'14px' })}
      >
       FoodHuddle v1 @
      </Title>
      
    </Center>
  )
}

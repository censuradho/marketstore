import { API_ERROR_MESSAGES } from "@/constants/messages";
import { paths } from "@/constants/routes";
import { useLocalStorage } from "@/hooks";
import { api } from "@/service/api";
import { authService } from "@/service/api/auth";
import { SignInWithEmailPasswordPayload, SignUpRequest } from "@/service/api/auth/types";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useToast } from "../toast";
import { Auth, AuthContextProps, Role } from "./types";

const AuthContext = createContext({} as AuthContextProps)

export const AUTH_KEY = '@teste-frontend'

export function AuthProvider ({ children }: PropsWithChildren) {
  const router = useRouter()
  const { onNotify } = useToast()

  const [auth, setAuth] = useLocalStorage<Auth | null>(AUTH_KEY, null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginWithEmailPassword = async (payload: SignInWithEmailPasswordPayload) => {
    try {
      setIsLoading(true)
      const { data } = await authService.signInWithEmailPassword(payload)

      api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`

      const { data: me } = await authService.me()

      setAuth(me)

      router.push(router.pathname)

      return me
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUpWithEmailPassword = async (payload: SignUpRequest) => {
    const { data } = await authService.signUpWithEmailPassword(payload)

    setAuth(data)
  }

  const handleSignOut = () => {
    authService.signOut()
    setAuth(null)
  }

  useEffect(() => {
    api.interceptors.response.use(
      response => response,
      (error) => { 

        const errorMessage = API_ERROR_MESSAGES?.[error?.response?.data?.description as keyof typeof API_ERROR_MESSAGES] || ''

        
        const isError = error?.response?.status === 401
        const { status } = error?.response

        console.log(errorMessage)
        if (status > 400 && status < 500) {
          onNotify({
            title: 'Atenção! 🚨',
            description: errorMessage
          })
          if (isError) handleSignOut()
        }

        return Promise.reject(error);
      });
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        isAdmin: auth?.role === Role.admin,
        isSigned: !!auth,
        onLoginWithEmailPassword: handleLoginWithEmailPassword,
        onSignUp: handleSignUpWithEmailPassword,
        onSignOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
import { API_ERROR_MESSAGES } from "@/constants/messages";
import { paths } from "@/constants/routes";
import { useLocalStorage } from "@/hooks";
import { api } from "@/service/api";
import { authService } from "@/service/api/auth";
import { SignInWithEmailPasswordPayload } from "@/service/api/auth/types";
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

      setAuth(data)
      return data
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    authService.signOut()
    router.push(paths.auth.signIn)
    setAuth(null)
  }

  useEffect(() => {
    api.interceptors.response.use(
      response => response,
      (error) => { 
        console.log(error)

        const errorMessage = API_ERROR_MESSAGES?.[error?.response?.data?.message as keyof typeof API_ERROR_MESSAGES] || ''

        const isError = error?.response?.data?.status === 401

        if (isError) {
          onNotify({
            title: 'Atenção! 🚨',
            description: errorMessage
          })
          handleSignOut()
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
        onSignOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
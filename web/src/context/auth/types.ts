import { SignInWithEmailPasswordPayload, SignInWithEmailPasswordResponse } from "@/service/api/auth/types"

export enum Role {
  admin = 'admin'
}

export interface Auth extends SignInWithEmailPasswordResponse {}

export interface AuthContextProps {
  auth: Auth | null
  isAdmin?: boolean
  isLoading: boolean
  isSigned: boolean
  onLoginWithEmailPassword: (payload: SignInWithEmailPasswordPayload) => Promise<SignInWithEmailPasswordResponse>
  onSignOut: () => void
}
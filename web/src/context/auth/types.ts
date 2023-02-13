import { Me, SignInWithEmailPasswordPayload, SignUpRequest } from "@/service/api/auth/types"

export enum Role {
  admin = 'admin'
}

export interface Auth  {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  created_at: string
}

export interface AuthContextProps {
  auth: Auth | null
  isAdmin?: boolean
  isLoading: boolean
  isSigned: boolean
  onLoginWithEmailPassword: (payload: SignInWithEmailPasswordPayload) => Promise<Me>
  onSignOut: () => void
  onSignUp: (payload: SignUpRequest) => Promise<void>
}
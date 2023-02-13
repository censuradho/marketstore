import { api } from ".."
import { 
  SignInWithEmailPasswordPayload, 
  SignInWithEmailPasswordResponse 
} from "./types"

function signInWithEmailPassword (payload: SignInWithEmailPasswordPayload) {
  return api.post<SignInWithEmailPasswordResponse>('/auth/login', payload)
}

function signOut () {
  delete api.defaults.headers['Authorization']
}

export const authService = {
  signInWithEmailPassword,
  signOut
}
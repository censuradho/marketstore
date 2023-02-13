import { api } from ".."
import { 
  Me,
  SignInWithEmailPasswordPayload, 
  SignInWithEmailPasswordResponse, 
  SignUpRequest, 
  SignUpResponse
} from "./types"

function signOut () {
  delete api.defaults.headers['Authorization']
}

function signInWithEmailPassword (payload: SignInWithEmailPasswordPayload) {
  signOut()
  return api.post<SignInWithEmailPasswordResponse>('/auth/login', payload)
}

export function signUpWithEmailPassword (payload: SignUpRequest) {
  return api.post<SignUpResponse>('/auth/sign-up', payload)
}

export function me () {
  return api.get<Me>('/auth/me')

}

export const authService = {
  signInWithEmailPassword,
  signOut,
  signUpWithEmailPassword,
  me
}
export interface SignInWithEmailPasswordPayload {
  email: string
  password: string
}

export interface SignInWithEmailPasswordResponse {
  id: string
  access_token: string
  email: string
  role: string
}
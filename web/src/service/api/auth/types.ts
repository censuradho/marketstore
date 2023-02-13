export interface SignInWithEmailPasswordPayload {
  email: string
  password: string
}

export interface SignInWithEmailPasswordResponse {
  access_token: string
}


export interface SignUpRequest {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface SignUpResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  username: string
  created_at: string
}

export interface Me {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  created_at: string
  username: string
}
import { useAuth } from "@/context"
import { Role } from "@/context/auth/types"
import { PropsWithChildren } from "react"

export function AdminView ({ children }: PropsWithChildren) {
  const{ auth } = useAuth()

  if (auth?.role !== Role.admin) return null
  return (
    <>
      {children}
    </>
  )
}
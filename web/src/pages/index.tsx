import { HomeLayout } from "@/layout/app/home"
import { MainLayout } from "@/layout/app/main"

export default function HomePage () {
  return (
    <MainLayout>
      <HomeLayout />
    </MainLayout>
  )
}
import { withAuthorization } from "@/hoc";
import { MainLayout } from "@/layout/app/main";
import { ProductLayout } from "@/layout/app/product";

function ProductPage () {
  return (
    <MainLayout>
      <ProductLayout />
    </MainLayout>
  )
}


export default withAuthorization(ProductPage)
import { withAuthorization } from "@/hoc";
import { MainLayout } from "@/layout/app/main";
import { ReportLayout } from "@/layout/app/repot";

function ReportPage () {
  return (
    <MainLayout>
      <ReportLayout />
    </MainLayout>
  )
}


export default withAuthorization(ReportPage)
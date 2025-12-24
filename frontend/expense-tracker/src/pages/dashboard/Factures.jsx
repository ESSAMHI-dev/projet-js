import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Factures = () => {
    useUserAuth();
  return (
    <DashboardLayout activeMenu="Factures">
      <div className="my-5 mx-auto dark:text-white">
        <div>Factures</div>
      </div>
    </DashboardLayout>
  )
}

export default Factures
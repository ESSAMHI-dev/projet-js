import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'

const Reports = () => {
    useUserAuth();
  return (
    <DashboardLayout activeMenu="Reports">
      <div className="my-5 mx-auto dark:text-white">
        <div>Reports</div>
      </div>
    </DashboardLayout>
  )
}

export default Reports
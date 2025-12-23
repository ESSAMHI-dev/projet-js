import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { UserContext } from '../../context/UserContext';
import CharAvatar from '../../components/Cards/CharAvatar';

const Profile = () => {
    useUserAuth();

    const { user, clearUser } = useContext(UserContext);
  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto dark:text-white">
        <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
      </div>
    </DashboardLayout>
  )
}

export default Profile
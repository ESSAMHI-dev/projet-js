import React, { useContext, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../../components/Cards/CharAvatar";
import { LuUser, LuMail, LuCalendar, LuShield } from "react-icons/lu";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/Modal";
import Input from "../../components/Inputs/Input";
import { API_PATHS } from "../../utils/apiPaths";

const Profile = () => {
  useUserAuth();

  const { user, clearUser, setUser } = useContext(UserContext);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleDeleteAccount = async () => {
    try {
      let userId = user?._id;
      if (!userId) {
        toast.error("User ID not found.");
        return;
      }
      await axiosInstance.delete(API_PATHS.AUTH.DELETE_USER, {
        data: { userId },
      });
      toast.success("Account deleted successfully.");
      localStorage.clear();
      clearUser();
      window.location.href = "/login";
    } catch (error) {
      toast.error("Error deleting account. Please try again later.");
    }
  };

  const handleUpdateUser = async () => {
    window.location.reload();
    try {
      const updateData = {};

      if (updateForm.fullName.trim()) {
        updateData.fullName = updateForm.fullName;
      }
      if (updateForm.email.trim()) {
        updateData.email = updateForm.email;
      }
      if (updateForm.password.trim()) {
        updateData.password = updateForm.password;
      }

      if (Object.keys(updateData).length === 0) {
        toast.error("Please provide at least one field to update.");
        return;
      }

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_USER,
        updateData
      );

      if (response.data.user) {
        setUser(response.data.user);
        toast.success("Profile updated successfully.");
        setOpenUpdateModal(false);
        setUpdateForm({ fullName: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Error updating profile. Please try again later."
      );
    }
  };

  const openUpdateModalHandler = () => {
    setUpdateForm({
      fullName: user?.fullName || "",
      email: user?.email || "",
      password: "",
    });
    setOpenUpdateModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAccountAge = (createdAt) => {
    if (!createdAt) return "N/A";
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years !== 1 ? "s" : ""}`;
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto max-w-4xl dark:text-white">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <CharAvatar
              fullName={user?.fullName}
              width="w-24"
              height="h-24"
              style="text-3xl"
            />
            <div>
              <h3 className="text-2xl font-semibold">
                {user?.fullName || "N/A"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {user?.email || "N/A"}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                Member for {getAccountAge(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <LuUser className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="text-lg font-medium">
                  {user?.fullName || "Not provided"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <LuMail className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email Address
                </p>
                <p className="text-lg font-medium break-all">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Account Created */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <LuCalendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Created
                </p>
                <p className="text-lg font-medium">
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <LuShield className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  User ID
                </p>
                <p className="text-lg font-medium font-mono break-all">
                  {user?._id || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              handleDeleteAccount();
            }}
          >
            Delete Account
          </button>
          <button
            className="mt-6 ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
            onClick={openUpdateModalHandler}
          >
            Update Account
          </button>
        </div>
      </div>

      {/* Update User Modal */}
      <Modal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        title="Update Profile"
      >
        <div>
          <Input
            value={updateForm.fullName}
            onChange={({ target }) =>
              setUpdateForm({ ...updateForm, fullName: target.value })
            }
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
          <Input
            value={updateForm.email}
            onChange={({ target }) =>
              setUpdateForm({ ...updateForm, email: target.value })
            }
            label="Email Address"
            placeholder="Enter your email"
            type="email"
          />
          <Input
            value={updateForm.password}
            onChange={({ target }) =>
              setUpdateForm({ ...updateForm, password: target.value })
            }
            label="New Password (optional)"
            placeholder="Leave blank to keep current password"
            type="password"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setOpenUpdateModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="add-btn add-btn-fill"
              onClick={handleUpdateUser}
            >
              Update Profile
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Profile;

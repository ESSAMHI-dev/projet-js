import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { useTranslation } from "react-i18next";

const SideMenu = ({ activeMenu }) => {
  const { t } = useTranslation();
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handlelogout();
      return;
    }

    navigate(route);
  };

  const handlelogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white dark:bg-slate-800 border-r border-gray-200/50 dark:border-slate-700 p-5 sticky top-[61px] z-20 transition-colors duration-200">
      <div className="flex flex-col items-center justify-center gap-3 mb-7">
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />

        <h5 className="text-gray-950 dark:text-gray-100 font-medium leading-6 text-center">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] hover:cursor-pointer ${
            activeMenu == item.label 
              ? "text-white bg-primary dark:bg-purple-600" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
          } py-3 px-6 rounded-lg mb-3 transition-colors duration-200`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {t(item.label)}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;

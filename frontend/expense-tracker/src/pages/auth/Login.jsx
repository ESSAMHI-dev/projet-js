import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError(t("enter_valid_email"));
      return;
    }
    if (password.length < 8) {
      setError(t("password_min_length"));
      return;
    }
    if (!password) {
      setError(t("enter_password"));
      return;
    }

    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(t("something_wrong"));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold dark:text-gray-100">{t("welcome_back")}</h3>
        <p className="text-xs text-slate-700 dark:text-slate-400 mt-[5px] mb-6">
          {t("enter_details_login")}
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={t("email")}
            type="email"
            placeholder={t("enter_email")}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={t("password")}
            type="password"
            placeholder={t("min_8_characters")}
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            {t("login").toUpperCase()}
          </button>
          <p className="text-[13px] text-slate-800 dark:text-slate-300">
            {t("no_account")}{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              {t("sign_up")} 
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

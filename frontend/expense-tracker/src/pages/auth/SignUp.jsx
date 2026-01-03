import { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError(t("enter_full_name_error"));
      return;
    }

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
    //Signup API call

    try {

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
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
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(t("something_wrong"));
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg-w[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black dark:text-white">{t("create_account")}</h3>
        <p className="text-xs text-slate-700 dark:text-slate-400 mt-[5px] mb-6">
          {t("join_today")}
        </p>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label={t("full_name")}
              type="text"
              placeholder={t("enter_full_name")}
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={t("email")}
              type="email"
              placeholder={t("enter_email")}
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label={t("password")}
                type="password"
                placeholder={t("min_8_characters")}
              />
              
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            {t("sign_up").toUpperCase()}
          </button>
          <p className="text-[13px] text-slate-800 dark:text-slate-300">
            {t("have_account")}{" "}
            <Link className="font-medium text-primary underline" to="/login">
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

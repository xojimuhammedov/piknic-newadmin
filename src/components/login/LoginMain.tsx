"use client";
import Link from "next/link";

import Image from "next/image";
import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useGlobalContext from "@/hooks/use-context";
import Preloader from "@/sheardComponent/Preloader/Preloader";
import apiUrl from "../../utils/api";

interface FormData {
  phone_number: string;
  password: string;
}

const LoginMain = () => {
  const { loading, setLoading } = useGlobalContext();
  const [loginError, setloginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    console.log(apiUrl);

    const email = data.phone_number;
    const password = data.password;

    const userInfo = {
      phone_number: email,
      password,
    };

    axios
      .post(`${apiUrl}/auth/signin`, userInfo)
      .then((res) => {
        switch (res.data.message) {
          case "Login success":
            const token = res.data.data.tokens.accessToken.token;
            localStorage.setItem("accessToken", token);
            setLoading(false);
            router.push("/");

            break;
          case "password not Match":
            setLoading(false);
            setloginError("Password Not Match");
            break;
          case "user not Valid":
            setLoading(false);
            setloginError("user not Valid");
            break;
          case "custome error":
            setLoading(false);
            setloginError("Inter Valid Into");
            break;
          default:
            setLoading(false);
            break;
        }
      })
      .catch((error) => {});
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-login-area flex justify-center items-center w-full h-full">
        <div className="cashier-login-wrapper">
          <div className="cashier-login-logo text-center mb-12">
            <h3>Admin Panel</h3>
            {/* <Image src={logo} alt="logo not found" /> */}
          </div>

          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone_number", {})}
                />
                {errors.phone_number && (
                  <span className="error-message">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <i className="fa-light fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn">
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye"
                        : "fa-regular fa-eye-slash"
                    }></i>
                </button>
              </span>
            </div>
          </div>
          <span className="error-message">{loginError && loginError}</span>
          <div className="cashier-login-btn mb-7">
            <div className="cashier-login-btn-full default-light-theme">
              <button className="btn-primary" type="submit">
                Login{" "}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginMain;

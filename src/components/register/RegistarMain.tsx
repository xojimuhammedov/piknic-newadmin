"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/img/logo/logo.png";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import NiceSelect from "@/utils/NiceSelect";
import { GenderData } from "@/data/NiceSelect";
import Preloader from "@/sheardComponent/Preloader/Preloader";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
}

const RegistarMain = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loadings, setloadings] = useState<boolean>(false);
  const [registerError, setregisterError] = useState<string>("");
  const [Gender, setGender] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setloadings(true);
    const name = `${data.firstName} ${data.lastName}`;
    const email = data.email;
    const password = data.password;
    const role = "user";
    const phone = data.phone;
    const gender = Gender;
    const userInfo = {
      name,
      email,
      password,
      role,
      phone,
      date,
      photo: "",
      gender,
    };
    axios
      .post(`${process.env.BASE_URL}/user/register`, userInfo)
      .then((res) => {
        switch (res.data.message) {
          case "success":
            setloadings(false);
            router.push("/login");
            break;
          case "custome error":
            setloadings(false);
            setregisterError("Enter Valid Info");
            break;
          case "User Is Alreay Exist":
            setloadings(false);
            setregisterError("User Is Already Exist");
            break;
          default:
            setloadings(false);
            // Handle any other response messages if needed.
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  if (loadings) {
    return <Preloader/>
  }

  const selectHandler = () => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-login-area flex justify-center items-center w-full h-full"
      >
        <div className="cashier-login-wrapper">
          <div className="cashier-login-logo text-center mb-12">
            <Image src={logo} alt="logo not found" />
          </div>
          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <span className="error-message">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <i className="fa-light fa-user"></i>
              </span>
            </div>
          </div>

          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <span className="error-message">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <span className="input-icon">
                <i className="fa-light fa-user"></i>
              </span>
            </div>
          </div>

          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
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
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "phone is required",
                    minLength: 8,
                  })}
                />
              </div>
              <span className="input-icon">
                <i className="fa-light fa-phone"></i>
              </span>
            </div>
          </div>
          <div className="cashier-select-field mb-5">
            <div className="cashier-input-field-style">
              <div className="single-input-field w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password Should  Number"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
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
                  className="password-toggle-btn"
                >
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </button>
              </span>
            </div>
          </div>

          <div className=" custome-m">
            <div className="cashier-select-field-style">
              <NiceSelect
                options={GenderData}
                defaultCurrent={0}
                onChange={selectHandler}
                name=""
                setapiEndPoint={setGender}
                className="block"
              />
            </div>
          </div>
          <br />

          <div className="cashier-login-btn mb-7">
            <div className="cashier-login-btn-full default-light-theme">
              <button className="btn-primary" type="submit">
                Register
              </button>
            </div>
          </div>
          <span className="error-message">
            {registerError && registerError}
          </span>
          <div className="cashier-login-footer">
            <div className="cashier-login-footer-account text-center">
              <span className="text-[16px] inline-block text-bodyText">
                Already have an account?{" "}
                <Link href="/login" className="text-[16px] text-themeBlue">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegistarMain;

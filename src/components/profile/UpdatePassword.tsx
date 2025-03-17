"use client";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  password: string;
  newPassword: string;
}

const UpdatePassword = ({ closeModal }: any) => {
  const { user, setLoading, setLoggedIn, setUser, header } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [registerError, setregisterError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const currentPassword = data.password;
    const newPassword = data.newPassword;

    const updatePassword = {
      email: user?.email,
      currentPassword,
      newPassword,
    };

    if (user?.email) {
      axios
        .put(
          `${process.env.BASE_URL}/user/change-password?email=${user?.email}`,
          updatePassword,
          header
        )
        .then((res) => {
          switch (res.data.message) {
            case "Password changed successfully":
              localStorage.removeItem("accessToken");
              setLoading(false);
              setLoggedIn(false);
              setUser(undefined);
              closeModal();
              break;
            case "Current password is incorrect":
              setregisterError("Current password is incorrect");
              break;
            case "User not found":
              setregisterError("User not found");
              break;
            case "Internal Server Error":
              setregisterError("Internal Server Error");
              break;
            default:
              // Handle any other response messages if needed.
              break;
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            console.error("Unauthorized access");
          } else {
            console.error("Unauthorized access");
          }
        });
    }
  };

  return (
    <div className="modal_box">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px]"
      >
        <div className="cashier-addsupplier-area bg-white px-7 custom-shadow rounded-lg">
          <div className="cashier-profile-area">
            <div className="grid grid-cols-12 gap-x-7 maxSm:gap-x-0">
              <div className="lg:col-span-12 md:col-span-12 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mb-3">
                    Current Password
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
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
              </div>
              <div className="lg:col-span-12 md:col-span-12 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mb-3">
                    New Password
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type={showPasswordTwo ? "text" : "password"}
                        placeholder="Password"
                        {...register("newPassword", {
                          required: "New Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                      />
                      {errors.newPassword && (
                        <span className="error-message">
                          {errors.newPassword.message}
                        </span>
                      )}
                      <span className="error-message">{registerError && registerError}</span>
                    </div>
                    <span className="input-icon">
                      <button
                        type="button"
                        onClick={() => setShowPasswordTwo(!showPassword)}
                        className="password-toggle-btn"
                      >
                        <i
                          className={
                            showPasswordTwo
                              ? "fa-solid fa-eye"
                              : "fa-regular fa-eye-slash"
                          }
                        ></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        <div className="col-span-12 flex justify-between px-7">
          <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
            <button className="btn-primary">Update</button>
          </div>
          <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
            <button onClick={closeModal} className="btn-primary">
              Cancel
            </button>
          </div>
        </div>
       
      </form>
    </div>
  );
};

export default UpdatePassword;

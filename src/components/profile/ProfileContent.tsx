"use client";
import React, { useState } from "react";
import thumb from "../../../public/assets/img/user/user-profile.png";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  phone: string;
  gender: string;
}

import axios from "axios";
import UpdatePassword from "./UpdatePassword";
import NiceSelect from "@/utils/NiceSelect";
import { GenderData } from "@/data/NiceSelect";
import { toast } from "react-toastify";
const ProfileContent = () => {
  const { user, header, setUpdate } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('')
  const [Gender, setGender] = useState<string>("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);
    setUpdate(false);
    const name = data.name;
    const phone = data.phone;
    const gender = Gender;

    const profileUpdateInfo = {
      id: user?.id,
      name,
      phone,
      gender,
      photo: profilePic,
    };
    axios
      .put(
        `${process.env.BASE_URL}/user/update-user?email=${user?.email}`,
        profileUpdateInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          setupload(false);
          setUpdate(true);
          toast.success(`Profile Updated`, {
            position: "top-left",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast.error("CURD Operation Is Disabled");
        } else {
          toast.error("CURD Operation Is Disabled");
        }
      });
  };

  const handleSingleImgUpload = async (e: any) => {
    setupload(false);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_URL}`,
        formData
      );
      const imageUrl = response.data.data.url;
      if (response.data.success === true) {
        setupload(true);
      }
      setProfilePic(imageUrl);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleClearSingleImg = () => {
    setupload(false);
    setProfilePic("");
  };

  const selectHandler = () => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg mb-1">
          <div className="cashier-profile-area">
            <div className="cashier-profile-wrapper flex items-center maxSm:block pb-1 mb-14">
              <div className="cashier-profile-info flex items-center mr-20 maxSm:mr-0 maxSm:mb-5">
                <div className="cashier-profile-info-img mr-5 og-profile-img">
                  {upload === false && user?.photo === "" && (
                    <Image
                      className="mb-5"
                      width={150}
                      height={150}
                      style={{ width: "100%", height: "100%" }}
                      src={thumb}
                      alt="img not found"
                    />
                  )}
                  {upload === false && user?.photo && (
                    <Image
                      width={150}
                      height={150}
                      style={{ width: "100%", height: "100%" }}
                      className="mb-5"
                      src={user?.photo}
                      alt="img not found"
                    />
                  )}

                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full single-input-field-file">
                      {upload === false ? (
                        <>
                          <label htmlFor="profileImage">
                            <i className="fa-regular fa-folder-arrow-up"></i>
                            Upload
                          </label>
                          <input
                            type="file"
                            id="profileImage"
                            className="hidden"
                            accept="image/*"
                            onChange={handleSingleImgUpload}
                          />
                        </>
                      ) : (
                        <div className="img_upload_preview og-profile-img">
                          <Image
                            src={profilePic}
                            alt="category Img"
                            width={150}
                            height={150}
                            style={{ width: "100%", height: "100%" }}
                          />
                          <button
                            onClick={handleClearSingleImg}
                            className="custome_remove_icon"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="cashier-profile-info-text">
                  <h4 className="text-black font-bold text-[24px] mb-1">
                  {" "}
  {user?.first_name || "DefaultFirstName"} {user?.last_name || "DefaultLastName"}{" "}
                  </h4>
                  <span className="text-[16px] text-bodyText">Admin User</span>
                </div>
              </div>
              <div className="cashier-profile-info-btn">
                <button onClick={openModal} type="button">
                  {" "}
                  Edit Password{" "}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-7 maxSm:gap-x-0">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mt-3">
                    Name
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        placeholder="Shane Watson"
                        defaultValue={user?.first_name}
                        {...register("name", {
                          required: " Name is required",
                        })}
                      />
                      {errors.name && (
                        <span className="error-message">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mb-3">
                    Phone
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        placeholder="+02 259 857 654" 
                        {...register("phone", {
                          required: " phone is required",
                        })}
                      />
                      {errors.phone && (
                        <span className="error-message">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-black font-semibold mb-3">
                    Email
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="+02 259 857 654" 
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    </div> 
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Gender
                  </h5>
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
              </div>

              <div className="col-span-12">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      
    </>
  );
};

export default ProfileContent;

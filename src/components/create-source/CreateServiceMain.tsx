"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context"; 
import apiUrl from "@/utils/api";
 


interface FormData {
   
  name_uz: string;
  name_en: string;
  name_ru: string;
  text_uz: string;
  text_en: string;
  text_ru: string; 
  images: []
}

 

const CreateServiceMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [blogImg, setBlogImg] = useState<string>("");
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");
  const [loginError, setloginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    

    const formData = new FormData();

    // Append images if they exist
    if (data.images && data.images.length) {
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
    }
    
    formData.append('name_uz', data.name_uz); 
    formData.append('name_en', data.name_en); 
    formData.append('name_ru', data.name_ru); 
    formData.append('text_uz', data.text_uz); 
    formData.append('text_en', data.text_en); 
    formData.append('text_ru', data.text_ru); 


    axios
      .post(
        `${apiUrl}/tours/`,
        formData,
        {
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type":"multipart/form-data", 
          }
        }
      )
      .then((res) => { 
        switch (res.data.message) {
          case "News was created succesfully!":
            toast.success(`Tour yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            setupload(false);
            break; 
          case "custom error":
            reset();
            setupload(false);
            setloginError("something is wrong");
            toast.error(`something is wrong`, {
              position: "top-left",
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 403  || error.response.status === 403) {
          toast.error(`Qaytadan login qiling!`, {
            position: "top-left",
          });
          console.error("Unauthorized access");
        } else {
          console.error("Unauthorized access");
        }
      });
  };

 

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Tour yaratish
          </h4>
          <div className="grid grid-cols-12 gap-x-5"> 
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (Uzbek)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (Uzbek)"
                      {...register("name_uz", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.name_uz && (
                      <span>{errors.name_uz.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Name (English)
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="text"
                      placeholder="Name (English)"
                      {...register("name_en", {
                        required: "Name (English) is required",
                      })}
                    />
                    {errors.name_en && (
                      <span>{errors.name_en.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
  <div className="cashier-select-field mb-5">
    <h5 className="text-[15px] text-heading font-semibold mb-3">
      {" "}
      Name (Russian)
    </h5>
    <div className="cashier-input-field-style">
      <div className="single-input-field w-full">
        <input
          type="text"
          placeholder="Name (Russian)"
          {...register("name_ru", {
            required: "Name (Russian) is required",
          })}
        />
        {errors.name_ru && (
          <span>{errors.name_ru.message}</span>
        )}
      </div>
    </div>
  </div>
</div>

{/* Text (Uzbek) */}
<div className="lg:col-span-4 md:col-span-6 col-span-12">
  <div className="cashier-select-field mb-5">
    <h5 className="text-[15px] text-heading font-semibold mb-3">
      {" "}
      Text (Uzbek)
    </h5>
    <div className="cashier-input-field-style">
      <div className="single-input-field w-full">
        <input
          type="text"
          placeholder="Text (Uzbek)"
          {...register("text_uz", {
            required: "Text (Uzbek) is required",
          })}
        />
        {errors.text_uz && (
          <span>{errors.text_uz.message}</span>
        )}
      </div>
    </div>
  </div>
</div>

{/* Text (English) */}
<div className="lg:col-span-4 md:col-span-6 col-span-12">
  <div className="cashier-select-field mb-5">
    <h5 className="text-[15px] text-heading font-semibold mb-3">
      {" "}
      Text (English)
    </h5>
    <div className="cashier-input-field-style">
      <div className="single-input-field w-full">
        <input
          type="text"
          placeholder="Text (English)"
          {...register("text_en", {
            required: "Text (English) is required",
          })}
        />
        {errors.text_en && (
          <span>{errors.text_en.message}</span>
        )}
      </div>
    </div>
  </div>
</div>

{/* Text (Russian) */}
<div className="lg:col-span-4 md:col-span-6 col-span-12">
  <div className="cashier-select-field mb-5">
    <h5 className="text-[15px] text-heading font-semibold mb-3">
      {" "}
      Text (Russian)
    </h5>
    <div className="cashier-input-field-style">
      <div className="single-input-field w-full">
        <input
          type="text"
          placeholder="Text (Russian)"
          {...register("text_ru", {
            required: "Text (Russian) is required",
          })}
        />
        {errors.text_ru && (
          <span>{errors.text_ru.message}</span>
        )}
      </div>
    </div>
  </div>
</div>

 


            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Rasmlarini yuklang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{padding:0}}
                      multiple
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            

            <div className="col-span-12">
              <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                <button className="btn-primary" type="submit">
                  Yaratish
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateServiceMain;

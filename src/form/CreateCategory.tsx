"use client"; 
import apiUrl from "@/utils/api";
import axios, { Axios } from "axios"; 
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface Category {
  id: string;
  name_en: string;
  name_ru: string;
  images: string; 
  created_at: Date;
  // Add other properties as needed
}

interface FormData {
  name_en: string;
  name_ru: string;
  images: string;
}

const CreateCategory = () => { 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>(); 
 

  const onSubmit: SubmitHandler<FormData> = (data:any) => {
    const formData = new FormData();
 
    if (data.images && data.images.length) {
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
    } 
    formData.append('name_en', data.name_en); 
    formData.append('name_ru', data.name_ru); 

  
 
    axios
      .post(`${apiUrl}/categories`,  formData, {
        headers:{ 
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(`Category created`, {
            position: "top-left",
          });
          reset(); 
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5"
      >
        <h4 className="text-[20px] font-bold text-heading mb-9">
          Kategoriya yaratish
        </h4>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
              Kategoriya nomi - EN
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Kategoriya nomi - EN"
                    {...register("name_en", {
                      required: " name_en is required",
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
              Kategoriya nomi - RU
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Kategoriya nomi - RU"
                    {...register("name_ru", {
                      required: " name_ru is required",
                    })}
                  />
                  {errors.name_ru && (
                    <span>{errors.name_ru.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Upload Image 
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{padding:0}}
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
          
      </form>
    </>
  );
};

export default CreateCategory;

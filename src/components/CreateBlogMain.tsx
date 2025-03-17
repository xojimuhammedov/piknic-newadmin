"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context"; 
import apiUrl from "@/utils/api";
import NiceSelectThree from "@/utils/NiceSelectThree";
 


interface FormData {
  title_uz: string;
  title_en: string;
  title_ru: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  category_id:string;
  images: []
}

 

const CreateServiceMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [blogs, setBlogs] = useState([]);
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

    if (data.images && data.images.length) {
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
    }
    

    formData.append('title_uz', data.title_uz); 
    formData.append('title_en', data.title_en); 
    formData.append('title_ru', data.title_ru); 
    formData.append('text_uz', data.text_uz); 
    formData.append('text_en', data.text_en); 
    formData.append('text_ru', data.text_ru); 
    formData.append('category_id', data.category_id); 



    axios
      .post(
        `${apiUrl}/products/`,
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
          case "Product was created succesfully!":
            toast.success(`Hudud yaratildi!🎉`, {
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

  useEffect(() => {
    axios
      .get(`${apiUrl}/categories/`)
      .then((res) => { 
        setBlogs(res.data.data);
        // setotalPages(res.data.totalPages);
        // setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(blogs)
 

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Hudud yaratish
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
                      {...register("title_uz", {
                        required: "Name (Uzbek) is required",
                      })}
                    />
                    {errors.title_uz && (
                      <span>{errors.title_uz.message}</span>
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
                      {...register("title_en", {
                        required: "Name (English) is required",
                      })}
                    />
                    {errors.title_en && (
                      <span>{errors.title_en.message}</span>
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
          {...register("title_ru", {
            required: "Name (Russian) is required",
          })}
        />
        {errors.title_ru && (
          <span>{errors.title_ru.message}</span>
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
                  Mashhur joylarning rasmlarini yuklang
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


            <div className="lg:col-span-4 md:col-span-6 col-span-12">
  <div className="cashier-select-field mb-5">
    <h5 className="text-[15px] text-heading font-semibold mb-3">
    
      Hududlar bo`yicha tanlang
    </h5>
    <div className="cashier-input-field-style">
    <div className="single-input-field w-full">
                <select  {...register("category_id", {
                        required: "Hudud (Uzbek) is required",
                      })} name="category_id">
                    {
                        blogs.map((item:any, index:any) => (
                            <option key={index} value={item.id}>{item.name_uz}</option>
                        ))
                    }
                </select>           
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

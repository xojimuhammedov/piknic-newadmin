"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { CategoryType, blogDataType } from "@/interFace/apiInterFace";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UpdateCategoryImg from "./UpdateCategoryImg";
import useGlobalContext from "@/hooks/use-context";


interface FormData {
  name_en: string;
  name_ru: string;
  images: string;
}

const UpdateCategory = ({ id }: idType) => {
  const {header,user} = useGlobalContext()
  const [product, setProduct] = useState<CategoryType>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const router = useRouter();
  const myProduct = product;

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/categories/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id, changeImage]); 


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const formData = new FormData();
 
    if (data.images && data.images.length) {
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
    } 
    formData.append('name_en', data.name_en); 
    formData.append('name_ru', data.name_ru); 


    axios
      .put(`${process.env.BASE_URL}/categories/${myProduct?.id}`, formData, {
        headers:{ 
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/settings");
          toast.success(`Category Updated`, {
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

  return (
    <>
      {product && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area mt-[30px] px-7"
        >
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Update blog post
            </h4>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Name Uzbek
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myProduct?.name_en}
                        placeholder="Add Product Title"
                        {...register("name_en", )}
                      />
                      {errors.name_en && (
                        <span>{errors.name_en.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            
              {/* 
            
            show here all selected image end
            */}

              <div className="lg:col-span-12 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Name Russian
                  </h5>
                  <div className="cashier-input-field-style"> 
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myProduct?.name_ru}
                        placeholder="Add Product Title"
                        {...register("name_ru" )}
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
                  Update Image 
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{padding:0}} 
                    />
                  </div>
                </div>
              </div>
            </div>


              <div className="col-span-12">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </div>
             
          </div>
        </form>
      )}

       
    </>
  );
};

export default UpdateCategory;

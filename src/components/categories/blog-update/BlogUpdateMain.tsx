"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UpdateImg from "./UpdateImg";
import { toast } from "react-toastify";
import apiUrl from "@/utils/api";
interface FormData {
  id: string;
  name: string;
  description: string;
  image: string;
}
const BlogUpdateMain = ({ id }: idType) => {
  const [myproduct, setProduct] = useState<FormData>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [changeImage, setchangeImage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${apiUrl}/categories/${id}`)
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

    if (data.image && data.image.length) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }
    }

    // Append text fields to formData
    formData.append("name", data.name);
    formData.append("description", "hello");

    axios
      .put(`${apiUrl}/categories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Category was updated successfully") {
          router.push("/categories");
          toast.success(`Hudud o'zgartirildi`, {
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
      {myproduct && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area ml-[300px] mt-[30px] px-7">
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Katalogni o`zgartirish
            </h4>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    Katalog nomi
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.name}
                        placeholder="O'zbek"
                        {...register("name")}
                      />
                      {errors.name && <span>{errors.name.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Rasm yuklash
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="file"
                        placeholder="Add Product Rating"
                        {...register("image")}
                        style={{ padding: 0 }}
                        // defaultValue={myproduct.image_src}
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

export default BlogUpdateMain;

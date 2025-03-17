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
import CKeditor from "../create-service/CKeditor";

interface FormData {
  id: string;
  title: string;
  description: string;
  price: string;
  category_id: string;
  video: string;
  cover: string;
  images: [];
}

const BlogProductMain = ({ id }: any) => {
  const { user, header } = useGlobalContext();
  const [upload, setupload] = useState<boolean>(false);
  const [myproduct, setProduct] = useState<FormData>();
  const [dataOne, setDataOne] = useState<string>("");
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
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

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    if (data.images && data.images.length) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    if (data.cover && data.cover.length) {
      for (let i = 0; i < data.cover.length; i++) {
        formData.append("cover", data.cover[i]);
      }
    }
    if (data.video && data.video.length) {
      for (let i = 0; i < data.video.length; i++) {
        formData.append("video", data.video[i]);
      }
    }

    formData.append("title", data.title);
    formData.append("description", dataOne);
    formData.append("price", data.price);

    axios
      .put(`${apiUrl}/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        switch (res.data.message) {
          case "Product was updated successfully":
            toast.success(`Hudud o'zgartirildi!🎉`, {
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
        if (error.response.status === 403 || error.response.status === 403) {
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

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {myproduct && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-content-area ml-[300px] mt-[30px] px-7">
          <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
            <h4 className="text-[20px] font-bold text-heading mb-9">
              Hudud yaratish
            </h4>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Nomi
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.title}
                        placeholder="Name (Uzbek)"
                        {...register("title", {
                          required: "Name (Uzbek) is required",
                        })}
                      />
                      {errors.title && <span>{errors.title.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Izoh
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <CKeditor
                        // name="text_uz"
                        onChange={(data: string) => {
                          setDataOne(data);
                        }}
                        editorLoaded={editorLoaded}
                      />
                      {errors.description && (
                        <span>{errors.description.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Narxi
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="text"
                        defaultValue={myproduct.price}
                        placeholder="Name (Russian)"
                        {...register("price", {
                          required: "Name (Russian) is required",
                        })}
                      />
                      {errors.price && <span>{errors.price.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Rasmlar yaratish
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="file"
                        placeholder="Add Product Rating"
                        {...register("images")}
                        style={{ padding: 0 }}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Asosiy rasm
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="file"
                        placeholder="Add Product Rating"
                        {...register("cover")}
                        style={{ padding: 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                    {" "}
                    Video yuklash
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <input
                        type="file"
                        placeholder="Add Product Rating"
                        {...register("video")}
                        style={{ padding: 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="cashier-select-field mb-5">
                  <h5 className="text-[15px] text-heading font-semibold mb-3">
                   Katalogni tanlang
                  </h5>
                  <div className="cashier-input-field-style">
                    <div className="single-input-field w-full">
                      <select {...register("category_id")} name="category_id">
                        <option selected value="Tanlang">
                          Tanlang
                        </option>
                        {blogs.map((item: any, index: any) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12">
                <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
                  <button className="btn-primary" type="submit">
                    O`zgartirish
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

export default BlogProductMain;

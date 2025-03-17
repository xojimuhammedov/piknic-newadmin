"use client";

import moment from "moment/moment";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";

interface FormData {
  id: string;
  brand_id: string;
  model_id: string;
  category_id: string;
  location_id: string;
  city_id: string;
  color: string;
  year: string;
  seconds: string;
  max_speed: string;
  max_people: number;
  transmission: string;
  motor: string;
  drive_side: string;
  petrol: string;
  limitperday: number;
  deposit: number;
  premium_protection: number;
  price_in_aed: string;
  price_in_usd: string;
  price_in_aed_sale: string;
  price_in_usd_sale: string;
  cover: string;
  images: [];
  inclusive: boolean;
  created_at: string;
}

const CreateServiceMain = () => {
  const { user, header } = useGlobalContext();
  const [upload, setUpload] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [categories, setCategories] = useState<any[]>([]); // Update with actual type
  const [locations, setLocations] = useState<any[]>([]); // Update with actual type
  const [brands, setBrands] = useState<any[]>([]); // Update with actual type
  const [cities, setCities] = useState<any[]>([]); // Update with actual type
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories
    axios
      .get(`${process.env.BASE_URL}/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch locations
    axios
      .get(`${process.env.BASE_URL}/locations`)
      .then((response) => {
        setLocations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });

    // Fetch brands
    axios
      .get(`${process.env.BASE_URL}/brands`)
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    // Fetch cities
    axios
      .get(`${process.env.BASE_URL}/cities`)
      .then((response) => {
        setCities(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    // Fetch models
    axios
      .get(`${process.env.BASE_URL}/models`)
      .then((response) => {
        setModels(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

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

    formData.append("brand_id", data.brand_id);
    formData.append("model_id", data.model_id);
    formData.append("category_id", data.category_id);
    formData.append("location_id", data.location_id);
    formData.append("city_id", data.city_id);
    formData.append("color", data.color);
    formData.append("year", data.year);
    formData.append("seconds", data.seconds);
    formData.append("max_speed", data.max_speed);
    formData.append("max_people", data.max_people.toString());
    formData.append("transmission", data.transmission);
    formData.append("motor", data.motor);
    formData.append("drive_side", data.drive_side);
    formData.append("petrol", data.petrol);
    formData.append("limitperday", data.limitperday.toString());
    formData.append("deposit", data.deposit.toString());
    formData.append("premium_protection", data.premium_protection.toString());
    formData.append("price_in_aed", data.price_in_aed);
    formData.append("price_in_usd", data.price_in_usd);
    formData.append("price_in_aed_sale", data.price_in_aed_sale);
    formData.append("price_in_usd_sale", data.price_in_usd_sale);
    formData.append("inclusive", String(data.inclusive));

    axios
      .post(`${process.env.BASE_URL}/cars/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        switch (res.data.message) {
          case "Car was created succesfully!":
            toast.success(`Car yaratildi!🎉`, {
              position: "top-left",
            });
            reset();
            setUpload(false);
            break;
          case "custom error":
            reset();
            setUpload(false);
            setLoginError("something is wrong");
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-content-area mt-[30px] px-7"
      >
        <div className="cashier-addsupplier-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <h4 className="text-[20px] font-bold text-heading mb-9">
            Car qo`shish
          </h4>
          <div className="grid grid-cols-12 gap-x-5">
            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Category
                </h5>
                <select
                  {...register("category_id", {
                    required: "Category is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_en}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <span>{errors.category_id.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Brand
                </h5>
                <select
                  {...register("brand_id", { required: "Brand is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.title}
                    </option>
                  ))}
                </select>
                {errors.brand_id && <span>{errors.brand_id.message}</span>}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Model
                </h5>
                <select
                  {...register("model_id", { required: "Model is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Model</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                {errors.model_id && <span>{errors.model_id.message}</span>}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Lokatsiya
                </h5>
                <select
                  {...register("location_id", {
                    required: "Location is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                {errors.location_id && (
                  <span>{errors.location_id.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  City
                </h5>
                <select
                  {...register("city_id", { required: "City is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city_id && <span>{errors.city_id.message}</span>}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Color
                </h5>
                <input
                  type="text"
                  placeholder="Rangi"
                  {...register("color")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Yil
                </h5>
                <input
                  type="text"
                  placeholder="Ishlab chiqarilgan yili"
                  {...register("year", {
                    required: "Year is required",
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: "Invalid year format (e.g., 2023)",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.year && (
                  <span className="text-red-500">{errors.year.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Seconds
                </h5>
                <input
                  type="text"
                  placeholder="100 chiqish sekundda"
                  {...register("seconds", {
                    required: "Seconds is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.seconds && (
                  <span className="text-red-500">{errors.seconds.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Tezlik
                </h5>
                <input
                  type="text"
                  placeholder="Enter max speed"
                  {...register("max_speed", {
                    required: "Max speed is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Max speed must be a positive integer",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.max_speed && (
                  <span className="text-red-500">
                    {errors.max_speed.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Max People
                </h5>
                <input
                  type="number"
                  placeholder="Maksimal odamlar"
                  {...register("max_people", {
                    required: "Max people is required",
                    min: {
                      value: 1,
                      message: "Max people must be at least 1",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.max_people && (
                  <span className="text-red-500">
                    {errors.max_people.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Motor
                </h5>
                <input
                  type="text"
                  placeholder="Enter motor"
                  {...register("motor", {
                    required: "Motor is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.motor && (
                  <span className="text-red-500">{errors.motor.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Transmission
                </h5>
                <input
                  type="text"
                  placeholder="Enter transmission"
                  {...register("transmission", {
                    required: "Transmission is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.transmission && (
                  <span className="text-red-500">
                    {errors.transmission.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Drive Side
                </h5>
                <input
                  type="text"
                  placeholder="Enter drive side"
                  {...register("drive_side", {
                    required: "Drive side is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.drive_side && (
                  <span className="text-red-500">
                    {errors.drive_side.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Yoqilg`i
                </h5>
                <input
                  type="text"
                  placeholder="Enter petrol type"
                  {...register("petrol", {
                    required: "Petrol type is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.petrol && (
                  <span className="text-red-500">{errors.petrol.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Limit per Day
                </h5>
                <input
                  type="number"
                  placeholder="Enter limit per day"
                  {...register("limitperday", {
                    required: "Limit per day is required",
                    min: {
                      value: 1,
                      message: "Limit per day must be at least 1",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.limitperday && (
                  <span className="text-red-500">
                    {errors.limitperday.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Deposit
                </h5>
                <input
                  type="number"
                  placeholder="Enter deposit"
                  {...register("deposit", {
                    required: "Deposit is required",
                    min: {
                      value: 0,
                      message: "Deposit must be a non-negative number",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.deposit && (
                  <span className="text-red-500">{errors.deposit.message}</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Premium Protection Price
                </h5>
                <input
                  type="text"
                  placeholder="Enter premium protection"
                  {...register("premium_protection", {
                    required: "Premium protection is required",
                    min: {
                      value: 0,
                      message: "Premium protection must be a text",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.premium_protection && (
                  <span className="text-red-500">
                    {errors.premium_protection.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Price in AED
                </h5>
                <input
                  type="text"
                  placeholder="Enter price in AED"
                  {...register("price_in_aed", {
                    required: "Price in AED is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.price_in_aed && (
                  <span className="text-red-500">
                    {errors.price_in_aed.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Price in USD(Old)
                </h5>
                <input
                  type="text"
                  placeholder="Enter old price in USD"
                  {...register("price_in_usd_sale")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.price_in_usd_sale && (
                  <span className="text-red-500">
                    {errors.price_in_usd_sale.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Price in AED(Old)
                </h5>
                <input
                  type="text"
                  placeholder="Enter old price in AED"
                  {...register("price_in_aed_sale")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.price_in_aed_sale && (
                  <span className="text-red-500">
                    {errors.price_in_aed_sale.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Price in USD
                </h5>
                <input
                  type="text"
                  placeholder="Enter price in USD"
                  {...register("price_in_usd", {
                    required: "Price in USD is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.price_in_usd && (
                  <span className="text-red-500">
                    {errors.price_in_usd.message}
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  Inclusive
                </h5>
                <input
                  type="checkbox"
                  {...register("inclusive")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6 col-span-12">
              <div className="cashier-select-field mb-5">
                <h5 className="text-[15px] text-heading font-semibold mb-3">
                  {" "}
                  Mashina rasmlarini yuklang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("images")}
                      style={{ padding: 0 }}
                      required
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
                  Asosiy rasmni yuklang
                </h5>
                <div className="cashier-input-field-style">
                  <div className="single-input-field w-full">
                    <input
                      type="file"
                      placeholder="Add Product Rating"
                      {...register("cover")}
                      style={{ padding: 0 }}
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

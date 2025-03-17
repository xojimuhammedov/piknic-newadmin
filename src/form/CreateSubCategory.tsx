"use client";
import useGlobalContext from "@/hooks/use-context";
import { fetchCategoryData } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import NiceSelect from "@/utils/NiceSelect";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
interface FormData {
  subCategoryName: string;
  Categoryclass: string;
  categoryName: string;
}

const CreateSubCategory = () => {
  const { header, user } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const selectHandler = () => {};
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const [loginError, setloginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const subCategoryName = data.subCategoryName;
    const subcategoryclass = data.Categoryclass;
    const categoryName = selectedCategory;
    const userInfo = {
      subCategoryName,
      subcategoryclass,
      categoryName,
    };
    axios
      .post(
        `${process.env.BASE_URL}/setting/create-subcategory?email=${user?.user_id}`,
        userInfo,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
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

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 lg:ml-5  mb-5"
      >
        <h4 className="text-[20px] font-bold text-heading mb-9">
          Create Sub Category
        </h4>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Sub Category Name
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Sub CategoryName"
                    {...register("subCategoryName", {
                      required: "subCategoryName Name is required",
                    })}
                  />
                  {errors.subCategoryName && (
                    <span>{errors.subCategoryName.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Category Logo
              </h5>
              <div className="cashier-input-field-style">
                <div className="single-input-field w-full">
                  <input
                    type="text"
                    placeholder="Add Category Class"
                    {...register("Categoryclass", {
                      required: "Class Name is required",
                    })}
                  />
                  {errors.Categoryclass && (
                    <span>{errors.Categoryclass.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="cashier-select-field mb-5">
              <h5 className="text-[15px] text-heading font-semibold mb-3">
                Category
              </h5>
              <div className="cashier-select-field-style">
                <NiceSelect
                  options={data}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  setapiEndPoint={setSelectedCategory}
                  className="block"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="cashier-managesale-top-btn default-light-theme pt-2.5">
              <button className="btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSubCategory;

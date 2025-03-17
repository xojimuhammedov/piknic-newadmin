"use client";
import { idType } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { SubCategoryType } from "@/interFace/apiInterFace";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NiceSelect from "@/utils/NiceSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
interface FormData {
  subCategoryName: string;
  subcategoryclass: string;
  categoryName: string;
}

const UpdateSubCategoryMain = ({ id }: idType) => {
  const {user,header} = useGlobalContext()
  const [product, setProduct] = useState<SubCategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const router = useRouter();
  const myproduct = product[0];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/setting/sub-category-id/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);

    const subCategoryName = data.subCategoryName;
    const subcategoryclass = data.subcategoryclass;
    const categoryName = selectedCategory;
    const categoryInfo = {
      id: myproduct?._id,
      subCategoryName,
      categoryName,
      subcategoryclass,
    };

    axios
      .put(
        `${process.env.BASE_URL}/setting/update-subcategory-info?email=${user?.email}`,
        categoryInfo,header

      )
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/settings");
          toast.success(`Sub Category Updated`, {
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

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  const selectHandler = () => {};

  return (
    <>
      {product.length && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5"
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
                      defaultValue={myproduct?.subCategoryName}
                      placeholder="Add Category"
                      {...register("subCategoryName", {
                        required: "Sub CategoryName Name is required",
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
                      defaultValue={myproduct?.subcategoryclass}
                      {...register("subcategoryclass", {
                        required: "Sub categoryclass is required",
                      })}
                    />
                    {errors.subcategoryclass && (
                      <span>{errors.subcategoryclass.message}</span>
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateSubCategoryMain;

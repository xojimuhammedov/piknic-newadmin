"use client";
import { SubCategoryType } from "@/interFace/apiInterFace";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import Image from "next/image";
import Scrollbar from "smooth-scrollbar";
import { toast } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import Link from "next/link";
const SubCategories = () => {
  const { header, user } = useGlobalContext();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [match, setMatch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<SubCategoryType[]>([]);
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };

  const handleDeleteCategory = (id: string) => {
    axios
      .delete(
        `${process.env.BASE_URL}/setting/delete-subcategory?id=${id}&email=${user?.email}`,
        header
      )
      .then((res) => {
        if (res.data.message === "success") {
          const remainingProduct = subCategory.filter(
            (item) => item._id !== id
          );
          setSubCategory(remainingProduct);
          toast.success(`sub Category Deleted`, {
            position: "top-left",
          });
        }
        if (res.data.message === "something is wrong") {
          toast.error(`Something Is Wrong`, {
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

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/setting/sub-categroy`)
      .then((res) => {
        setSubCategory(res.data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollbar = Scrollbar.init(scrollContainerRef.current, {
        damping: 0.2,
      });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className="cashier-addsupplier-area  bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
        <div
          ref={scrollContainerRef}
          className="cashier-salereturns-table-area table-height"
        >
          <div className="cashier-category-wrapper">
            <div className=" border border-solid border-grayBorder border-b-0 mb-7">
              <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                
                <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                  <h5>Sub Category Name</h5>
                </div>

                <div className="cashier-salereturns-table-actionF">
                  <h5 className="mr-5">Action</h5>
                </div>
              </div>

              {subCategory.length ?
                subCategory.map((item) => (
                  <div
                    key={item._id}
                    className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                  >
                    <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                      <span className="capitalize"> {item.subCategoryName} </span>
                    </div>

                    <div className="cashier-salereturns-table-actionF">
                      <div className="dropdown">
                        <button
                          onClick={() => handleOpen(item._id)}
                          className="common-action-menu-style"
                        >
                          Action
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <div
                          className="dropdown-list"
                          style={{
                            display: `${
                              item._id === match && open ? "block" : "none"
                            }`,
                          }}
                        >
                         
                         <button className="dropdown-menu-item">
                            <Image src={updateIcon} alt="icon not found" />

                            <Link href={`/update-subcategory/${item._id}`}>
                            Edit
                            </Link>
                          </button>


                          <button
                            onClick={() => handleDeleteCategory(item._id)}
                            className="dropdown-menu-item"
                          >
                            <Image src={deleteIcon} alt="icon not found" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )):
                <ChartPreloader/>
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategories;

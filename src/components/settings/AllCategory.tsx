"use client";
import { CategoryType } from "@/interFace/apiInterFace";
import Scrollbar from "smooth-scrollbar"; 
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import Image from "next/image";
// import Scrollbar from "smooth-scrollbar"
import { toast } from "react-toastify";
import Link from "next/link";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import apiUrl from "@/utils/api";


const AllCategory = () => {
  const {header,user} = useGlobalContext()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [match, setMatch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };

  const handleDeleteCategory = (id: string) => {
    axios
      .delete(`${apiUrl}/categories/${id}`,header)
      .then((res) => {
        if (res.data.success) {
          const remainingProduct = categories.filter((item) => item.id !== id);
          setCategories(remainingProduct);
          toast.success(`Category Deleted`, {
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
      .get(`${apiUrl}/categories`)
      .then((res) => {
        setCategories(res.data.data);
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
            <div className="border border-solid border-grayBorder border-b-0 mb-7">
              <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                
                <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                  <h5>Kategoriya nomi -En</h5>
                </div>
                <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                  <h5>Kategoriya nomi - Ru</h5>
                </div>
               

                <div className="cashier-salereturns-table-actionF">
                  <h5 className="mr-5">Action</h5>
                </div>
              </div>

              {categories.length ?
                categories.map((item) => (
                  <div
                    key={item.id}
                    className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                  >
                    <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                      <span className="capitalize"> {item.name_en} </span>
                    </div>

                    <div className="cashier-salereturns-table-dateF cashier-name-title ml-5">
                      <span className="capitalize"> {item.name_ru} </span>
                    </div>

                 

                    <div className="cashier-salereturns-table-actionF">
                      <div className="dropdown">
                        <button
                          onClick={() => handleOpen(item.id)}
                          className="common-action-menu-style"
                        >
                          Action
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <div
                          className="dropdown-list"
                          style={{
                            display: `${
                              item.id === match && open ? "block" : "none"
                            }`,
                          }}
                        >
                          <button className="dropdown-menu-item">
                            <Image src={updateIcon} alt="icon not found" />

                            <Link href={`/update-category/${item.id}`}>
                            Edit
                            </Link>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(item.id)}
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

export default AllCategory;

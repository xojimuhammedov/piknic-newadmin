"use client"; 
import axios from "axios";
import React, { useEffect, useState } from "react";
import updateIcon from "../../../public/assets/img/icon/action-2.png";
import deleteIcon from "../../../public/assets/img/icon/action-6.png";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import PaginationComponent from "../all-products/PaginationComponent ";
import useGlobalContext from "@/hooks/use-context";
import ChartPreloader from "@/preloaders/ChartPreloader";
import NiceSelectThree from "@/utils/NiceSelectThree";
import apiUrl from "@/utils/api";

export interface DataType {
  id:string
  name_uz: string;
  name_en: string;
  name_ru: string;
  text_uz: string;
  text_en: string;
  text_ru: string; 
  images: string; 
}

const BlogList = () => {
  const { header, user } = useGlobalContext();
  const [blogs, setBlogs] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
  };

  const handleDeleteProduct = (id: string) => {
    axios
      .delete(
        `${apiUrl}/tours/${id}`,
        header
      )
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          const remainingBlogs = blogs.filter((item) => item.id !== id);
          setBlogs(remainingBlogs);
          toast.success(`Tour o'chirildi`, {
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

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    axios
      .get(`${process.env.BASE_URL}/service/search-service?search=${searchValue}`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/tours `)
      .then((res) => {  
        setBlogs(res.data.data);
        setotalPages(res.data.totalPages);
        setcurrentPage(res.data.currentPage);
      })
      .catch((e) => console.log(e));
  }, [page, limit]);
  // get search products

  const pageLimitArray = [
    {
      id: 1,
      value: 5,
    },
    {
      id: 2,
      value: 10,
    },
    {
      id: 3,
      value: 15,
    },
    {
      id: 4,
      value: 20,
    },
  ];

  const selectHandler = () => {};
  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <div className="cashier-salereturns-area bg-white p-7 custom-shadow rounded-lg pt-5 mb-5">
          <div className="cashier-table-header-search-area">
            <div className="grid grid-cols-12 gap-x-5 mb-7 pb-0.5">
              <div className="md:col-span-6 col-span-12">
                <div className="cashier-table-header-search relative maxSm:mb-4">
                  <input
                    type="text"
                    placeholder="Search List"
                    value={searchValue}
                    onChange={handleInputChange}
                  />
                  <span>
                    <i className="fa-light fa-magnifying-glass"></i>
                  </span>
                </div>
              </div>
              
            </div>
          </div>

          {blogs.length ? (
            <>
              <div className="cashier-salereturns-table-area">
                <div className="cashier-salereturns-table-innerD">
                  <div className="cashier-salereturns-table-inner-wrapperD border border-solid border-grayBorder border-b-0 mb-7">
                    <div className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12">
                   
                      <div className="cashier-salereturns-table-dateF  ml-5">
                        <h5>Tour nomi</h5>
                      </div>  

                      {/* <div className="cashier-salereturns-table-dateF  ml-5">
                        <h5>Tour matni</h5>
                      </div>  */}
                      

                      <div className="cashier-salereturns-table-actionF">
                        <h5>Action</h5>
                      </div>
                    </div>

                    {blogs.map((item) => (
                      <div
                        key={item.id}
                        className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                      >
                       
                        <div className="cashier-salereturns-table-dateF ml-5">
                          <span className="capitalize"> {item.name_uz} </span>
                        </div> 

                        {/* <div className="cashier-salereturns-table-dateF ml-5">
                          <span className="capitalize"> {item.text_uz} </span>
                        </div>  */}
                        
                        

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

                                <Link href={`tours/tours-update/${item.id}`}>
                                Edit
                                </Link>
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(item.id)}
                                className="dropdown-menu-item"
                              >
                                <Image src={deleteIcon} alt="icon not found" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="cashier-pagination-area">
                  <div className="cashier-pagination-wrapper">
                    <div className="grid grid-cols-12">
                      <div className="single-input-field w-full">
                         <NiceSelectThree
                          options={pageLimitArray}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          setLimit={setLimit}
                          className=""
                        />
                      </div>

                      <div className="lg:col-span-9 md:col-span-6 col-span-12">
                        <PaginationComponent
                          totalPages={totalPages}
                          currentPage={currentPage}
                          setPage={setPage}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </>
          ) : (
            <>
               <ChartPreloader/>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;

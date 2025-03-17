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
  title: string;
  video: string;
  cover: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [match, setMatch] = useState<string>("");
  const handleOpen = (id: string) => {
    setMatch(id);
    setOpen(!open);
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
      .get(`${apiUrl}/blogs`)
      .then((res) => { 
        setBlogs(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  // get search products


  return (
    <>
      <div className="cashier-content-area ml-[300px] mt-[30px] px-7">
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
                   
                      <div className="cashier-salereturns-table-dateF w-[400px]  ml-5">
                        <h5>Title</h5>
                      </div>  

                    </div>

                    {blogs?.map((item) => (
                      <div
                        key={item.id}
                        className="cashier-salereturns-table-list flex border-b border-solid border-grayBorder h-12"
                      >
                       
                        <div className="cashier-salereturns-table-dateF w-[400px] ml-5">
                          <span className="capitalize"> {item.title}</span>
                        </div> 
                        

                        {/* <div className="cashier-salereturns-table-actionF">
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

                                <Link href={`news/news-update/${item.id}`}>
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
                        </div> */}
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

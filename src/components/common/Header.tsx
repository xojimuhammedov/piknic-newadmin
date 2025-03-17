"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import Logout from "@/svg/Logout";
import LanguageIcon from "@/svg/LanguageIcon";
import EditeProfileIcon from "@/svg/EditeProfileIcon";
import Language from "@/svg/Language";
import Image from "next/image";
import EmailIcon from "@/sheardComponent/elements/icons/email-icon";
import thumb from "../../../public/assets/img/user/user-1.png";
import NotificationIcon from "@/svg/NotificationIcon";
import ToggleIcon from "@/svg/ToggleIcon";
import useGlobalContext from "@/hooks/use-context";
import axios from "axios";
import { UserContactType } from "@/interFace/apiInterFace";
interface breadCampTitleType {
  breadCampTitle: string;
}

const Header = ({ breadCampTitle }: breadCampTitleType) => {

  const [notificationData, setNotificationData] = useState<UserContactType[]>([]);
  const [collapse, setCollapse] = useState(false);
  const [emailactive, setemailactive] = useState(false);
  const [notificationActive, setnotificationActive] = useState(false);
  const [userDropdown, setuserDropdown] = useState(false);
  const { toggleSideMenu,logout } = useGlobalContext();

  const addPost = () => {
    setCollapse(!collapse);
    setemailactive(false);
    setnotificationActive(false);
    setuserDropdown(false);
  };

  const handleShowEmail = () => {
    setemailactive(!emailactive);
    setnotificationActive(false);
    setuserDropdown(false);
    setCollapse(false);
  };
  const handleShowNotification = () => {
    // setnotificationActive(!notificationActive);
    setuserDropdown(false);
    setemailactive(false);
    setCollapse(false);
  };
  const handleShowuserDrowdown = () => {
    setuserDropdown(!userDropdown);
    setemailactive(false);
    // setnotificationActive(false);
    setCollapse(false);
  };

  

  return (
    <>
      <div className=" cashier-header-area">
        <div className="cashier-header-wrapper custom-height-70 px-7 custom-height-70 bg-white border-b border-solid border-grayBorder">
          <div className="grid grid-cols-12 items-center h-full">
            <div className="col-span-12">
              <div className="cashier-header-content flex items-center justify-between custom-height-70">
                <div className="cashier-header-breadcrumb">
                  <h5 className="text-[20px] text-heading font-bold mb-1 leading-none">
                    Dashboard
                  </h5>
                  <ul>
                    <li className="text-[14px] text-bodyText font-normal inline-block mr-2">
                      Home
                    </li>
                    <li className="text-[12px] text-bodyText font-normal inline-block mr-2 translate-y-0">
                      <i className="far fa-chevron-right"></i>
                    </li>
                    <li className="text-[14px] text-bodyText font-normal inline-block mr-2">
                      {breadCampTitle}
                    </li>
                  </ul>
                </div>

                <div className="flex items-center">
                  <div className="cashier-header-shortmenu pr-5 maxSm:pr-4 items-center flex flex-col justify-center custom-height-70">
                   
                    <div
                      className={`cashier-quick-dropdown cashier-quick-menu-dropdown ${
                        collapse ? "shortmenu-enable" : ""
                      }`}
                    >
                      <ul>
                        <li>
                          <Link href="/product/add-products">Add Product</Link>
                        </li>
                        <li>
                          <Link href="/create-blog">Create Blog</Link>
                        </li>
                        <li>
                          <Link href="/add-members">Add Member</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    onClick={toggleSideMenu}
                    id="sidebarToggle"
                    className="cashier-header-bar-responsive cursor-pointer mr-5"
                  >
                    {/* sidebar toggle */}
                    <ToggleIcon />
                  </div>
                  <div className="cashier-header-notify-wrapper px-5 flex items-center border-l border-solid border-grayBorder custom-height-70 pr-0">
                    <div
                      onClick={handleShowNotification}
                      className="cashier-header-notification pr-5 relative"
                    >
                       

                      {/* notifications */}
                      <div
                        className={`cashier-notify-dropdown cashier-notification-dropdown ${
                          notificationActive ? "notifydropdown-enable" : ""
                        } `}
                      >
                        <div className="cashier-notify-dropdown-wrapper px-4 border border-grayBorder border-solid">

                          {
                            notificationData?.length ?
                            <>
                            {
                              notificationData.slice(0,4).map((item)=>(
                                <div key={item._id} className="cashier-notify-dropdown-list py-4 flex items-center border-b border-grayBorder border-solid">
                                <div className="cashier-notify-img">
                                  <Link href="">
                                    <Image src={thumb} alt="img not found" />
                                  </Link>
                                </div>
                                <div className="cashier-notify-text">
                                  <h6>
                                    <Link className="capitalize" href="">
                                      {item?.name} Send you Message
                                    </Link>
                                  </h6>
                                  <span>  {item?.date ? item?.date : " 16 sept 2023 - 02:26 PM"}</span>
                                </div>
                              </div>
                              ))
                            }
                            </>
                            :
                            <>
                            </>
                          }

                         
                      
                        
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={handleShowEmail}
                      className="cashier-header-email pr-5 relative"
                    >
                      
                      <div
                        className={`cashier-notify-dropdown cashier-email-dropdown ${
                          emailactive ? "emaildropdown-enable" : ""
                        }`}
                      >
                        <div className="cashier-notify-dropdown-wrapper px-4 border border-grayBorder border-solid">
                          <div className="cashier-notify-dropdown-list py-4 flex items-center border-b border-grayBorder border-solid">
                            <div className="cashier-notify-img">
                              <Link href="">
                                <Image src={thumb} alt="img not found" />
                              </Link>
                            </div>
                            <div className="cashier-notify-text">
                              <h6>
                                <Link href="">
                                  Alex Send you Message
                                </Link>
                              </h6>
                              <span>31 Dec 2021 - 02:26 PM</span>
                            </div>
                          </div>
                          <div className="cashier-notify-dropdown-list py-4 flex items-center border-b border-grayBorder border-solid">
                            <div className="cashier-notify-img">
                              <Link href="">
                                <Image src={thumb} alt="img not found" />
                              </Link>
                            </div>
                            <div className="cashier-notify-text">
                              <h6>
                                <Link href="">
                                  Peter Send you Message
                                </Link>
                              </h6>
                              <span>31 Dec 2021 - 08:36 PM</span>
                            </div>
                          </div>
                          <div className="cashier-notify-dropdown-list py-4 flex items-center border-b border-grayBorder border-solid">
                            <div className="cashier-notify-img">
                              <Link href="">
                                <Image src={thumb} alt="img not found" />
                              </Link>
                            </div>
                            <div className="cashier-notify-text">
                              <h6>
                                <Link href="">
                                  Resport created successfully
                                </Link>
                              </h6>
                              <span>31 Dec 2021 - 04:45 PM</span>
                            </div>
                          </div>
                          <div className="cashier-notify-dropdown-list py-4 flex items-center border-b border-grayBorder border-solid">
                            <div className="cashier-notify-img">
                              <Link href="">
                                <Image src={thumb} alt="img not found" />
                              </Link>
                            </div>
                            <div className="cashier-notify-text">
                              <h6>
                                <Link href="">
                                  Jhon Send you Message
                                </Link>
                              </h6>
                              <span>31 Dec 2021 - 07:30 AM</span>
                            </div>
                          </div>
                          <div className="cashier-notify-dropdown-list py-4 flex items-center justify-center">
                            <Link
                              href=""
                              className="text-[14px] text-bodyText inline-block"
                            >
                              See all
                              <i className="fa-light fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="langdropdown"
                      onClick={handleShowuserDrowdown}
                      className="cashier-header-language flex items-center relative"
                    >
                      <div className="cashier-header-language-content">
                        <ul>
                          <li className="flex ">
                            <Link
                              href=""
                              className="text-[14px] text-bodyText translate-y-[2px] font-bold"
                            >
                              {/* language */}
                              <Language />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`cashier-quick-dropdown cashier-quick-lang-dropdown ${
                          userDropdown ? "langmenu-enable" : ""
                        }`}
                      >
                        <ul className="lang-dropdown-wrapper">
                          <li>
                            <Link href="/profile">
                              {/* Edit profile icon */}
                              <EditeProfileIcon />
                              Edit Profile
                            </Link>
                          </li>

                          <li>
                            <Link href="" className="relative">
                              <LanguageIcon />
                              Language
                            </Link>
                            <ul className="lang-sub-down">
                              <li>
                                <Link href="">English</Link>
                              </li>
                              <li>
                                <Link href="">Spanish</Link>
                              </li>
                              <li>
                                <Link href="">Chinese</Link>
                              </li>
                            </ul>
                          </li>

                          <li>
                            <Link onClick={logout}  href="/login">
                              <Logout />
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cashier-header-overlay"></div>
              <div className="cashier-header-overlay"></div>
              <div className="cashier-header-overlay"></div>
              <div className="cashier-header-overlay"></div>
              <div className="cashier-header-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

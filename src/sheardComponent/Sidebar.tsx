"use client";
import React, { useState } from "react";
import logo from "../../public/assets/img/icon/watson.png";
import logo2 from "../../public/assets/img/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import useGlobalContext from "@/hooks/use-context";
import { menuData } from "@/data/menu-data";
import Logout from "@/svg/Logout";
const Sidebar = () => {
  const { logout, user, sideMenuOpen, toggleSideMenu } = useGlobalContext();
  const [clicked, setclicked] = useState<boolean>(false);
  const [linkId, setlinkId] = useState<number>(0);
  const handleClick = (id: number) => {
    setlinkId(id);
    setclicked(!clicked);
  };
  return (
    <>
      <div className={`cashier-dashboard-sidebar sidebar-enable`}>
        <div
          className=" cashier-menu-wrapper bg-white border-r border-b border-solid border-grayBorder py-6 px-7 maxLg:px-5
        maxLg:py-6">
          <div>
            <div className="cashier-header-profile relative pl-5 flex flex-wrap items-center maxMd:pr-0 mb-7">
              <div className="cashier-header-profile-img w-12 maxSm:mr-0 md:mr-0 cursor-pointer og-profile-icon">
                <Link href="" className="rounded-[50%] overflow-hidden block">
                  <Image
                    src={user?.photo ? user?.photo : logo}
                    className=" og-profile-icon"
                    alt="profile not found"
                    width={50}
                    height={50}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
              </div>
              <div className="cashier-header-profile-info pl-2.5 cursor-pointer">
                <div>
                  <Link
                    className="text-[15px] font-bold text-heading cursor-pointer"
                    href="">
                    {user?.first_name}
                    <span className="text-[10px] font-bold leading-none pt-0.5 pb-[1px] px-1 border border-solid border-[#FFC403] text-[#FFC403] inline-block ml-2 uppercase rounded-[3px]">
                      Pro
                    </span>
                  </Link>
                </div>
                <span className="text-[13px] font-normal text-bodyText cursor-pointer">
                  Admin
                </span>
              </div>
            </div>
            <div className="cashier-menu px-0.5">
              <ul id="metismenu">
                {menuData.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.submenu?.length
                        ? `${
                            clicked && item.id === linkId
                              ? "main-menu active"
                              : "main-menu"
                          } `
                        : ""
                    }>
                    <Link
                      onClick={() => handleClick(item.id)}
                      href={item.link || ""}
                      className={item.submenu?.length ? "has-arrow" : ""}>
                      {item.icon && <item.icon />}

                      {item.text}
                    </Link>
                    {item.submenu?.length && (
                      <ul className="submenu">
                        {item.submenu.map((s, index) => (
                          <li key={index}>
                            <Link href={s.link || ""}> {s.text} </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <Link onClick={logout} href="/login">
                    {" "}
                    <Logout /> Logout
                  </Link>
                </li>
              </ul>
            </div>

            <div className="cashier-logo text-center h-[200px] w-full flex flex-col justify-center items-center bg-[#F6F8FC] rounded-lg mt-[10px]">
              <Link href="" className="inline-block">
                <Image src={logo2} alt="logo not found" />
              </Link>
            </div>
          </div>
        </div>
        <div
          onClick={toggleSideMenu}
          className={`${
            sideMenuOpen
              ? "cashier-menu-overlay cashier-menu-overlay-dashboard  sidebar-enable"
              : "cashier-menu-overlay cashier-menu-overlay-dashboard"
          }`}></div>
      </div>
    </>
  );
};

export default Sidebar;

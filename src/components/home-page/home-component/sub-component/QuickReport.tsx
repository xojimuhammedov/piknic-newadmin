"use client";
import useSellSummaries from "@/hooks/useSellSummaries";
import Link from "next/link";
import React from "react";
import userOne from "../../../../../public/assets/img/icon/quick-1.png";
import userTwo from "../../../../../public/assets/img/icon/quick-2.png";
import userThree from "../../../../../public/assets/img/icon/quick-3.png";
import userFour from "../../../../../public/assets/img/icon/quick-4.png";
import Image from "next/image";
import QuickReportLoader from "@/preloaders/QuickReportLoader";
const QuickReport = () => {
  const { data,loading,error } = useSellSummaries() as any;
  const {
    todaysSells,
    lastSevenDaysSells,
    lastThirtyDaysSells,
    lastOneYearSells,
  } = data;


 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    
      {
        loading ?
        <>
          <QuickReportLoader/>
        </>
        :
        <>
        <div className="invention-quickreport-area pl-0.5">
        <div className="cashier-quickview-area p-7 pt-5 pb-2 bg-white rounded-lg mb-5">
          <div className="cashier-dashboard-supplier-header flex flex-wrap items-center justify-between mb-6 m-0.5">
            <h5 className="text-[18px] text-heading font-bold maxSm:mb-2 maxSm:text-[16px]">
              Shortcut Report
            </h5>
            
          </div>
          <div className="cashier-quickview-wrapper flex items-center justify-between gap-x-5 maxXs:gap-x-0">
            <div className="cashier-quickview bg-[#EEF0F8] mb-5 rounded-lg">
              <Link
                href=""
                className="p-[30px] inline-block"
              >
                <div className="cashier-quickview-box">
                  <div className="cashier-quickview-box-icon mb-5">
                    <Image
                      style={{ width: "auto", height: "auto" }}
                      src={userOne}
                      alt="icon not found"
                      className="inline-block rounded-[15px]"
                    />
                  </div>
                  <h4 className="text-[22px] font-extrabold text-heading">
                    ${todaysSells}
                  </h4>
                  <span className="block text-[15px] font-semibold text-bodyText mb-8">
                    Today Sells
                  </span>
                  <span className="h-[35px] rounded-[17px] bg-white inline-block text-[14px] font-semibold leading-[35px] px-3 min-w-[70px] text-center text-heading">
                    +65%
                  </span>
                </div>
              </Link>
            </div>

            <div className="cashier-quickview bg-[#F8F0E7] mb-5 rounded-lg">
              <Link href="" className="p-[30px] inline-block">
                <div className="cashier-quickview-box">
                  <div className="cashier-quickview-box-icon mb-5">
                    <Image
                      style={{ width: "auto", height: "auto" }}
                      src={userTwo}
                      alt="icon not found"
                      className="inline-block rounded-[15px]"
                    />
                  </div>
                  <h4 className="text-[22px] font-extrabold text-heading">
                    ${lastSevenDaysSells}{" "}
                  </h4>
                  <span className="block text-[15px] font-semibold text-bodyText mb-8">
                    {`Last 7 day's `}
                    Sells
                  </span>
                  <span className="h-[35px] rounded-[17px] bg-white inline-block text-[14px] font-semibold leading-[35px] px-3 min-w-[70px] text-center text-heading">
                    +3.47%
                  </span>
                </div>
              </Link>
            </div>

            <div className="cashier-quickview bg-[#F9E8E8] mb-5 rounded-lg">
              <Link href="" className="p-[30px] inline-block">
                <div className="cashier-quickview-box">
                  <div className="cashier-quickview-box-icon mb-5">
                    <Image
                      style={{ width: "auto", height: "auto" }}
                      src={userThree}
                      alt="icon not found"
                      className="inline-block rounded-[15px]"
                    />
                  </div>
                  <h4 className="text-[22px] font-extrabold text-heading">
                    ${lastThirtyDaysSells}
                  </h4>
                  <span className="block text-[15px] font-semibold text-bodyText mb-8">
                    {`Last 30 day's `}
                    Sells
                  </span>
                  <span className="h-[35px] rounded-[17px] bg-white inline-block text-[14px] font-semibold leading-[35px] px-3 min-w-[70px] text-center text-heading">
                    -2.8%
                  </span>
                </div>
              </Link>
            </div>

            <div className="cashier-quickview bg-[#E6F2E2] mb-5 rounded-lg">
              <Link
                href=""
                className="p-[30px] inline-block"
              >
                <div className="cashier-quickview-box">
                  <div className="cashier-quickview-box-icon mb-5">
                    <Image
                      style={{ width: "auto", height: "auto" }}
                      src={userFour}
                      alt="icon not found"
                      className="inline-block rounded-[15px]"
                    />
                  </div>
                  <h4 className="text-[22px] font-extrabold text-heading">
                    ${lastOneYearSells}{" "}
                  </h4>
                  <span className="block text-[15px] font-semibold text-bodyText mb-8">
                    {" "}
                    Last 1 Year Sells
                  </span>
                  <span className="h-[35px] rounded-[17px] bg-white inline-block text-[14px] font-semibold leading-[35px] px-3 min-w-[70px] text-center text-heading">
                    +65%
                  </span>
                </div>
              </Link>
            </div>

           
          </div>
        </div>
      </div>
        </>
      }
    </>
  );
};

export default QuickReport;

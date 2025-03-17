import React from "react";
import QuickReport from "./sub-component/QuickReport";
import CashierLineChart from "./sub-component/CashierLineChart";
import ChartBar from "./sub-component/ChartBar";
import BestSellingProduct from "./sub-component/BestSellingProduct";

import RecentSoldProduct from "./sub-component/RecentSoldProduct";

const LeftComponent = () => {
  return (
    <>
      <QuickReport />
      <CashierLineChart />
      <div className="grid grid-cols-12 gap-x-5">
        <ChartBar />
        <BestSellingProduct />
        <RecentSoldProduct />
      </div>
    </>
  );
};

export default LeftComponent;

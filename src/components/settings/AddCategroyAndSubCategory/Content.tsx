import CreateCategory from "@/form/CreateCategory";
import CreateSubCategory from "@/form/CreateSubCategory";
import React from "react";
import AllCategory from "../AllCategory";
import SubCategories from "../SubCategories";

const Content = () => {
  return (
    <>
      <div className="cashier-content-area flex org-flex  mt-[30px] px-7">
        <CreateCategory /> 
      </div>

      <div className="cashier-content-area org-flex-setting flex mt-[30px] px-7">
        <AllCategory />
       
      </div>
    </>
  );
};

export default Content;

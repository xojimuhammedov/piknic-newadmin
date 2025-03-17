"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BestSellingProduct = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}/success/best-selling-products`)
      .then((res) => {
        setproducts(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="col-span-12 xl:col-span-5 lg:col-span-6">
        <div className="cashier-dashboard-supplier-area">
          <div className="cashier-balance-area p-7 pt-5 bg-white rounded-lg mb-5">
            <div className="cashier-dashboard-supplier-header flex flex-wrap items-center justify-between mb-6 m-0.5">
              <h5 className="text-[18px] text-bold font-bold maxSm:mb-2 text-heading">
                Best Selling Product
              </h5>
              <span className="common-blue-badge maxSm:mb-2">List 5</span>
            </div>
            <div className="cashier-dashboard-supplier border border-solid border-grayBorder m-0.5 border-b-0 ">
              <div className="cashier-dashboard-supplier-list h-10 flex justify-between items-center border-b-[1px] border-solid border-grayBorder">
                <div className="cashier-dashboard-supplier-list-name pl-7">
                  <h5 className="text-[15px] font-semibold text-heading">
                    Product Name
                  </h5>
                </div>
                <div className="cashier-dashboard-supplier-list-amount border-l-[1px] border-solid border-grayBorder pl-7">
                  <h5 className="text-[15px] font-semibold text-heading">
                    Total Sells
                  </h5>
                </div>
              </div>

              {products.length &&
                products.map((item: any) => (
                  <div
                    key={item.productId}
                    className="cashier-dashboard-supplier-list h-20 flex justify-between items-center border-b-[1px] border-solid border-grayBorder"
                  >
                    <div className="cashier-dashboard-supplier-list-name pl-7">
                      <span className="text-[14px] font-normal text-bodyText block mb-1">
                        {" "}
                        {item.productName}{" "}
                      </span>
                    </div>
                    <div className="cashier-dashboard-supplier-list-amount border-l-[1px] border-solid border-grayBorder pl-7">
                      <span className="text-[14px] font-normal text-bodyText">
                        ${item.totalValue}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingProduct;

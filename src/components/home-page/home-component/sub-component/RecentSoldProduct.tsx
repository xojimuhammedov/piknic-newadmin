"use client";
import useSellSummaries from "@/hooks/useSellSummaries";
import React from "react";

const RecentSoldProduct = () => {
  const { data, loading, error } = useSellSummaries() as any;
  const { recentProduct } = data;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="col-span-12">
        <div className="cashier-dashboard-transaction-area">
          <div className="cashier-dashboard-transaction-wrapper p-7 pt-5 bg-white rounded-lg mb-5">
            <div className="cashier-dashboard-supplier-header flex flex-wrap items-center justify-between mb-6 m-0.5">
              <h5 className="text-[18px] text-bold font-bold maxSm:mb-2 text-heading">
              Recent Sold Products
              </h5>
              <span className="common-blue-badge maxSm:mb-2">List 5</span>
            </div>
            <div className="cashier-dashboard-transaction">
              <div className="cashier-dashboard-transaction-row-heading">
                <div className="cashier-dashboard-transaction-dateR">
                  <h5>Date</h5>
                </div>
                <div className="cashier-dashboard-transaction-referenceR">
                  <h5>Product</h5>
                </div>
                <div className="cashier-dashboard-transaction-customerR">
                  <h5>Category</h5>
                </div>
                <div className="cashier-dashboard-transaction-duedateR">
                  <h5>Quantity</h5>
                </div>
                <div className="cashier-dashboard-transaction-modeR">
                  <h5>Price</h5>
                </div>
              </div>

              {recentProduct?.length &&
                recentProduct?.map((sell: any, index: number) => (
                  <div
                    key={index}
                    className="cashier-dashboard-transaction-row"
                  >
                    <div className="cashier-dashboard-transaction-dateR">
                      <span>{sell.orderDate}</span>
                    </div>
                    <div className="cashier-dashboard-transaction-referenceR">
                      <span>{sell.productName}</span>
                    </div>
                    <div className="cashier-dashboard-transaction-customerR">
                      <span>{sell.categoryName}</span>
                    </div>
                    <div className="cashier-dashboard-transaction-duedateR">
                      <span>{sell.totalCard}</span>
                    </div>
                    <div className="cashier-dashboard-transaction-modeR">
                      <span>${sell.totalCard * sell.price}</span>
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

export default RecentSoldProduct;

"use client"
import React from 'react';
import CartBarComp from './CartBarComp';

const ChartBar = () => {
    return (
        <>
            <div className="col-span-12 xl:col-span-7">
                  <div className="cashier-bar-chart relative bg-white pt-6 pl-1.5 pb-2 rounded-lg mb-5">
                    <div id="chartBar">
                        <CartBarComp/>
                    </div>
                  </div>
                </div>
        </>
    );
};

export default ChartBar;
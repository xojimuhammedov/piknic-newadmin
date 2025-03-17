import React from 'react';
import PieChartComp from './PieChartComp';

const PieChart = () => {
    return (
        <>
            <div className="col-span-12 xl:col-span-12 lg:col-span-6 lg:mb-5">
                  <div className="cashier-dashboard-piechart bg-white rounded-lg mb-5 lg:mb-0 pt-6 pb-4 lg:h-full">
                    <div id="chartPie">
                        <PieChartComp/>
                    </div>
                  </div>
                </div>
        </>
    );
};

export default PieChart;
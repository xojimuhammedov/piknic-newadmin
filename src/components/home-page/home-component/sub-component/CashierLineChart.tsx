import React from 'react';
import AreaCharts from './ApexChart';

const CashierLineChart = () => {
    

    return (
        <>
            <div className="cashier-line-chart bg-white pt-6 pl-1.5 rounded-lg mb-5">
                <div id="chart">
                  <AreaCharts/>
                </div>
              </div>
        </>
    );
};

export default CashierLineChart;
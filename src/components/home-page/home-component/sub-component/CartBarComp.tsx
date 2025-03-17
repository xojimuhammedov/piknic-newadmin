import useSellSummaries from '@/hooks/useSellSummaries';
import { BarChartOption } from '@/interFace/interFace';
import React from 'react';
import Chart from 'react-apexcharts'
const CartBarComp = () => {
  const { data,loading,error } = useSellSummaries() as any;
  const {
    sellsReport,
    productQuantity,
    formattedDates,
   
  } = data;

  if (loading) {
    // Render a loading indicator while fetching data
    return <div>Loading...</div>;
  }
 
  if (error) {
    // Render an error message if there's an error
    return <div>Error: {error}</div>;
  }
  
    const option:BarChartOption = {
        series: [
          {
            name: "product quantity",
            data: productQuantity
          },
          {
            name: "daily sells",
            data: sellsReport
          }
        ],
        chart: {
          type: "bar",
          height: 500,
          width: '100%',
        },
        title: {
          text: "Expense vs Income",
          align: "left",
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#E8E4F5", "#6F4EF6"],
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories:formattedDates
        },
        yaxis: {
          min: 10,
          max: 1000,
          title: {
            text: "Income Report"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val:any) {
              return "$ " + val;
            }
          }
        }
      }
    return (
        <>
            <Chart options={option} series={option.series} type="bar"  height={500} />
        </>
    );
};

export default CartBarComp;
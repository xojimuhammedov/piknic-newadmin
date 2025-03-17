import React from 'react';

const ChartPreloader = () => {
    const looopData = [
        {
            id:1
        },
        {
            id:2
        },
        {
            id:3
        },
        {
            id:4
        },
        {
            id:5
        },
        {
            id:6
        },
        {
            id:7
        },
        {
            id:8
        },
        {
            id:9
        },
        {
            id:10
        },
        {
            id:11
        },
        {
            id:12
        },
    ]
    return (
        <>
            <div className="cashier-line-chart bg-white pt-6 pl-1.5 rounded-lg mb-5">
                <div id="chart" className='chart-div'>
                    {
                        looopData.map((item)=>(
                            <div key={item.id} className='row-line-div'></div>
                        ))
                    }
                </div>
              </div>
        </>
    );
};

export default ChartPreloader;
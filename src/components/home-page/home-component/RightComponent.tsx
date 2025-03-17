import React from 'react';
import RecentClient from './sub-component/RecentClient';
import PieChart from './sub-component/PieChart';
import RecentUser from './sub-component/RecentUser';


const RightComponent = () => {
    return (
        <>
           <RecentClient/> 
           <PieChart/>
           <RecentUser/>
        </>
    );
};

export default RightComponent;
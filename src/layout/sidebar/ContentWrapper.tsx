"use client"
import React from 'react';
import BreadCamp from '../../components/common/BreadCamp';
import { childrenAndBreadCampType } from '@/interFace/interFace';
import useGlobalContext from '@/hooks/use-context';
import Footer from '../footer/Footer';

const ContentWrapper = ({ children,breadCampTitle }: childrenAndBreadCampType) => {
    const { sideMenuOpen } = useGlobalContext();
    return (
        <>
            <div className={`${sideMenuOpen ? "cashier-dashboard-main sidebar-enable": "cashier-dashboard-main"}`}>
              <BreadCamp breadCampTitle={breadCampTitle}/>
              {children}
              <Footer/>
            </div>
        </>
    );
};

export default ContentWrapper;
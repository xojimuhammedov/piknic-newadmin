import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';
import ProductsList from './ProductsList';

const ProductsMain = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Products'>
               <ProductsList/>
            </ContentWrapper>
        </>
    );
};

export default ProductsMain;
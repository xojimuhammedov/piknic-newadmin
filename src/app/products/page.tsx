import ProductsList from '@/components/all-products/ProductsList';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const BlogTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Blogs'>
              <ProductsList/>
            </ContentWrapper>
        </>
    );
};

export default BlogTablePage;
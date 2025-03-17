import BlogMain from '@/components/news/BlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const NewsTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Locations'>
              <BlogMain/>
            </ContentWrapper>
        </>
    );
};

export default NewsTablePage;
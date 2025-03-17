import BlogMain from '@/components/services/BlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const BlogTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Services'>
              <BlogMain/>
            </ContentWrapper>
        </>
    );
};

export default BlogTablePage;
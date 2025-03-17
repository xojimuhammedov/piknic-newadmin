import BlogMain from '@/components/categories/BlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const BlogTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Blogs'>
              <BlogMain/>
            </ContentWrapper>
        </>
    );
};

export default BlogTablePage;
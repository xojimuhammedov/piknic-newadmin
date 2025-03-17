import BlogMain from '@/components/sources/BlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const BlogTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Cities'>
              <BlogMain/>
            </ContentWrapper>
        </>
        
    );
};

export default BlogTablePage;
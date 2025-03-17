import BlogMain from '@/components/faqs/BlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const BlogTablePage = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='All Faqs'>
              <BlogMain/>
            </ContentWrapper>
        </>
    );
};

export default BlogTablePage;
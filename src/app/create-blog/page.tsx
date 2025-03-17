import CreateBlogMain from '@/components/create-blog/CreateBlogMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateBlog = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Create Blog'>
             <CreateBlogMain/>
            </ContentWrapper>
        </>
    );
};

export default CreateBlog;
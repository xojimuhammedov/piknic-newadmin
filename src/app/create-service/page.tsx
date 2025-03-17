import CreateServiceMain from '@/components/create-service/CreateServiceMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateBlog = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Create Blog'>
             <CreateServiceMain/>
            </ContentWrapper>
        </>
    );
};

export default CreateBlog;
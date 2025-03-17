import CreateServiceMain from '@/components/create-source/CreateServiceMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateBlog = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Create Source'>
             <CreateServiceMain/>
            </ContentWrapper>
        </>
    );
};

export default CreateBlog;
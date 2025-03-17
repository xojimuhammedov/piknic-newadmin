import CreateServiceMain from '@/components/create-faq/CreateServiceMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateBlog = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Create FAQ'>
             <CreateServiceMain/>
            </ContentWrapper>
        </>
    );
};

export default CreateBlog;
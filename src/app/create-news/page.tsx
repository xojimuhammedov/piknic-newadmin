import CreateNewsMain from '@/components/create-news/CreateNewsMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const CreateNews = () => {
    return (
        <>
            <ContentWrapper breadCampTitle='Yangilik yaratish'>
             <CreateNewsMain/>
            </ContentWrapper>
        </>
    );
};

export default CreateNews;
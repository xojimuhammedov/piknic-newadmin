import BlogUpdateMain from '@/components/faqs/blog-update/BlogUpdateMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const UpdateBlogPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
    return (
        <>
            <ContentWrapper breadCampTitle='Update Tour'>
              <BlogUpdateMain id={id}/>
            </ContentWrapper>
        </>
    );
};

export default UpdateBlogPage;
import BlogUpdateMain from '@/components/blogs/blog-update/BlogUpdateMain';
import ContentWrapper from '@/layout/sidebar/ContentWrapper';
import React from 'react';

const UpdateBlogPage = ({ params }: { params: { id: string } }) => {
    const id =  params.id
    return (
        <>
            <ContentWrapper breadCampTitle='Update Blog Post'>
              <BlogUpdateMain id={id}/>
            </ContentWrapper>
        </>
    );
};

export default UpdateBlogPage;
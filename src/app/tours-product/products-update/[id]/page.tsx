import BlogProductMain from "@/components/tours-update/BlogUpdateMain";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const UpdateBlogPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <ContentWrapper breadCampTitle="Update Blog Post">
        <BlogProductMain id={id} />
      </ContentWrapper>
    </>
  );
};

export default UpdateBlogPage;

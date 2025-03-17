import UpdateCategory from "@/components/category-update/UpdateCategory";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const UpdateCategoryPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <ContentWrapper breadCampTitle="Update Category">
        <UpdateCategory id={id} />
      </ContentWrapper>
    </>
  );
};

export default UpdateCategoryPage;

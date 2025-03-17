import UpdateCategory from "@/components/category-update/UpdateCategory";
import UpdateSubCategoryMain from "@/components/update-subcategory/UpdateSubCategoryMain";
import ContentWrapper from "@/layout/sidebar/ContentWrapper";
import React from "react";

const UpdateSubCategoryPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <ContentWrapper breadCampTitle="Update Sub Category">
        <UpdateSubCategoryMain id={id}/>
      </ContentWrapper>
    </>
  );
};

export default UpdateSubCategoryPage;

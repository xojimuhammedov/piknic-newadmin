import React from "react";
import ContentWrapper from "../../layout/sidebar/ContentWrapper";
import Content from "./Content";



const HomePageMain = () => {
  return (
    <>
      <ContentWrapper breadCampTitle="Dashboard">
         <Content/>
      </ContentWrapper>
    </>
  );
};

export default HomePageMain;

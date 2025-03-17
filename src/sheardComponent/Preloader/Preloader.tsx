import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/img/logo/logo.png";

const Preloader = () => {
   return (
      <>
         <div id="loading">
            <div id="loading-center">
               <div id="loading-center-absolute">
                  <div className="loading-icon text-center flex flex-col items-center justify-center">
                     <h2>Please wait...</h2>
                     <div>
                        <div className="preloader">
                           <span></span>
                           <span></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Preloader;


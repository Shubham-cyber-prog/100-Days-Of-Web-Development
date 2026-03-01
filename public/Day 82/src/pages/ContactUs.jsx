import React from "react";
import ContactUsForm from "../Components/contactUs/ContactUsForm";

const ContactUs = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[80%]">
         
        </div>
        <div className="lg:w-[200%]">
          <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
              Contact us for any queries
            </h1>
          
            <div className="mt-7">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
      
      </div>
    </div>
  );
};

export default ContactUs;

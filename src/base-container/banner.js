import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context";

const BannerContent = ({ bannerData, defaultTitle, defaultText }) =>
  bannerData?.alternateHtml ? (
    <div dangerouslySetInnerHTML={{ __html: bannerData.alternateHtml }} />
  ) : (
    <>
      <p className="fw-semibold mb-0">{bannerData?.title || defaultTitle}</p>
      <p className="mb-0">{bannerData?.p || defaultText}</p>
    </>
  );

const Banner = () => {
  const { pathname } = useLocation();
  const { customization } = useAppContext();

  const isRegisterPage = pathname.includes("register");
  const bannerData = isRegisterPage
    ? customization?.data?.registerBanner
    : customization?.data?.loginBanner;

  return (
    <div
      className="text-white d-flex flex-column p-4 px-5"
      style={{
        backgroundColor:
          customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
      }}
    >
      <BannerContent
        bannerData={bannerData}
        defaultTitle="PLEASE REGISTER"
        defaultText="To access your account and courses"
      />
    </div>
  );
};

export default memo(Banner);

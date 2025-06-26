import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context";

const WelcomeContent = ({ welcomeData }) =>
  welcomeData?.alternateHtml ? (
    <div dangerouslySetInnerHTML={{ __html: welcomeData.alternateHtml }} />
  ) : (
    <>
      <p className="mb-0 text-center" style={{ fontWeight: 600 }}>
        {welcomeData?.title || "Welcome"}
      </p>
      <p className="mb-0 text-center">
        {welcomeData?.p || "Please proceed to access your account"}
      </p>
    </>
  );

const WelcomeMessage = () => {
  const { pathname } = useLocation();
  const { customization } = useAppContext();

  const isRegisterPage = pathname.includes("register");
  const welcomeData = isRegisterPage
    ? customization?.data?.registerWelcome
    : customization?.data?.loginWelcome;

  return (
    <div className="d-flex flex-column py-4">
      <WelcomeContent welcomeData={welcomeData} />
    </div>
  );
};

export default memo(WelcomeMessage);

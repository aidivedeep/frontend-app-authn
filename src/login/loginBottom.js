import React, { memo } from "react";
import { useAppContext } from "../context";

const LoginBottomContent = ({ loginBottomData }) => (
  loginBottomData?.alternateHtml ? (
    <div dangerouslySetInnerHTML={{ __html: loginBottomData.alternateHtml }} />
  ) : (
    <>
      <p className="mb-0" style={{ fontWeight: 600 }}>
        {loginBottomData?.title || "Welcome Back"}
      </p>
      <p className="mb-0">{loginBottomData?.p || "Access your account to continue"}</p>
    </>
  )
);

const LoginBottom = () => {
  const { customization } = useAppContext();
  const loginBottomData = customization?.data?.loginBottom;

  return (
    <div className="d-flex flex-column py-4">
      <LoginBottomContent loginBottomData={loginBottomData} />
    </div>
  );
};

export default memo(LoginBottom);
import React, { memo } from "react";
import { useAppContext } from "../context";

const RegisterBottomContent = ({ registerBottomData }) => (
  registerBottomData?.alternateHtml ? (
    <div dangerouslySetInnerHTML={{ __html: registerBottomData.alternateHtml }} />
  ) : (
    <>
      <p className="mb-0" style={{ fontWeight: 600 }}>
        {registerBottomData?.title || "Create Your Account"}
      </p>
      <p className="mb-0">{registerBottomData?.p || "Complete registration to get started"}</p>
    </>
  )
);

const RegisterBottom = () => {
  const { customization } = useAppContext();
  const registerBottomData = customization?.data?.registerBottom;

  return (
    <div className="d-flex flex-column py-4">
      <RegisterBottomContent registerBottomData={registerBottomData} />
    </div>
  );
};

export default memo(RegisterBottom);
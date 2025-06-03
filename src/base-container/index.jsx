import React from "react";

import { getConfig } from "@edx/frontend-platform";
import { breakpoints } from "@openedx/paragon";
import classNames from "classnames";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import {
  DefaultLargeLayout,
  DefaultMediumLayout,
  DefaultSmallLayout,
} from "./components/default-layout";
import {
  ImageExtraSmallLayout,
  ImageLargeLayout,
  ImageMediumLayout,
  ImageSmallLayout,
} from "./components/image-layout";
import {
  AuthLargeLayout,
  AuthMediumLayout,
  AuthSmallLayout,
} from "./components/welcome-page-layout";
import { useAppContext } from "../context";

const BaseContainer = ({ children, showWelcomeBanner, fullName }) => {
  const enableImageLayout = getConfig().ENABLE_IMAGE_LAYOUT;
  const location = useLocation();
  const { customization, multiTenancyloading } = useAppContext();

  if (enableImageLayout) {
    return (
      <div className="layout">
        <MediaQuery maxWidth={breakpoints.extraSmall.maxWidth - 1}>
          {showWelcomeBanner ? (
            <AuthSmallLayout fullName={fullName} />
          ) : (
            <ImageExtraSmallLayout />
          )}
        </MediaQuery>
        <MediaQuery
          minWidth={breakpoints.small.minWidth}
          maxWidth={breakpoints.small.maxWidth - 1}
        >
          {showWelcomeBanner ? (
            <AuthSmallLayout fullName={fullName} />
          ) : (
            <ImageSmallLayout />
          )}
        </MediaQuery>
        <MediaQuery
          minWidth={breakpoints.medium.minWidth}
          maxWidth={breakpoints.large.maxWidth - 1}
        >
          {showWelcomeBanner ? (
            <AuthMediumLayout fullName={fullName} />
          ) : (
            <ImageMediumLayout />
          )}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
          {showWelcomeBanner ? (
            <AuthLargeLayout fullName={fullName} />
          ) : (
            <ImageLargeLayout />
          )}
        </MediaQuery>
        <div
          className={classNames("content", {
            "align-items-center mt-0": showWelcomeBanner,
          })}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="col-md-12 extra-large-screen-top-stripe" /> */}
      <div
        className="text-white d-flex flex-column p-4 px-5"
        style={{
          backgroundColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
        }}
      >
        {location.pathname.includes("register") ? (
          <>
            <p className="fw-semibold mb-0">
              {customization?.data?.registerBanner?.title || "PLEASE REGISTER"}
            </p>
            <p className="mb-0">{ customization?.data?.registerBanner?.p || "To access your account and courses" }</p>
          </>
        ) : (
          <>
            <p className="fw-semibold mb-0">
              {customization?.data?.loginBanner?.title || "PLEASE REGISTER"}
            </p>
            <p className="mb-0">{ customization?.data?.loginBanner?.p || "To access your account and courses" }</p>
          </>
        )}
      </div>

      <div className="layout">
        <MediaQuery maxWidth={breakpoints.small.maxWidth - 1}>
          {showWelcomeBanner ? (
            <AuthSmallLayout fullName={fullName} />
          ) : (
            <DefaultSmallLayout />
          )}
        </MediaQuery>
        <MediaQuery
          minWidth={breakpoints.medium.minWidth}
          maxWidth={breakpoints.large.maxWidth - 1}
        >
          {showWelcomeBanner ? (
            <AuthMediumLayout fullName={fullName} />
          ) : (
            <DefaultMediumLayout />
          )}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
          {showWelcomeBanner ? (
            <AuthLargeLayout fullName={fullName} />
          ) : (
            <DefaultLargeLayout />
          )}
        </MediaQuery>
        <div
          className={classNames("content", {
            "align-items-center mt-0": showWelcomeBanner,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
};

BaseContainer.defaultProps = {
  showWelcomeBanner: false,
  fullName: null,
};

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
  fullName: PropTypes.string,
};

export default BaseContainer;

import React, { useEffect, useState } from "react";

import { getConfig } from "@edx/frontend-platform";
import { AppProvider } from "@edx/frontend-platform/react";
import { Helmet } from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  EmbeddedRegistrationRoute,
  NotFoundPage,
  registerIcons,
  UnAuthOnlyRoute,
  Zendesk,
} from "./common-components";
import configureStore from "./data/configureStore";
import {
  AUTHN_PROGRESSIVE_PROFILING,
  LOGIN_PAGE,
  PAGE_NOT_FOUND,
  PASSWORD_RESET_CONFIRM,
  RECOMMENDATIONS,
  REGISTER_EMBEDDED_PAGE,
  REGISTER_PAGE,
  RESET_PAGE,
} from "./data/constants";
import { updatePathWithQueryParams } from "./data/utils";
import { ForgotPasswordPage } from "./forgot-password";
import Logistration from "./logistration/Logistration";
import { ProgressiveProfiling } from "./progressive-profiling";
import { RecommendationsPage } from "./recommendations";
import { RegistrationPage } from "./register";
import { ResetPasswordPage } from "./reset-password";
import "./index.scss";
import { useAppContext } from "./context";
registerIcons();

const MainApp = () => {
  const { customization, multiTenancyloading } = useAppContext();
  const [colors, setColors] = useState({
    activeColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
    activeHoverColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
    hoverColor: customization?.INDIGO_PRIMARY_COLOR || "#0A3055",
  });

  useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization.INDIGO_PRIMARY_COLOR,
        activeHoverColor: customization.INDIGO_PRIMARY_COLOR,
        hoverColor: customization.INDIGO_PRIMARY_COLOR,
      });
    }
  }, [customization]);
  return (
    <div
      style={{
        "--active-bg": colors?.activeColor,
        "--active-hover-bg": colors?.activeHoverColor,
        "--hover-bg": colors?.hoverColor,
      }}
    >
      <AppProvider store={configureStore()}>
        <Helmet>
          <link
            rel="shortcut icon"
            href={getConfig().FAVICON_URL}
            type="image/x-icon"
          />
        </Helmet>
        {getConfig().ZENDESK_KEY && <Zendesk />}

        <Routes>
          <Route
            path="/"
            element={
              <Navigate replace to={updatePathWithQueryParams(REGISTER_PAGE)} />
            }
          />
          <Route
            path={REGISTER_EMBEDDED_PAGE}
            element={
              <EmbeddedRegistrationRoute>
                <RegistrationPage />
              </EmbeddedRegistrationRoute>
            }
          />
          <Route
            path={LOGIN_PAGE}
            element={
              <UnAuthOnlyRoute>
                <Logistration selectedPage={LOGIN_PAGE} />
              </UnAuthOnlyRoute>
            }
          />
          <Route
            path={REGISTER_PAGE}
            element={
              <UnAuthOnlyRoute>
                <Logistration />
              </UnAuthOnlyRoute>
            }
          />
          <Route
            path={RESET_PAGE}
            element={
              <UnAuthOnlyRoute>
                <ForgotPasswordPage />
              </UnAuthOnlyRoute>
            }
          />
          <Route
            path={PASSWORD_RESET_CONFIRM}
            element={<ResetPasswordPage />}
          />
          <Route
            path={AUTHN_PROGRESSIVE_PROFILING}
            element={<ProgressiveProfiling />}
          />
          <Route path={RECOMMENDATIONS} element={<RecommendationsPage />} />
          <Route path={PAGE_NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to={PAGE_NOT_FOUND} />} />
        </Routes>
      </AppProvider>
    </div>
  );
};

export default MainApp;

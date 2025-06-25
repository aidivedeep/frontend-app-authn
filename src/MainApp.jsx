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
import { Spinner } from "@openedx/paragon";
// import { makeThemePersistent } from "./custom-theme-config";
registerIcons();

const MainApp = () => {
  function hexToRgb(hex) {
    if (!hex) return "0, 0, 0"; // fallback
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex.split("").map(char => char + char).join("");
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }
  const { customization, multiTenancyloading ,setMultiTenancyLoading} = useAppContext();

  const [colors, setColors] = useState({
    activeColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
    activeHoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
    hoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
    linksColor: customization?.colors?.INDIGO_LINKS_COLOR || "#0A3055",
    linksColorHover:
      customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#0A3055",
  });

  useEffect(() => {
    if (customization) {
      setColors({
        activeColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
        activeHoverColor:
          customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
        hoverColor: customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055",
        linksColor: customization?.colors?.INDIGO_LINKS_COLOR || "#0A3055",
        linksColorHover:
          customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#0A3055",
      });
    }
  }, [customization]);

  // useEffect(() => {
  //   if (customization) {
  //     const cleanup = makeThemePersistent(customization)
  //     return cleanup
  //   }
  // }, [customization])

  useEffect(() => {
    if (customization) {
      const timer = setTimeout(() => {
        const root = document.documentElement;
        const hex = customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055";
        const rgb = hexToRgb(hex);
        root.style.setProperty("--custom-shadow", rgb);
        root.style.setProperty("--active-bg", customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055");
        root.style.setProperty("--active-hover-bg", customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055");
        root.style.setProperty("--hover-bg", customization?.colors?.INDIGO_PRIMARY_COLOR || "#0A3055");
        root.style.setProperty("--links-color", customization?.colors?.INDIGO_LINKS_COLOR || "#0A3055");
        root.style.setProperty("--links-color-hover", customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#0A3055");
      }, 200);
  
      return () => clearTimeout(timer);
    }
  }, [customization]);
  return (
    <>
      {multiTenancyloading ? (
        <div className="mw-xs mx-auto pt-3 text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div
          // style={{
          //   "--active-bg": colors?.activeColor,
          //   "--active-hover-bg": colors?.activeHoverColor,
          //   "--hover-bg": colors?.hoverColor,
          //   "--links-color":colors?.linksColor,
          //   "--links-color-hover":colors?.linksColorHover,
          //   "--custom-shadow": hexToRgb(colors.activeColor),
          // }}
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
                  <Navigate
                    replace
                    to={updatePathWithQueryParams(REGISTER_PAGE)}
                  />
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
              <Route
                path="*"
                element={<Navigate replace to={PAGE_NOT_FOUND} />}
              />
            </Routes>
          </AppProvider>
        </div>
      )}
    </>
  );
};

export default MainApp;

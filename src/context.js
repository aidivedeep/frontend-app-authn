import React, { createContext, useContext, useEffect, useState } from "react";

// Context setup
const ContextAppContext = createContext();
export const useAppContext = () => useContext(ContextAppContext);

// Provider
export const ContextAppProvider = ({ children }) => {
  const [customization, setCustomization] = useState(null);
  const [multiTenancyLoading, setMultiTenancyLoading] = useState(true);

  const tenancy = process.env.tanancy;
  const siteId = process.env.tanancy_site;

  const fetchJSON = async (url, options = {}, defaultError = "Request failed") => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || defaultError);
      }
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  };

  const fetchThemeColors = async () => {
    const result = await fetchJSON(`${tenancy}/api/theme/info/${siteId}`, {}, "Failed to fetch theme colors");
    if (result?.appearance) {
      setCustomization((prev) => ({ ...prev, colors: result.appearance }));
    }
  };

  const fetchCustomization = async () => {
    setMultiTenancyLoading(true);
    const result = await fetchJSON(
      `${tenancy}/api/theme/authn/info`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      },
      "Failed to fetch customization"
    );
    if (result) setCustomization((prev) => ({ ...prev, ...result}));
    setMultiTenancyLoading(false);
  };

  useEffect(() => {
    fetchCustomization();
    fetchThemeColors();
  }, []);

  return (
    <ContextAppContext.Provider
      value={{
        customization,
        setCustomization,
        multiTenancyLoading,
        setMultiTenancyLoading,
      }}
    >
      {children}
    </ContextAppContext.Provider>
  );
};

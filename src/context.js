import React, { createContext, useContext, useEffect, useState } from "react";

const ContextAppContext = createContext();
export const useAppContext = () => useContext(ContextAppContext);

export const ContextAppProvider = ({ children }) => {
  const [customization, setCustomization] = useState(null);
  const [multiTenancyloading, setMultiTenancyloading] = useState(false);
  const siteId = process.env.tanancy_site;
  const tanancy=process.env.tanancy;
  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        setMultiTenancyloading(true);
        const response = await fetch(tanancy + "/api/theme/authn/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ siteId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch customization");
        }

        const result = await response.json();
        
        setCustomization(result);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setMultiTenancyloading(false);
      }
    };
    fetchCustomization();
  }, []);

  return (
    <ContextAppContext.Provider
      value={{
        customization,
        setCustomization,
        multiTenancyloading,
        setMultiTenancyloading,
      }}
    >
      {children}
    </ContextAppContext.Provider>
  );
};

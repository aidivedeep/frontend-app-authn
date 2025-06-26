export const makeThemePersistent = (customization) => {
    const root = document.documentElement;
    const body = document.body;
  
    const hexToRgb = (hex) => {
      if (!hex) return "0, 0, 0";
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
      const intVal = parseInt(hex, 16);
      return `${(intVal >> 16) & 255}, ${(intVal >> 8) & 255}, ${intVal & 255}`;
    };
  
    const colors = {
      "--custom-shadow": hexToRgb(customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D"),
      "--active-bg": customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
      "--active-hover-bg": customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
      "--hover-bg": customization?.colors?.INDIGO_PRIMARY_COLOR || "#15376D",
      "--links-color": customization?.colors?.INDIGO_LINKS_COLOR || "#15376D",
      "--links-color-hover": customization?.colors?.INDIGO_LINKS_HOVER_COLOR || "#15376D"
    };
  
    Object.entries(colors).forEach(([key, val]) => {
      root.style.setProperty(key, val);
      body.style.setProperty(key, val); // optional: in case Paragon uses body
    });
  
    // Reapply styles on paragon reloading
    body.classList.add('theme-persistent');
  
    return () => {
      Object.keys(colors).forEach(key => {
        root.style.removeProperty(key);
        body.style.removeProperty(key);
      });
      body.classList.remove('theme-persistent');
    };
  };
  
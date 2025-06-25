// Simple function to apply your theme colors
function applyTheme(customization) {
    if (!customization || !customization.colors) return
  
    function hexToRgb(hex) {
      if (!hex) return "0, 0, 0"
      hex = hex.replace(/^#/, "")
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("")
      }
      const bigint = Number.parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return `${r}, ${g}, ${b}`
    }
  
    const root = document.documentElement
    const primaryColor = customization.colors.INDIGO_PRIMARY_COLOR || "#0A3055"
    const linksColor = customization.colors.INDIGO_LINKS_COLOR || "#0A3055"
    const linksHoverColor = customization.colors.INDIGO_LINKS_HOVER_COLOR || "#0A3055"
    const rgb = hexToRgb(primaryColor)
  
    // Set variables with !important to prevent overrides
    root.style.setProperty("--custom-shadow", rgb, "important")
    root.style.setProperty("--active-bg", primaryColor, "important")
    root.style.setProperty("--active-hover-bg", primaryColor, "important")
    root.style.setProperty("--hover-bg", primaryColor, "important")
    root.style.setProperty("--links-color", linksColor, "important")
    root.style.setProperty("--links-color-hover", linksHoverColor, "important")
  
    // Create a style element to make sure variables persist
    let styleElement = document.getElementById("persistent-theme")
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "persistent-theme"
      document.head.appendChild(styleElement)
    }
  
    // Add CSS rules that will override any conflicting styles
    styleElement.textContent = `
      :root {
        --custom-shadow: ${rgb} !important;
        --active-bg: ${primaryColor} !important;
        --active-hover-bg: ${primaryColor} !important;
        --hover-bg: ${primaryColor} !important;
        --links-color: ${linksColor} !important;
        --links-color-hover: ${linksHoverColor} !important;
      }
    `
  
    // Move our style element to the end of head to ensure it loads last
    document.head.appendChild(styleElement)
  }
  
  // Function to keep re-applying theme when other styles try to override
  function makeThemePersistent(customization) {
    // Apply immediately
    applyTheme(customization)
  
    // Apply again after 100ms to catch late-loading styles
    setTimeout(() => applyTheme(customization), 100)
  
    // Apply again after 500ms to be extra sure
    setTimeout(() => applyTheme(customization), 500)
  
    // Watch for new stylesheets being added and re-apply theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "STYLE" || node.tagName === "LINK") {
            // New stylesheet added, re-apply our theme
            setTimeout(() => applyTheme(customization), 10)
          }
        })
      })
    })
  
    observer.observe(document.head, { childList: true })
  
    return function cleanup() {
      observer.disconnect()
    }
  }
  
  export { applyTheme, makeThemePersistent }
  
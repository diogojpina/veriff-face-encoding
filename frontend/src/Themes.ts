const theme = {
  color: {
    primary: import.meta.env.VITE_THEME_COLOR_PRIMARY || "#519022",
    secondary: import.meta.env.VITE_THEME_COLOR_SECONDARY || "#1f5e00",
    tertiary: import.meta.env.VITE_THEME_COLOR_TERTIARY || "#2f3842",
    quaternary: import.meta.env.VITE_THEME_COLOR_QUATERNARY || "#ffffff",
    quinary: import.meta.env.VITE_THEME_COLOR_QUINARY || "#f0f0f0",
    senary: import.meta.env.VITE_THEME_COLOR_SENARY || "#3C6C19",
    septenary: import.meta.env.VITE_THEME_COLOR_SEPTENARY || "#e4ebe0",
  },
  logo: {
    url:
      import.meta.env.VITE_THEME_LOGO_URL ||
      "/images/header-images/entelco-logo.png",
  },
  secondLogo: {
    url:
      import.meta.env.VITE_THEME_SECOND_LOGO_URL ||
      "/images/header-images/winex-second-logo.png",
  },
  company: {
    name: import.meta.env.VITE_THEME_COMPANY_NAME || "Entelco",
  },
};

export default theme;

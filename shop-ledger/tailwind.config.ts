import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
        },
        border: "var(--border)",
        ink: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
    },
  },
};

export default config;
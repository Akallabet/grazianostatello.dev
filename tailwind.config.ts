// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // black: colors.black,
      // white: colors.white,
      rose: colors.rose,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      purple: colors.purple,
      violet: colors.violet,
      indigo: colors.indigo,
      blue: colors.blue,
      sky: colors.sky,
      cyan: colors.cyan,
      teal: colors.teal,
      emerald: colors.emerald,
      green: colors.green,
      lime: colors.lime,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      red: colors.red,
      gray: colors.gray,
    },
    extend: {
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
      },
      height: {
        "112": "28rem",
        "128": "32rem",
      },
      minHeight: {
        "48": "12rem",
        "96": "24rem",
      },
      maxHeight: {
        "half-screen": "50vh",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            h2: {
              color: theme("colors.gray.800"),
            },
            h3: {
              color: theme("colors.gray.800"),
            },
            strong: {
              color: theme("colors.gray.800"),
            },
            a: {
              color: theme("colors.violet.500"),
              "&:hover": {
                color: theme("colors.violet.600"),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.400"),
            a: { color: theme("colors.gray.100") },
            strong: { color: theme("colors.gray.100") },
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.100") },
            h4: { color: theme("colors.gray.100") },
            code: { color: theme("colors.gray.100") },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.800"),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ({ addComponents, theme }) => {
      const container = {
        ".container": {
          margin: "auto",
          maxWidth: theme("maxWidth.full"),
          "@screen sm": {
            maxWidth: theme("maxWidth.2xl"),
          },
          "@screen md": {
            maxWidth: theme("maxWidth.3xl"),
          },
          "@screen lg": {
            maxWidth: theme("maxWidth.5xl"),
          },
          "@screen xl": {
            maxWidth: theme("maxWidth.6xl"),
          },
          "@screen 2xl": {
            maxWidth: theme("maxWidth.6xl"),
          },
        },
      };
      addComponents(container);
    },
  ],
};

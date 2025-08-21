// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('./tailwind.config.cjs');

module.exports = {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
};

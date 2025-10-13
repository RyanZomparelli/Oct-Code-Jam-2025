import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  root: ".",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./index.html"),
        calendar: resolve(__dirname, "src/pages/calander/calendar.html"),
        myEvents: resolve(__dirname, "src/pages/myevents/myevents.html"),
      },
    },
  },
};

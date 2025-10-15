import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  root: ".",
  build: {
    rollupOptions: {
      input: {
        calendar: resolve(__dirname, "src/pages/calendar/calendar.html"),
        myEvents: resolve(__dirname, "src/pages/myevents/myevents.html"),
      },
    },
  },
};

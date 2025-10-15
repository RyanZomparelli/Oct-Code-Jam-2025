import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  root: ".",
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        calendar: "./src/pages/calendar/calendar.html",
        myEvents: "./src/pages/myevents/myevents.html",
      },
    },
  },
};

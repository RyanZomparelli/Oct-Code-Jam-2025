import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  server: {
    open: "/src/pages/home/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "./src/pages/home/index.html"),
        calendar: resolve(__dirname, "./src/pages/calendar/calendar.html"),
        myEvents: resolve(__dirname, "./src/pages/myevents/myevents.html"),
      },
    },
  },
};

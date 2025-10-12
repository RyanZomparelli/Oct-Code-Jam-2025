import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        calendar: resolve(__dirname, "./calendar/calendar.html"),
        myEvents: resolve(__dirname, "./myevents/myevents.html"),
      },
    },
  },
};

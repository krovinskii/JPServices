// @ts-check
import { defineConfig } from "astro/config";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
    image: {
        service: {
            entrypoint: "astro/assets/services/sharp",
        },
    },

    integrations: [compress()],
});

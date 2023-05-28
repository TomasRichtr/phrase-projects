import i18n from "@/i18n";
import router from "@/router";
import { createTestingPinia } from "@pinia/testing";
import { config } from "@vue/test-utils";

config.global.mocks.$t = (key: string) => key;
config.global.mocks.$i18n = i18n;
config.global.mocks.$router = router;
config.global.plugins = [i18n, router, createTestingPinia({ stubActions: false })];

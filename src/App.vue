<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { ROUTES } from "@/enums";
import czLocale from "ant-design-vue/es/locale/cs_CZ";
import enLocale from "ant-design-vue/es/locale/en_GB";
import dayjs from "dayjs";
import "dayjs/locale/cs.js";
import "dayjs/locale/en-gb.js";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";

dayjs.locale("cs");
dayjs.locale("en-gb");

const { locale } = useI18n();
const currentLocale = computed(() => {
 return locale.value === "cs" ? czLocale : enLocale;
});
</script>

<template>
 <a-config-provider :locale="currentLocale">
  <page-header v-if="$route.name !== ROUTES.NOT_FOUND.name" />
  <RouterView />
 </a-config-provider>
</template>

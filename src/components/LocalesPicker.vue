<template>
  <a-button @click="changeLocales($i18n.locale === LOCALES.CS ? LOCALES.EN : LOCALES.CS)">
    {{ pickerLabel }}
  </a-button>
</template>

<script lang="ts" setup>
import { LOCALES } from "@/enums";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();

const pickerLabel = computed(() => {
  return locale.value === LOCALES.CS ? LOCALES.EN.toUpperCase() : LOCALES.CS.toUpperCase();
});

const changeLocales = async (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("phrase-project-locale", newLocale);
  await router.replace({ params: { locale: newLocale } });
};
</script>

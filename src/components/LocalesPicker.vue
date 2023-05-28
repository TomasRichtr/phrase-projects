<template>
  <a-button @click="changeLocales($i18n.locale === LOCALES.CS ? LOCALES.EN : LOCALES.CS)">
    {{ pickerLabel }}
  </a-button>
</template>

<script lang="ts" setup>
import { DEFAULT_LOCALE, LOCALES } from "@/enums";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();

const pickerLabel = computed(() => {
  return locale.value === LOCALES.CS ? LOCALES.EN.toUpperCase() : LOCALES.CS.toUpperCase();
});

const changeLocales = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("phrase-project-locale", newLocale);
  router.replace({ params: { locale: newLocale } });
};

onMounted(() => {
  const savedLocale = localStorage.getItem("phrase-project-locale");
  changeLocales((route.params.locale as string) || savedLocale || DEFAULT_LOCALE);
});
</script>

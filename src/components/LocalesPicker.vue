<template>
 <a-button @click="changeLocales($i18n.locale === 'cs' ? 'en' : 'cs')">
  {{ pickerLabel }}
 </a-button>
</template>

<script lang="ts" setup>
import { DEFAULT_LOCALE } from "@/enums";
import languages from "language-list";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();

const pickerLabel = computed(() => {
 return locale.value === "cs"
  ? languages().getLanguageName("en")
  : languages().getLanguageName("cs");
});

const changeLocales = (newLocale) => {
 locale.value = newLocale;
 localStorage.setItem("phrase-project-locale", newLocale);
 router.replace({ params: { locale: newLocale } });
};

onMounted(() => {
 const savedLocale = localStorage.getItem("phrase-project-locale");
 console.log(route.params);
 changeLocales((route.params.locale as string) || savedLocale || DEFAULT_LOCALE);
});
</script>

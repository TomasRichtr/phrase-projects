<template>
 <a-button @click="changeLocales">
  {{ pickerLabel  }}
 </a-button>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted } from "vue";
import languages from "language-list";

const { locale } = useI18n();

const pickerLabel = computed(() => {
 return locale.value === 'cs' ? languages().getLanguageName('en') : languages().getLanguageName('cs');
});

const changeLocales = () => {
 locale.value = locale.value === "cs" ? "en" : "cs";
 localStorage.setItem('phrase-project-locale', locale.value)
};

onMounted(() => {
 const savedLocale = localStorage.getItem('phrase-project-locale')
 if (savedLocale) locale.value = savedLocale;
})
</script>


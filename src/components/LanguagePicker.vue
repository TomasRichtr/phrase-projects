<script setup lang="ts">
import languages from "language-list";
import { computed, ref } from "vue";

defineProps({
 multiple: {
  type: Boolean,
  default: false
 }
});

const value = ref();

const languageOptions = computed(() => {
 const langData = languages().getData();
 return langData.map(({ language, code }: { language: string; code: number }) => ({
  label: language,
  value: code
 }));
});

const filterOption = (input: string, option: { label: string, value: string }) => {
 return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<template>
 <a-select
  v-model:value="value"
  :mode="multiple ? 'multiple' : null"
  show-search
  placeholder="Select a language"
  :options="languageOptions"
  :filter-option="filterOption"
 />
</template>

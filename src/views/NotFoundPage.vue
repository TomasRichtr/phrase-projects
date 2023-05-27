<template>
 <page-wrapper>
  <div class="flex flex-col gap-10">
   <h1 class="text-3xl">404 - {{ $t("messages.notFound") }}</h1>
   <a-button href="/">{{ $t("labels.backToHome") }}</a-button>
  </div>
 </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/layout/PageWrapper.vue";
</script>

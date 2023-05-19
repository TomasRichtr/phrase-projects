<template>
 <a-page-header
  title="Phrase projects"
  v-on="
   $route.name === ROUTES.PROJECTS_FORM.name
    ? { back: () => $router.push(ROUTES.PROJECTS_LIST.path) }
    : {}
  "
 >
  <template #extra>
   <a-button
    v-if="$route.name === ROUTES.PROJECTS_LIST.name"
    type="primary"
    :href="ROUTES.PROJECTS_FORM.path"
   >
    Create new project
   </a-button>
  </template>

  <div class="">
   <a-tag color="blue">New: {{ projectStore.projectsByStatuses.new }}</a-tag>
   <a-tag color="cyan">Completed: {{ projectStore.projectsByStatuses.completed }}</a-tag>
   <a-tag color="green">Delivered: {{ projectStore.projectsByStatuses.delivered }}</a-tag>
  </div>

  <div class="mt-2">
   <a-tag color="red">Overdue: {{ projectStore.overdueProjectCount }}</a-tag>
   <a-tag color="pink"
    >Most prominent source language: {{ projectStore.mostProminentLanguage }}</a-tag
   >
  </div>
 </a-page-header>
</template>

<script setup lang="ts">
import useProjectStore from "@/stores/projects";
const projectStore = useProjectStore();
import { ROUTES } from "@/router/index";
</script>

<style scoped></style>

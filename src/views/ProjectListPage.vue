<template>
 <page-wrapper>
  <project-table />
 </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/layout/PageWrapper.vue";
import ProjectTable from "@/components/ProjectTable.vue";
import useProjectStore from "@/stores/projects";
import { onMounted } from "vue";

const projectStore = useProjectStore();

onMounted(async () => {
 await projectStore.fetchProjects();
});
</script>

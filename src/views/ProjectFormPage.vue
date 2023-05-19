<template>
 <page-wrapper>
  <a-form
   :model="projectStore"
   name="nest-messages"
   layout="vertical"
   :validate-messages="validateMessages"
   class="w-full"
   @finish="onSubmit"
  >
   <a-form-item
    :name="['project', 'name']"
    label="Name"
    :rules="[{ required: true }]"
   >
    <a-input
     v-model:value="projectStore.project.name"
     placeholder="Insert name..."
    />
   </a-form-item>

   <a-form-item
    :name="['project', 'dateDue']"
    label="Overdue date"
    :rules="[{ required: true }]"
   >
    <a-date-picker
     v-model:value="projectStore.project.dateDue"
     valueFormat="YYYY-MM-DD"
    />
   </a-form-item>

   <a-form-item
    v-if="!!$route.params.id"
    :name="['project', 'status']"
    label="Status"
    :rules="[{ required: true }]"
   >
    <a-select
     v-model:value="projectStore.project.status"
     :options="options"
    />
   </a-form-item>

   <a-form-item
    :name="['project', 'sourceLanguage']"
    label="Source language"
    :rules="[{ required: true }]"
   >
    <language-picker v-model:value="projectStore.project.sourceLanguage" />
   </a-form-item>

   <a-form-item
    :name="['project', 'targetLanguages']"
    label="Target languages"
    :rules="[{ required: true }]"
   >
    <language-picker
     v-model:value="projectStore.project.targetLanguages"
     :multiple="true"
    />
   </a-form-item>

   <a-form-item>
    <a-button
     type="ghost"
     html-type="submit"
     :loading="projectStore.loading"
     size="large"
     >Submit</a-button
    >
   </a-form-item>
  </a-form>
 </page-wrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/layout/PageWrapper.vue";
import useProjectStore from "@/stores/projects";
import LanguagePicker from "@/components/LanguagePicker.vue";
import { useRoute } from "vue-router";
import { useDateFormat } from "@vueuse/core";
import { onMounted } from "vue";

const projectStore = useProjectStore();
const route = useRoute();

const validateMessages = {
 required: "${label} is required!"
};
const options = [
 {
  value: "NEW",
  label: "New"
 },
 {
  value: "COMPLETED",
  label: "Completed"
 },
 {
  value: "DELIVERED",
  label: "Delivered"
 }
];

const onSubmit = () => {
 route.params.id
  ? projectStore.updateProject(projectStore.project)
  : projectStore.createProject(projectStore.project);
};

onMounted(async () => {
 await projectStore.fetchProjects();

 if (route.params.id) {
  const selectedProject = projectStore.projects.find(({ id }) => id === +route.params.id);
  if (!selectedProject) return;

  const dateDue = useDateFormat(new Date(selectedProject.dateDue), "YYYY-MM-DD");
  projectStore.project = { ...selectedProject, dateDue: dateDue.value };
 }
});
</script>

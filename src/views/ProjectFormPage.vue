<template>
  <page-wrapper>
    <a-form
      :model="projectStore"
      name="nest-messages"
      layout="vertical"
      :validate-messages="validateMessages"
      class="w-full"
      scrollToFirstError
      @finish="onSubmit"
    >
      <a-form-item
        :name="['project', 'name']"
        :label="$t('titles.name')"
        :rules="[{ required: true, max: 30 }]"
      >
        <a-input
          ref="nameInput"
          v-model:value="projectStore.project.name"
          :placeholder="$t('placeholders.insertName')"
        />
      </a-form-item>

      <a-form-item
        :name="['project', 'dateDue']"
        :label="$t('labels.overdueDate')"
        :rules="[{ required: true }]"
      >
        <a-date-picker
          v-model:value="projectStore.project.dateDue"
          valueFormat="YYYY-MM-DD"
          format="ll"
        />
      </a-form-item>

      <a-form-item
        v-if="!!$route.params.id"
        :name="['project', 'status']"
        :label="$t('titles.status')"
        :rules="[{ required: true }]"
      >
        <a-select
          v-model:value="projectStore.project.status"
          :options="options"
        />
      </a-form-item>

      <a-form-item
        :name="['project', 'sourceLanguage']"
        :label="$t('titles.sourceLanguage')"
        :rules="[{ required: true }]"
      >
        <language-picker v-model:value="projectStore.project.sourceLanguage" />
      </a-form-item>

      <a-form-item
        :name="['project', 'targetLanguages']"
        :label="$t('titles.targetLanguages')"
        :rules="[{ required: true }]"
      >
        <language-picker
          v-model:value="projectStore.project.targetLanguages"
          :multiple="true"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="projectStore.loading"
          size="large"
        >
          {{ $t("labels.submit") }}
        </a-button>
      </a-form-item>
    </a-form>
  </page-wrapper>
</template>

<script setup lang="ts">
import LanguagePicker from "@/components/LanguagePicker.vue";
import PageWrapper from "@/components/layout/PageWrapper.vue";
import { ROUTES, STATUSES } from "@/enums";
import router from "@/router";
import useProjectStore from "@/stores/projects";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const projectStore = useProjectStore();
const route = useRoute();
const { t } = useI18n();

const nameInput = ref();
const validateMessages = computed(() => {
  return {
    required: t("messages.isRequired", { label: "${label}" }),
    string: {
      max: t("messages.maxLength", { label: "${label}", length: "${max}" })
    }
  };
});

const options = computed(() => [
  {
    value: STATUSES.NEW,
    label: t("labels.new")
  },
  {
    value: STATUSES.COMPLETED,
    label: t("labels.completed")
  },
  {
    value: STATUSES.DELIVERED,
    label: t("labels.delivered")
  }
]);

const onSubmit = () => {
  route.params.id
    ? projectStore.updateProject(projectStore.project)
    : projectStore.createProject(projectStore.project);
};

onMounted(async () => {
  await projectStore.fetchProjects();

  if (route.params.id) {
    const selectedProject = projectStore.projects.find(({ id }) => id === +route.params.id);
    if (!selectedProject) {
      await router.push({ name: ROUTES.NOT_FOUND.name });
      return;
    }

    const dateDue = dayjs(selectedProject.dateDue).format("YYYY-MM-DD");
    projectStore.project = { ...selectedProject, dateDue: dateDue };
  } else {
    projectStore.resetProject();
  }

  nameInput.value.$el.focus();
});
</script>

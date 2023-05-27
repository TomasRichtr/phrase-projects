<template>
 <a-page-header
  :title="`Phrase ${$t('titles.projects')}`"
  v-on="
   $route.name === ROUTES.PROJECTS_FORM.name
    ? { back: () => $router.push(tr.i18nRoute({ name: ROUTES.PROJECTS_LIST.name })) }
    : {}
  "
 >
  <template #extra>
   <locales-picker />
   <a-button
    v-if="[ROUTES.PROJECTS_LIST.name].includes($route.name)"
    type="primary"
    @click="$router.push(tr.i18nRoute({ name: ROUTES.PROJECTS_FORM.name }))"
   >
    {{ $t("labels.newProject") }}
   </a-button>
  </template>

  <div class="">
   <a-tag color="blue">{{ $t("labels.new") }}: {{ projectStore.projectsByStatuses.new }}</a-tag>
   <a-tag color="cyan"
    >{{ $t("labels.completed") }}: {{ projectStore.projectsByStatuses.completed }}</a-tag
   >
   <a-tag color="green"
    >{{ $t("labels.delivered") }}: {{ projectStore.projectsByStatuses.delivered }}</a-tag
   >
  </div>

  <div class="mt-2">
   <a-tag color="red">{{ $t("titles.overdue") }}: {{ projectStore.overdueProjectCount }}</a-tag>
   <a-tag color="pink"
    >{{ $t("labels.mostProminentLanguage") }}: {{ projectStore.mostProminentLanguage }}
   </a-tag>
  </div>
 </a-page-header>
</template>

<script setup lang="ts">
import LocalesPicker from "@/components/LocalesPicker.vue";
import { ROUTES } from "@/enums";
import tr from "@/i18n/translationMiddleware";
import useProjectStore from "@/stores/projects";

const projectStore = useProjectStore();
</script>

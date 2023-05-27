<template>
 <a-table
  :columns="columns"
  :data-source="projectStore.projectList"
  :pagination="false"
  :loading="projectStore.loading"
  bordered
  :scroll="{ x: 1500, y: 625 }"
  >>
  <template
   #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
  >
   <div class="p-2">
    <a-input
     ref="searchInput"
     :placeholder="$t('placeholders.searchName')"
     :value="selectedKeys[0]"
     class="w-full mb-2 block"
     @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
     @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
    />
    <div class="flex gap-2">
     <a-button
      type="primary"
      size="small"
      class="w-1/2"
      @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
     >
      <template #icon>
       <SearchOutlined />
      </template>
      {{ $t("labels.search") }}
     </a-button>
     <a-button
      size="small"
      class="w-1/2"
      @click="handleReset(clearFilters)"
     >
      {{ $t("labels.reset") }}
     </a-button>
    </div>
   </div>
  </template>

  <template #bodyCell="{ column, record }">
   <template v-if="column.dataIndex === 'operation'">
    <div class="flex justify-between gap-1">
     <router-link
      :to="tr.i18nRoute({ name: ROUTES.PROJECTS_FORM.name, params: { id: record.id } })"
      class="text-blue-500 text-xs flex items-center uppercase"
     >
      {{ $t("labels.edit") }}
     </router-link>
     <div class="pt-1">/</div>
     <a-button
      type="link"
      class="text-xs m-0 p-0 uppercase w-fit"
      @click="deleteProject(record.id)"
     >
      {{ $t("labels.delete") }}
     </a-button>
    </div>
   </template>
  </template>
 </a-table>
</template>

<script setup lang="ts">
import { ROUTES } from "@/enums";
import tr from "@/i18n/translationMiddleware";
import useProjectStore, { type IProject } from "@/stores/projects";
import { useArrayUnique } from "@vueuse/core";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const projectStore = useProjectStore();
const { t } = useI18n();
const searchInput = ref();
const state = reactive({
 searchText: "",
 searchedColumn: ""
});

defineProps({
 loading: {
  type: Boolean,
  default: false
 }
});

const deleteProject = async (id: number) => {
 await projectStore.deleteProject(id);
 await projectStore.fetchProjects();
};

const statusOptions = computed(() => {
 const statuses = projectStore.projectList?.map((item) => item.status) || [];
 return useArrayUnique(statuses).value.map((status) => ({
  text: status.toLowerCase(),
  value: status
 }));
});

const handleSearch = (selectedKeys: string[], confirm: Function, dataIndex: string) => {
 confirm();
 state.searchText = selectedKeys[0];
 state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters: Function) => {
 clearFilters({ confirm: true });
 state.searchText = "";
};

const columns = computed(() => {
 return [
  {
   name: "ID",
   dataIndex: "id",
   key: "id",
   sorter: (a: IProject, b: IProject) => a.id - b.id,
   ellipsis: true,
   align: "center",
   width: 50
  },
  {
   title: t("titles.name"),
   dataIndex: "name",
   key: "name",
   customFilterDropdown: true,
   ellipsis: true,
   width: 150,
   sorter: (a: IProject, b: IProject) => a.name.localeCompare(b.name),
   onFilter: (value: string, record: IProject) =>
    record.name.toString().toLowerCase().includes(value.toLowerCase()),
   onFilterDropdownVisibleChange: (visible: boolean) => {
    if (visible) {
     setTimeout(() => {
      searchInput.value.focus();
     }, 100);
    }
   }
  },
  {
   title: t("titles.created"),
   dataIndex: "dateCreated",
   key: "dateCreated",
   width: 150,
   ellipsis: true
  },
  {
   title: t("titles.updated"),
   key: "dateUpdated",
   dataIndex: "dateUpdated",
   width: 150,
   ellipsis: true
  },
  {
   title: t("titles.overdue"),
   key: "dateDue",
   dataIndex: "dateDue",
   width: 150,
   ellipsis: true,
   sorter: (a: IProject, b: IProject) => +new Date(a.dateDue) - +new Date(b.dateDue)
  },
  {
   title: t("titles.sourceLanguage"),
   key: "sourceLanguage",
   width: 150,
   ellipsis: true,
   dataIndex: "sourceLanguage"
  },
  {
   title: t("titles.targetLanguages"),
   key: "targetLanguages",
   width: 150,
   ellipsis: true,
   dataIndex: "targetLanguages"
  },
  {
   title: t("titles.status"),
   key: "status",
   dataIndex: "status",
   width: 150,
   ellipsis: true,
   align: "center",
   sorter: (a: IProject, b: IProject) => a.status.localeCompare(b.status),
   filters: statusOptions.value,
   onFilter: (value: string, record: IProject) => record.status.includes(value)
  },
  {
   title: t("titles.operation"),
   key: "operation",
   width: 120,
   dataIndex: "operation",
   align: "center",
   fixed: "right"
  }
 ];
});
</script>

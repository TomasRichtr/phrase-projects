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
     :placeholder="`Search ${column.dataIndex}`"
     :value="selectedKeys[0]"
     class="w-44 mb-2 block"
     @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
     @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
    />
    <a-button
     type="primary"
     size="small"
     class="w-24 mr-2"
     @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
    >
     <template #icon>
      <SearchOutlined />
     </template>
     Search
    </a-button>
    <a-button
     size="small"
     class="w-24"
     @click="handleReset(clearFilters)"
    >
     Reset
    </a-button>
   </div>
  </template>

  <template #bodyCell="{ column, record }">
   <template v-if="column.dataIndex === 'operation'">
    <div class="flex gap-1">
     <router-link
      :to="{ name: ROUTES.PROJECTS_FORM.name, params: { id: record.id } }"
      class="text-blue-500 text-xs flex items-center"
     >
      EDIT
     </router-link>
     <span class="pt-1">/</span>
     <a-button
      type="link"
      class="text-xs m-0 p-0"
      @click="deleteProject(record.id)"
      >DELETE</a-button
     >
    </div>
   </template>
  </template>
 </a-table>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useArrayUnique } from "@vueuse/core";
import useProjectStore, { type IProject } from "@/stores/projects";
import { ROUTES } from "@/router";

const projectStore = useProjectStore();

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
   title: "Name",
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
   title: "Created",
   dataIndex: "dateCreated",
   key: "dateCreated",
   width: 150,
   ellipsis: true
  },
  {
   title: "Updated",
   key: "dateUpdated",
   dataIndex: "dateUpdated",
   width: 150,
   ellipsis: true
  },
  {
   title: "Overdue",
   key: "dateDue",
   dataIndex: "dateDue",
   width: 150,
   ellipsis: true,
   sorter: (a: IProject, b: IProject) => +new Date(a.dateDue) - +new Date(b.dateDue)
  },
  {
   title: "Source language",
   key: "sourceLanguage",
   width: 150,
   ellipsis: true,
   dataIndex: "sourceLanguage"
  },
  {
   title: "Target languages",
   key: "targetLanguages",
   width: 150,
   ellipsis: true,
   dataIndex: "targetLanguages"
  },
  {
   title: "Status",
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
   title: "Operation",
   key: "operation",
   width: 100,
   dataIndex: "operation",
   align: "center",
   fixed: "right"
  }
 ];
});
</script>

<style scoped></style>

import { createRouter, createWebHistory } from "vue-router";
import ProjectList from "@/views/ProjectListPage.vue";
import ProjectForm from "@/views/ProjectFormPage.vue";

export const ROUTES = {
 PROJECTS_LIST: { name: "projects-list", path: "/" },
 PROJECTS_FORM: { name: "project-form", path: "/project-form" }
};

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: ROUTES.PROJECTS_LIST.path,
   name: ROUTES.PROJECTS_LIST.name,
   component: ProjectList
  },
  {
   path: `${ROUTES.PROJECTS_FORM.path}/:id?`,
   name: ROUTES.PROJECTS_FORM.name,
   component: ProjectForm
  }
 ]
});

export default router;

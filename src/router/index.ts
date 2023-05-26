import { createRouter, createWebHistory } from "vue-router";
import ProjectListPage from "@/views/ProjectListPage.vue";
import ProjectFormPage from "@/views/ProjectFormPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import { ROUTES } from "@/enums";

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: ROUTES.PROJECTS_LIST.path,
   name: ROUTES.PROJECTS_LIST.name,
   component: ProjectListPage
  },
  {
   path: `${ROUTES.PROJECTS_FORM.path}/:id?`,
   name: ROUTES.PROJECTS_FORM.name,
   component: ProjectFormPage
  },
  {
   path: ROUTES.NOT_FOUND.path,
   name: ROUTES.NOT_FOUND.name,
   component: NotFoundPage
  }
 ]
});

export default router;

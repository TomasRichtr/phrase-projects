import { ROUTES } from "@/enums";
import Tr from "@/i18n/translationMiddleware";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ProjectFormPage from "@/views/ProjectFormPage.vue";
import ProjectListPage from "@/views/ProjectListPage.vue";
import { RouterView, createRouter, createWebHistory } from "vue-router";

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: "/:locale?",
   component: RouterView,
   beforeEnter: Tr.routeMiddleware,
   children: [
    {
     path: "",
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
  }
 ]
});

export default router;

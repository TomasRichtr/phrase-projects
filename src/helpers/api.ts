import { ROUTES } from "@/enums";
import i18n from "@/i18n";
import router from "@/router";
import useProjectStore from "@/stores/projects";
import type { IProject } from "@/types";
import { notification } from "ant-design-vue";
import axios from "axios";

interface IAxiosError extends Error {
  response?: {
    status: number;
    data: any;
  };
}

class Api {
  async createProject(project: IProject) {
    try {
      const { data } = await axios.post("/api/projects", project);
      this._notifyOnSuccess("messages.projectCreated");
      return data;
    } catch (err) {
      this._notifyOnError(err as Error);
    } finally {
      await router.replace({ name: ROUTES.PROJECTS_LIST.name });
    }
  }

  async getProjects() {
    const projectStore = useProjectStore();

    try {
      const { data } = await axios.get("/api/projects");
      projectStore.$state.hasError = false;
      return data._embedded.projects;
    } catch (err) {
      this._notifyOnError(err as Error);
      return [];
    }
  }

  async updateProject(project: IProject) {
    const projectStore = useProjectStore();

    try {
      const { data } = await axios.put(`/api/projects/${project.id}`, project);
      this._notifyOnSuccess("messages.projectUpdated");
      projectStore.$state.hasError = false;
      return data;
    } catch (err) {
      this._notifyOnError(err as Error);
    } finally {
      await router.replace({ name: ROUTES.PROJECTS_LIST.name });
      projectStore.$state.loading = false;
    }
  }

  async deleteProject(id: number) {
    const projectStore = useProjectStore();

    try {
      await axios.delete(`/api/projects/${id}`);
      this._notifyOnSuccess("messages.projectDeleted");
    } catch (err) {
      this._notifyOnError(err as Error);
      projectStore.$state.loading = false;
    }
  }

  _notifyOnError(err: IAxiosError) {
    const projectStore = useProjectStore();
    const t = i18n.global.t;

    projectStore.$state.hasError = true;
    const error = err as IAxiosError;
    notification.error({
      message: error.response?.status || t("titles.failure"),
      description: error.message
    });
  }

  _notifyOnSuccess(descriptionKey: string) {
    const projectStore = useProjectStore();
    const t = i18n.global.t;

    projectStore.$state.hasError = false;
    notification.success({
      message: t("titles.success"),
      description: t(descriptionKey)
    });
  }
}

export default new Api();

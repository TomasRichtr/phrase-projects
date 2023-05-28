import { ROUTES } from "@/enums";
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
    const projectStore = useProjectStore();

    try {
      const { data } = await axios.post("/api/projects", project);
      notification.success({
        message: "Success",
        description: "Project created successfully"
      });
      projectStore.$state.hasError = false;
      return data;
    } catch (err) {
      this._notifyOnError(err as Error);
    } finally {
      await router.replace({ name: ROUTES.PROJECTS_LIST.name });
      projectStore.$state.loading = false;
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
    } finally {
      projectStore.$state.loading = false;
    }
  }

  async updateProject(project: IProject) {
    const projectStore = useProjectStore();

    try {
      const { data } = await axios.put(`/api/projects/${project.id}`, project);
      notification.success({
        message: "Success",
        description: "Project updated successfully"
      });
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
      notification.success({
        message: "Success",
        description: "Project deleted successfully"
      });
      projectStore.$state.hasError = false;
    } catch (err) {
      this._notifyOnError(err as Error);
      projectStore.$state.loading = false;
    }
  }

  _notifyOnError(err: IAxiosError) {
    const projectStore = useProjectStore();

    projectStore.$state.hasError = true;
    const error = err as IAxiosError;
    notification.error({
      message: error.response?.status || "Error",
      description: error.message
    });
  }
}

export default new Api();

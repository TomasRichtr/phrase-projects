import { ROUTES } from "@/enums";
import router from "@/router";
import type { IProject } from "@/stores/projects";
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
   notification.success({
    message: "Success",
    description: "Project created successfully"
   });
   return data;
  } catch (err) {
   this._notifyOnError(err as Error);
  } finally {
   await router.push({ name: ROUTES.PROJECTS_LIST.name });
  }
 }

 async getProjects() {
  try {
   const { data } = await axios.get("/api/projects");
   return data._embedded.projects;
  } catch (err) {
   this._notifyOnError(err as Error);
  }
 }

 async updateProject(project: IProject) {
  try {
   const { data } = await axios.put(`/api/projects/${project.id}`, project);
   notification.success({
    message: "Success",
    description: "Project updated successfully"
   });
   return data;
  } catch (err) {
   this._notifyOnError(err as Error);
  } finally {
   await router.push({ name: ROUTES.PROJECTS_LIST.name });
  }
 }

 async deleteProject(id: number) {
  try {
   await axios.delete(`/api/projects/${id}`);
   notification.success({
    message: "Success",
    description: "Project deleted successfully"
   });
  } catch (err) {
   this._notifyOnError(err as Error);
  }
 }

 _notifyOnError(err: IAxiosError) {
  const error = err as IAxiosError;
  notification.error({
   message: error.response?.status || "Error",
   description: error.message
  });
 }
}

export default new Api();

import { STATUSES } from "@/enums";
import api from "@/helpers/api";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import languages from "language-list";
import { defineStore } from "pinia";

dayjs.extend(localizedFormat);

interface ProjectState {
 projects: IProject[];
 project: IProject;
 loading: boolean;
}

export interface IStatuses {
 NEW: "NEW";
 COMPLETED: "COMPLETED";
 DELIVERED: "DELIVERED";
}

export interface IProject {
 id: number | null;
 name: string;
 dateCreated: string;
 dateUpdated: string;
 dateDue: string;
 sourceLanguage: string;
 targetLanguages: string[];
 status: keyof IStatuses;
}

export const defaultProject: IProject = {
 id: null,
 name: "",
 dateDue: "",
 sourceLanguage: "",
 targetLanguages: [],
 status: STATUSES.NEW,
 dateUpdated: "",
 dateCreated: dayjs().format()
};

const resolveDate = (date: string) => {
 return date ? dayjs(date).format("ll") : "";
};

const useProjectStore = defineStore({
 id: "projects",
 state: () =>
  ({
   projects: [],
   project: defaultProject,
   loading: false
  } as ProjectState),

 getters: {
  projectList: (state) => {
   return state.projects.map((project) => {
    const getLanguage = (code: string) => languages().getLanguageName(code);
    const sourceLanguage = getLanguage(project.sourceLanguage);
    const targetLanguages = project.targetLanguages.map((code) => getLanguage(code));
    return {
     id: project.id,
     name: project.name,
     dateCreated: resolveDate(project.dateCreated),
     dateUpdated: resolveDate(project.dateUpdated),
     dateDue: resolveDate(project.dateDue),
     sourceLanguage,
     targetLanguages: targetLanguages.join(", "),
     status: project.status
    };
   });
  },

  mostProminentLanguage: (state) => {
   let mostFrequent = null;
   let frequency = 0;
   const count: { [key: string]: any } = {};

   state.projects.forEach((project) => {
    if (count[project.sourceLanguage]) {
     count[project.sourceLanguage] += 1;
    } else {
     count[project.sourceLanguage] = 1;
    }
    if (count[project.sourceLanguage] > frequency) {
     frequency = count[project.sourceLanguage];
     mostFrequent = project.sourceLanguage;
    }
   });

   return mostFrequent ? languages().getLanguageName(mostFrequent) : "";
  },

  projectsByStatuses: (state) => {
   return {
    completed: state.projects.filter((project) => project.status === "COMPLETED").length,
    delivered: state.projects.filter((project) => project.status === "DELIVERED").length,
    new: state.projects.filter((project) => project.status === "NEW").length
   };
  },

  overdueProjectCount: (state) => {
   return state.projects.filter((project) => dayjs(project.dateDue) < dayjs()).length;
  }
 },

 actions: {
  async fetchProjects() {
   this.loading = true;
   this.projects = await api.getProjects();
   this.loading = false;
  },

  async createProject(project: IProject) {
   this.loading = true;
   const newProject = {
    ...project,
    id: this.projects.length + 1,
    dateDue: dayjs(project.dateDue).format(),
    dateCreated: dayjs().format()
   };
   const responseData = await api.createProject(newProject);
   this.loading = false;
   return responseData;
  },

  async updateProject(project: IProject) {
   this.loading = true;
   const updatedProject = {
    ...project,
    dateUpdated: dayjs().format(),
    dateDue: dayjs(project.dateDue).format()
   };
   const responseData = await api.updateProject(updatedProject);
   this.loading = false;
   return responseData;
  },

  async deleteProject(id: number) {
   this.loading = true;
   await api.deleteProject(id);
   this.loading = false;
  }
 }
});

export default useProjectStore;

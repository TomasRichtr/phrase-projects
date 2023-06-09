export type ILocales = "cs" | "en";

export interface IProjectState {
  projects: IProject[];
  project: IProject;
  loading: boolean;
  hasError: boolean;
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
  sourceLanguage: string | null;
  targetLanguages: string[];
  status: keyof IStatuses;
}

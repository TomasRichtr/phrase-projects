import type { IStatuses } from "@/stores/projects";

export const STATUSES: IStatuses = {
 COMPLETED: "COMPLETED",
 NEW: "NEW",
 DELIVERED: "DELIVERED"
};

export const ROUTES = {
 PROJECTS_LIST: { name: "projects-list", path: "/" },
 PROJECTS_FORM: { name: "project-form", path: "project-form" },
 NOT_FOUND: { name: "404", path: ":catchAll(.*)*" }
};

export const LOCALES = {
 EN: "en",
 CS: "cs"
};

export const DEFAULT_LOCALE = "en";

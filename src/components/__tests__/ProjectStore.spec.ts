import useProjectStore, { type IProject, defaultProject } from "@/stores/projects";
import dayjs from "dayjs";
import { vi } from "vitest";

const projectList: IProject[] = [
 {
  id: 1,
  name: "Project 1",
  dateCreated: dayjs().format(),
  dateUpdated: dayjs().format(),
  dateDue: dayjs().add(1, "day").format(),
  sourceLanguage: "en",
  targetLanguages: ["fr", "es"],
  status: "NEW"
 },
 {
  id: 2,
  name: "Project 2",
  dateCreated: dayjs().subtract(1, "day").format(),
  dateUpdated: dayjs().subtract(1, "day").format(),
  dateDue: dayjs().subtract(1, "day").format(),
  sourceLanguage: "fr",
  targetLanguages: ["en"],
  status: "COMPLETED"
 }
];

describe("ProjectStore", () => {
 const store = useProjectStore();

 beforeEach(() => {
  vi.mock("@/helpers/api", () => {
   return {
    Api: vi.fn().mockImplementation(() => ({
     getProjects: () => ({ data: projectList })
    }))
   };
  });
 });

 describe("state", () => {
  it("should have an empty list of projects by default", () => {
   expect(store.projects).toEqual([]);
  });

  it("should have a default project", () => {
   expect(store.project).toEqual(defaultProject);
  });

  it("should have loading set to false by default", () => {
   expect(store.loading).toBe(false);
  });
 });

 describe("getters", () => {
  beforeEach(() => {
   store.projects = projectList;
  });

  it("should return a list of formatted projects", () => {
   const expectedProjectList = [
    {
     id: 1,
     name: "Project 1",
     dateCreated: dayjs().format("ll"),
     dateUpdated: dayjs().format("ll"),
     dateDue: dayjs().add(1, "day").format("ll"),
     sourceLanguage: "English",
     targetLanguages: "French, Spanish",
     status: "NEW"
    },
    {
     id: 2,
     name: "Project 2",
     dateCreated: dayjs().subtract(1, "day").format("ll"),
     dateUpdated: dayjs().subtract(1, "day").format("ll"),
     dateDue: dayjs().subtract(1, "day").format("ll"),
     sourceLanguage: "French",
     targetLanguages: "English",
     status: "COMPLETED"
    }
   ];

   expect(store.projectList).toEqual(expectedProjectList);
  });

  it("should return the most prominent language", () => {
   expect(store.mostProminentLanguage).toBe("English");
  });

  it("should return the count of projects by statuses", () => {
   const expectedStatuses: Record<"new" | "completed" | "delivered", number> = {
    new: 1,
    completed: 1,
    delivered: 0
   };

   expect(store.projectsByStatuses).toEqual(expectedStatuses);
  });

  it("should return the count of overdue projects", () => {
   expect(store.overdueProjectCount).toBe(1);
  });
 });
});

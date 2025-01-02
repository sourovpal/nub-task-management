import { useAppStore } from "./app";
import { useAuthStore } from "./auth";
import { useDepartmentStore } from "./department";
import { useKanbanStore } from "./kanban";
import { useProjectStore } from "./project";
import { useUserStore } from "./user";

export const authStore = useAuthStore();
export const departmentStore = useDepartmentStore();
export const appStore = useAppStore();
export const userStore = useUserStore();
export const projectStore = useProjectStore();
export const kanbanStore = useKanbanStore();

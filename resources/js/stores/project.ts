import html2canvas from "html2canvas";
import { dataURLToFile } from "@helpers";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";
import { AxiosResponse } from "axios";
import { dateTimeFormate } from "@helpers";

export const useProjectStore = defineStore("project", () => {
    const headers = ref([
        {
            unique_id: "checkbox",
            label: "",
            style: {
                width: "6rem",
                "max-width": "6rem",
            },
            item(row) {
                return "";
            },
        },
        {
            unique_id: "title",
            label: "Title",
            style: {
                width: "8rem",
            },
            item(row) {
                return row.title;
            },
            sorted: "title",
        },
        {
            unique_id: "name",
            label: "name",
            style: {
                width: "6rem",
            },
            item(row) {
                return row.name;
            },
            sorted: "name",
        },
        {
            unique_id: "contact",
            label: "Contact",
            style: {
                width: "8rem",
            },
            item(row) {
                return row.name;
            },
            sorted: "email",
        },
        {
            unique_id: "creator",
            label: "Creator",
            style: {
                width: "12rem",
                "max-width": "12rem",
            },
        },
        {
            unique_id: "start-date",
            label: "Start Date",
            style: {
                width: "10rem",
                "max-width": "10rem",
            },
            item(row) {
                return dateTimeFormate(row.start_date, "YYYY-MM-DD");
            },
        },
        {
            unique_id: "due-date",
            label: "Due Date",
            style: {
                width: "10rem",
                "max-width": "10rem",
            },
            item(row) {
                return dateTimeFormate(row.due_date, "YYYY-MM-DD");
            },
        },
        {
            unique_id: "action",
            label: "",
            style: {
                width: "6rem",
                "max-width": "6rem",
            },
            item(row) {
                return row.created_at;
            },
        },
    ]);

    const projectsData = ref({
        data: [],
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 10,
        to: 0,
        total: 0,
    });

    const currentProject = reactive({
        id: null,
        title: null,
    });

    const projectStages = ref([]);
    const targetTask = ref(null);
    const taskEvents = ref([]);

    function handleFetchProjects(payload = {}) {
        Http.project
            .all(payload)
            .then((response: AxiosResponse) => {
                projectsData.value = response;
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function handleFindProject() {
        Http.project
            .find({ id: currentProject.id })
            .then((response: AxiosResponse) => {
                Object.assign(currentProject, response);
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function handleFetchStage(payload = {}) {
        Http.project
            .statusAll({ id: currentProject.id, ...payload })
            .then((response: AxiosResponse) => {
                projectStages.value = response;
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function handleUpdateTaskPosition(payload = {}) {
        Http.project
            .taskPositionUpdate(payload)
            .then((response: AxiosResponse) => {
                handleFetchStage();
            })
            .catch((error) => {})
            .finally(() => {});
    }

    function handleFetchEvents() {
        Http.project
            .getEvents({})
            .then((response: AxiosResponse) => {
                taskEvents.value = response;
            })
            .catch((error) => {})
            .finally(() => {});
    }

    return {
        headers,
        projectsData,
        projectStages,
        targetTask,
        currentProject,
        handleFindProject,
        handleFetchStage,
        handleFetchProjects,
        handleUpdateTaskPosition,
        handleFetchEvents,
        taskEvents,
    };
});

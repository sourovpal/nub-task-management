import html2canvas from "html2canvas";
import { dataURLToFile } from "@helpers";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";

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
            unique_id: "start-date",
            label: "Start Date",
            style: {
                width: "10rem",
                "max-width": "10rem",
            },
            item(row) {
                return row.start_date;
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
                return row.due_date;
            },
        },
        {
            unique_id: "assignee",
            label: "Assignee",
            style: {
                width: "20rem",
                "max-width": "20rem",
            },
        },
        {
            unique_id: "created-date",
            label: "Created Date",
            style: {
                width: "10rem",
                "max-width": "10rem",
            },
            item(row) {
                return row.created_at;
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

    return {
        headers,
    };
});

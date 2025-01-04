import html2canvas from "html2canvas";
import { dataURLToFile } from "@helpers";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { AxiosResponse } from "axios";

export const useKanbanStore = defineStore("kanban", () => {
    const is_fatching = ref<Boolean>(false);
    const statuses = ref([]);
    const fetchTasks = () => {};

    function handleFetchStatus(project_id: Number) {
        is_fatching.value = true;
        Http.kanban
            .allStatus({ project_id })
            .then((res: AxiosResponse) => {
                statuses.value = res.data;
            })
            .catch(() => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    function handleDragStart(event: DragEvent) {}

    function handleDragStop(event: DragEvent) {}

    function handleDragOver(event) {
        event.preventDefault();

        const zone = event.target.closest(".task-list");
        if (!zone) return;

        const bottomTask = insertAboveTask(zone, event.clientY);
        const curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    }

    const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.is-dragging)");

        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
        els.forEach((task) => {
            const { top } = task.getBoundingClientRect();

            const offset = mouseY - top;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });

        return closestTask;
    };

    return {
        is_fatching,
        statuses,
        handleFetchStatus,
        handleDragStart,
        handleDragStop,
        handleDragOver,
    };
});

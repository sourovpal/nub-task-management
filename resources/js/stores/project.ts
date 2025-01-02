import html2canvas from "html2canvas";
import { dataURLToFile } from "@helpers";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import Http from "@services";
import { Pagination } from "@types";
import router, { usePush } from "@routers";

export const useProjectStore = defineStore("project", () => {
    const is_fatching = ref<Boolean>(false);

    const projects = ref([]);
    const page = ref<Number>(1);
    const screenshot = ref<Object | null>(null);

    function handleFetchProject(payload: { type?: String } = {}) {
        is_fatching.value = true;

        if (!payload["type"]) payload["type"] = "recent";

        Http.project
            .all(payload)
            .then((res: { data: object }) => {
                const { projects: _projects, pagination } = res.data;
                projects.value = _projects;
            })
            .catch((error: Error) => {})
            .finally(() => {
                is_fatching.value = false;
            });
    }

    const captureScreenshot = async () => {
        console.log(screenshot.value);

        const captureArea = document.getElementById("captureArea");

        if (!captureArea) return;

        const canvas = await html2canvas(captureArea);

        screenshot.value = await dataURLToFile(
            canvas.toDataURL("image/png"),
            "project.png"
        );
    };

    function uploadScreenshort(id: Number) {
        if (!screenshot.value) return;

        const form_data = new FormData();

        form_data.append("screenshot", screenshot.value);

        Http.project
            .screenshot(
                form_data,
                { id },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res: { data: object }) => {})
            .catch((error: Error) => {})
            .finally(() => {});
    }

    return {
        is_fatching,
        projects,
        handleFetchProject,
        captureScreenshot,
        uploadScreenshort,
    };
});

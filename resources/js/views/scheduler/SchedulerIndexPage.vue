<script setup>
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { onMounted, ref, watch, computed } from "vue";
import ToolsBar from "./sections/ToolsBar.vue";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";

const calendar = ref();

const { taskEvents } = storeToRefs(projectStore);

onMounted(() => {
    projectStore.handleFetchEvents();
    const instance = computed(
        () =>
            new Calendar(calendar.value, {
                plugins: [
                    interactionPlugin,
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                ],
                initialView: "dayGridMonth",
                editable: true,
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // Switch between Month and Week views
                },
                buttonText: {
                    today: "Today",
                    month: "Monthly",
                    week: "Weekly",
                    day: "Day",
                    list: "List",
                },
                events: taskEvents.value,
                eventClick: function (info) {
                    console.log(info.event.id);
                },
            })
    );

    instance.value.render();

    watch(taskEvents, () => {
        instance.value.render();
    });

    instance.value.on("dateClick", function (info) {
        console.log("clicked on " + info.dateStr);
    });
    //   instance.on("eventClick", function (info) {
    //     console.log("clicked on ", info);
    //   });
});
</script>

<template>
    <tools-bar />
    <section-scroll-bar>
        <section class="px-5 pt-5 pb-5 w-full bg-gray-200">
            <div ref="calendar" class="bg-white rounded-md px-5 py-5"></div>
        </section>
    </section-scroll-bar>
</template>

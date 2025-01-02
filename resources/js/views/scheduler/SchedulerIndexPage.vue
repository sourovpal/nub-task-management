<script setup>
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { onMounted, ref } from "vue";
import ToolsBar from "./sections/ToolsBar.vue";

const calendar = ref();

onMounted(() => {
  const instance = new Calendar(calendar.value, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
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
    events: [
      {
        id: 100,
        title: "Strategy Meeting",
        start: new Date(2024, 11, 13, 14, 0),
        end: new Date(2024, 11, 13, 16, 0),
      },
      {
        id: 100,
        title: "Team Sync",
        start: new Date(2024, 11, 24, 11, 0),
        end: new Date(2024, 11, 24, 13, 0),
      },
      {
        id: 100,
        title: "Innovation Workshop",
        start: new Date(2024, 11, 9, 17, 0),
        end: new Date(2024, 11, 9, 20, 0),
      },
      {
        id: 100,
        title: "Project Kickoff",
        start: new Date(2024, 11, 2, 15, 0),
        end: new Date(2024, 11, 2, 17, 0),
      },
      {
        id: 100,
        title: "Stakeholder Meeting",
        start: new Date(2024, 11, 18, 17, 0),
        end: new Date(2024, 11, 18, 19, 0),
      },
      {
        id: 100,
        title: "Performance Review",
        start: new Date(2024, 11, 14, 17, 0),
        end: new Date(2024, 11, 14, 18, 0),
      },
      {
        id: 100,
        title: "Onboarding Session",
        start: new Date(2024, 11, 27, 16, 0),
        end: new Date(2024, 11, 27, 19, 0),
      },
      {
        id: 100,
        title: "All-Hands Meeting",
        start: new Date(2024, 11, 14, 8, 0),
        end: new Date(2024, 11, 14, 10, 0),
      },
      {
        id: 100,
        title: "Code Review",
        start: new Date(2024, 11, 24, 12, 0),
        end: new Date(2024, 11, 24, 13, 0),
      },
      {
        id: 100,
        title: "Product Demo",
        start: new Date(2024, 11, 22, 13, 0),
        end: new Date(2024, 11, 22, 15, 0),
      },
      {
        id: 100,
        title: "Marketing Briefing",
        start: new Date(2024, 11, 23, 15, 0),
        end: new Date(2024, 11, 23, 17, 0),
      },
      {
        id: 100,
        title: "Town Hall",
        start: new Date(2024, 11, 14, 15, 0),
        end: new Date(2024, 11, 14, 16, 0),
      },
      {
        id: 100,
        title: "Retrospective",
        start: new Date(2024, 11, 10, 11, 0),
        end: new Date(2024, 11, 10, 12, 0),
      },
      {
        id: 100,
        title: "Budget Planning",
        start: new Date(2024, 11, 2, 10, 0),
        end: new Date(2024, 11, 3, 13, 0),
      },
      {
        id: 100,
        title: "Design Review",
        start: new Date(2024, 11, 14, 13, 0),
        end: new Date(2024, 11, 14, 16, 0),
      },
      {
        id: 100,
        title: "Sprint Planning",
        start: new Date(2024, 11, 31, 8, 0),
        end: new Date(2024, 11, 31, 11, 0),
      },
      {
        id: 100,
        title: "Client Call",
        start: new Date(2024, 11, 4, 16, 0),
        end: new Date(2024, 11, 4, 19, 0),
      },
      {
        id: 100,
        title: "Training Session",
        start: new Date(2024, 11, 29, 9, 0),
        end: new Date(2024, 11, 29, 11, 0),
      },
      {
        id: 100,
        title: "One-on-One",
        start: new Date(2024, 11, 6, 15, 0),
        end: new Date(2024, 11, 6, 17, 0),
      },
      {
        id: 100,
        title: "QA Session",
        start: new Date(2024, 11, 15, 17, 0),
        end: new Date(2024, 11, 15, 18, 0),
      },
    ],
    eventClick: function (info) {
      console.log(info.event.id);
    },
  });

  instance.render();

  instance.on("dateClick", function (info) {
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
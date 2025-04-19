<script setup>
import TaskCard from "./TaskCard.vue";
import AddNewTaskModal from "../modals/AddNewTaskModal.vue";
import Http from "@services";
import { nextTick, onMounted, ref } from "vue";
import { Container, Draggable } from "vue-dndrop";
import BoardHeader from "./BoardHeader.vue";
import { projectStore } from "@stores";
import { storeToRefs } from "pinia";
const { projectStages, targetTask } = storeToRefs(projectStore);

const props = defineProps({
  stage: Object,
});

const is_open = ref(false);

const upperDropPlaceholderOptions = ref({
  className: "cards-drop-preview",
  animationDuration: "150",
  showOnTop: true,
});

const dropPlaceholderOptions = ref({
  className:
    "drop-preview border-2 border-gray-300 rounded-md mb-3 border-dashed",
  animationDuration: "150",
  showOnTop: true,
});

function getDataSet(event) {
  return event.element.dataset;
}

function handleUpdatePosition(payload, action = "swap") {
  payload = {
    ...payload,
    action,
    status_id: props.stage.id,
  };
  projectStore.handleUpdateTaskPosition(payload);
}

async function handleDrop(stage, event) {
  const { removedIndex, addedIndex, payload } = event;

  if ((removedIndex == null && addedIndex == null) || !payload) return;

  const targetStage = projectStages.value.find((item) => item.id == stage.id);

  if (removedIndex != null && addedIndex != null) {
    targetStage["group_tasks"].splice(removedIndex, 1);
    targetStage["group_tasks"].splice(addedIndex, 0, { ...payload });
    handleUpdatePosition({
      position: addedIndex + 1,
      old_position: removedIndex + 1,
      task_id: payload.id,
    });
  } else if (removedIndex != null) {
    targetStage["group_tasks"].splice(removedIndex, 1);
  } else if (addedIndex != null) {
    targetStage["group_tasks"].splice(addedIndex, 0, { ...payload });
    handleUpdatePosition(
      {
        position: addedIndex + 1,
        task_id: payload.id,
      },
      "move"
    );
  }
}

function getChildPayload(index, stage) {
  const targetStage = projectStages.value.find((item) => item.id == stage.id);
  return { ...targetStage["group_tasks"][index] };
}
</script>
<template>
  <AddNewTaskModal v-if="is_open" v-model:visible="is_open" :stage="stage" />
  <div class="min-w-[16rem] mt-6">
    <BoardHeader :stage="stage"></BoardHeader>
    <custom-scroll style="height: 83vh">
      <div class="px-2.5">
        <Container
          group-name="task"
          :drop-placeholder="dropPlaceholderOptions"
          @drop="handleDrop(stage, $event)"
          :getChildPayload="(e) => getChildPayload(e, stage)"
          class="pb-28"
        >
          <Draggable
            @drag="() => console.log('click', $event)"
            v-for="(task, index) in stage['group_tasks']"
            :key="index"
          >
            <TaskCard :task="task" :stage="stage" />
          </Draggable>
        </Container>
      </div>
    </custom-scroll>
  </div>
</template>
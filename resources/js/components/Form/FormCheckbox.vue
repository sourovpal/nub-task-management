<script setup>
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  reset: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <circel-button>
    <slot>
      <svg
        v-if="!checked && !reset"
        class="unchecked"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
        />
      </svg>

      <svg
        v-else-if="checked"
        class="checked"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        ></path>
      </svg>

      <svg
        v-else-if="reset"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <defs>
          <path id="a" d="M0 0h24v24H0z"></path>
        </defs>
        <clipPath id="b">
          <use xlink:href="#a" overflow="visible"></use>
        </clipPath>
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
          clip-path="url(#b)"
        ></path>
      </svg>
    </slot>
  </circel-button>
</template>
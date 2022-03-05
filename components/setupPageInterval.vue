<template>
  <div
    class="
      w-full
      p-4
      rounded-xl
      bg-white
      border border-solid
      grid grid-cols-4
      shadow-md
    "
  >
    <div class="entry text-work">
      <span>Training</span>
      <time-text :data="interval.workTime" />
    </div>

    <div class="entry text-rest">
      <span>Pause</span>
      <time-text :data="interval.restTime" />
    </div>

    <div class="entry">
      <span class="sm:block hidden">Wiederholungen</span>
      <span>{{ interval.repetitions }} <span class="sm:hidden">x</span></span>
    </div>

    <!-- buttons -->
    <div class="my-auto grid gap-3 sm:gap-5 grid-flow-col ml-auto">
      <!-- edit button -->
      <button
        class="circle-btn interval-btn edit"
        @click="$emit('edit-interval')"
      >
        <font-awesome-icon icon="pen" />
      </button>

      <!-- delete button -->
      <button
        class="circle-btn interval-btn delete"
        @click="$emit('delete-interval')"
      >
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </div>
</template>


<script>
import timeText from "./timeText.vue";

export default {
  components: { timeText },

  props: {
    interval: {
      type: Object,
      required: true,
    },
  },

  emits: ["edit-interval", "delete-interval"],
};
</script>


<style lang="postcss" scoped>
.entry {
  @apply grid text-center font-semibold items-center sm:text-base text-sm;
}
.entry > *:nth-child(2) {
  @apply text-lg sm:text-xl;
}

button.interval-btn {
  @apply w-8 h-8 sm:w-10 sm:h-10 border-2 shadow-md bg-white text-sm sm:text-base;
}
button.interval-btn.edit {
  @apply text-yellow-500 hover:text-yellow-300 border-yellow-500 hover:border-yellow-300;
}
button.interval-btn.delete {
  @apply text-red-500 hover:text-red-300 border-red-500 hover:border-red-300;
}
</style>
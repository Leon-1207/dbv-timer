<template>
  <div class="grid gap-2">
    <div class="timeline-element start">
      <span>START</span>
    </div>

    <div
      v-for="(interval, index) in processedIntervals"
      :key="index"
      :interval="interval"
      class="timeline-element"
      :class="[interval.class, { done: index < currentIntervalIndex }]"
    >
      <div class="flex justify-between text-xl">
        <div class="grid gap-5 grid-flow-col items-center">
          <span class="font-semibold absolute">{{ interval.kindText }}</span>
          <span class="font-semibold opacity-0">TRAINING</span>
          <time-text
            class="interval-duration"
            :data="interval.durationAsTimeObject"
          />
        </div>
        <span v-if="index === currentIntervalIndex" class="animate-pulse"
          >JETZT</span
        >
        <font-awesome-icon
          v-show="index < currentIntervalIndex"
          class="text-xl"
          icon="check"
        />
      </div>

      <!-- progress -->
      <div></div>

      <!-- progress bar -->
      <div v-if="index === currentIntervalIndex">
        {{ currentIntervalProgress }}
      </div>
    </div>

    <div class="timeline-element end">
      <span>ENDE</span>
    </div>
  </div>
</template>


<script>
import timeText from "./timeText.vue";
import { convertSecondsToTimeObject } from "~/static/intervals";

export default {
  components: { timeText },
  props: {
    intervals: {
      type: Array,
      default: () => {
        return [];
      },
      required: true,
    },
    currentIntervalIndex: {
      type: Number,
      default: null,
      required: true,
    },
    currentIntervalTimeLeftAsTimeObject: {
      type: Object,
      default: null,
      required: true,
    },
    currentIntervalTimeLeftInSeconds: {
      type: Number,
      default: null,
      required: true,
    },
    currentIntervalProgress: {
      type: Number,
      default: null,
      required: true,
    },
  },

  computed: {
    processedIntervals() {
      return this.intervals.map((interval) => {
        const result = { ...interval };

        result.kindText = interval.kind === "w" ? "TRAINING" : "PAUSE"; // add kind text
        result.durationAsTimeObject = convertSecondsToTimeObject(
          interval.duration || 0
        ); // add duration as time object
        result.class = interval.kind === "w" ? "work" : "rest"; // add class

        return result;
      });
    },
    currentIntervalRunningTimeInSeconds() {
      if (
        this.currentIntervalTimeLeftInSeconds === null ||
        this.currentIntervalIndex ||
        this.currentIntervalIndex >= this.intervals.length
      )
        return 0;

      const currenInterval = this.intervals[this.currentIntervalIndex];
      const currentIntervalDuration = currenInterval?.duration;
      if (!currentIntervalDuration) return 0;

      return Math.max(
        0,
        currentIntervalDuration - (this.currentIntervalTimeLeftInSeconds || 0)
      );
    },
  },
};
</script>


<style lang="postcss" scoped>
.timeline-element {
  @apply py-4 px-4 shadow-md rounded-md bg-gradient-to-br from-white to-gray-100;
}

.timeline-element.work,
.timeline-element.rest {
  @apply border-l-4 border-solid rounded-none;
}
.timeline-element.work {
  @apply border-work;
}
.timeline-element.rest {
  @apply border-rest;
}

.timeline-element.work .interval-duration {
  @apply text-work;
}

.timeline-element.rest .interval-duration {
  @apply text-rest;
}

.timeline-element.start,
.timeline-element.end {
  @apply bg-gradient-to-tl from-theme to-theme-gradient border-none text-3xl text-center text-white font-semibold py-4;
}

.timeline-element.start {
  @apply rounded-b-none;
}

.timeline-element.end {
  @apply rounded-t-none;
}

.timeline-element.done {
  @apply opacity-60;
}
</style>
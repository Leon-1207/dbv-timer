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
        <span
          v-if="index === currentIntervalIndex && !trainingCompleted"
          class="animate-pulse"
          >JETZT</span
        >
        <font-awesome-icon
          v-show="index < currentIntervalIndex || trainingCompleted"
          class="text-xl"
          icon="check"
        />
      </div>

      <!-- progress bar -->
      <div v-if="index === currentIntervalIndex" class="mt-5">
        <div class="flex justify-between">
          <time-text :data="currentIntervalRunningAsTimeObject" />
          <time-text :data="currentIntervalTimeLeftAsTimeObject" />
        </div>
        <progress-bar :progress="currentIntervalProgress" />
      </div>
    </div>

    <div class="timeline-element end">
      <span>ENDE</span>
    </div>
  </div>
</template>


<script>
import timeText from "./timeText.vue";
import ProgressBar from "./progressBar.vue";
import { convertSecondsToTimeObject } from "~/static/intervals";

export default {
  components: { timeText, ProgressBar },
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
    trainingCompleted: {
      type: Boolean,
      default: false,
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
        this.currentIntervalIndex === null ||
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
    currentIntervalRunningAsTimeObject() {
      const seconds =
        this.currentIntervalRunningTimeInSeconds === null
          ? 0
          : this.currentIntervalRunningTimeInSeconds;
      return convertSecondsToTimeObject(seconds);
    },
  },
};
</script>


<style lang="postcss" scoped>
.timeline-element {
  @apply py-4 px-4 shadow-md rounded-md bg-gradient-to-br from-white to-gray-100;
}

.timeline-element > * {
  @apply mx-auto w-11/12;
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
  @apply from-gray-500 to-gray-700 border-none text-3xl text-center text-white font-semibold py-4;
}

.timeline-element.start {
  @apply rounded-b-none bg-gradient-to-br;
}

.timeline-element.end {
  @apply rounded-t-none bg-gradient-to-tl;
}

.timeline-element.done {
  @apply opacity-60;
}
</style>
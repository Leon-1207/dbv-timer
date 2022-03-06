<template>
  <div class="grid">
    <span class="mr-2">Gesamtdauer</span>
    <time-text class="font-semibold" :data="timeObject" />
  </div>
</template>


<script>
import {
  convertSecondsToTimeObject,
  getTotalTimeOfInterval,
} from "~/static/intervals";
import timeText from "~/components/timeText.vue";

export default {
  components: { timeText },
  props: {
    intervals: {
      type: Array,
      required: true,
    },
  },

  computed: {
    totalSeconds() {
      let result = 0;
      this.intervals.forEach((interval) => {
        const intervalSeconds = getTotalTimeOfInterval(interval);
        result += intervalSeconds;
      });
      return result;
    },
    timeObject() {
      return convertSecondsToTimeObject(this.totalSeconds);
    },
  },
};
</script>
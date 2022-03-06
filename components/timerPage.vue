<template>
  <div
    class="h-screen max-h-screen overflow-y-auto relative"
    :class="computedTimerLightBgClass"
  >
    <div class="content-wrapper">
      <!-- screen height wrapper in order to hide progress -->
      <div class="min-h-screen pb-20">
        <!-- box with timer and control buttons -->
        <div class="timer-wrapper-box">
          {{ currentTimeInSeconds }}

          <!-- control buttons -->
          <div
            class="
              flex flex-nowrap
              justify-around
              items-center
              max-w-xs
              mx-auto
            "
          >
            <!-- stop button -->
            <button
              class="circle-btn control-btn"
              @click="
                pauseTimer();
                showExitTrainingDialog = true;
              "
            >
              <font-awesome-icon icon="stop" />
            </button>

            <!-- pause / resume button -->
            <button
              v-if="playing"
              class="circle-btn control-btn-lg"
              @click="pauseTimer"
            >
              <font-awesome-icon icon="pause" />
            </button>
            <button
              v-else
              class="circle-btn control-btn-lg"
              @click="resumeTimer"
            >
              <font-awesome-icon icon="play" />
            </button>

            <!-- skip button -->
            <button class="circle-btn control-btn" @click="skipTimerStep">
              <font-awesome-icon icon="forward-step" />
            </button>
          </div>
        </div>

        <!-- sticky timer box -->
        <div
          class="timer-wrapper-box sticky top-2 sm:top-4"
          :class="computedTimerBgClass"
        >
          TODO
        </div>
      </div>

      <!-- box with timeline -->
      <div class="timer-wrapper-box h-96">{{ intervals }}</div>
    </div>

    <!-- dialog window -->
    <transition name="fade">
      <dialog-window v-if="showExitTrainingDialog">
        <template v-if="showExitTrainingDialog" #body>
          <h6 class="dialog-title">Training beenden</h6>
          <p>Möchtest du das Training wirklich beenden?</p>
        </template>

        <template v-if="showExitTrainingDialog" #bottom>
          <button class="text-red-500 hover:text-red-300" @click="exitTimer">
            Training beenden
          </button>
          <button
            class="text-blue-500 hover:text-blue-300"
            @click="
              resumeTimer();
              showExitTrainingDialog = false;
            "
          >
            Training fortsetzen
          </button>
        </template>
      </dialog-window>
    </transition>
  </div>
</template>


<script>
import { convertIntervalTimeToSeconds, shuffle } from "~/static/intervals";
export default {
  emits: ["exit-timer"],

  data() {
    return {
      playing: false,
      currentTimeInSeconds: 0,
      showExitTrainingDialog: false,
      isWorkInterval: false,
      intervals: [], // in form of [{kind: 'w', duration: 120}, {kind: 'r', duration: 15}]
      updateTickInterval: null,
    };
  },

  computed: {
    currentIntervalIndex() {
      if (Array.isArray(this.intervals) && this.intervals.length > 0) {
        let index = 0;
        while (
          index < this.intervals.length &&
          this.intervals[index].startTime < this.currentTimeInSeconds
        ) {
          index += 1;
        }
        return Math.max(0, index - 1);
      }
      return null;
    },
    currentIntervalObject() {
      const index = this.currentIntervalIndex;
      if (this.intervals.length > index) return this.intervals[index];
      return null;
    },
    currentIntervalKindVale() {
      const interval = this.currentIntervalObject;
      if (interval) return interval.kind;
      return null;
    },
    computedTimerBgClass() {
      switch (this.currentIntervalKindVale) {
        case "w":
          return "bg-gradient-to-br from-work to-work-gradient";
        case "r":
          return "bg-gradient-to-br from-rest to-rest-gradient";
        default:
          return "";
      }
    },
    computedTimerLightBgClass() {
      switch (this.currentIntervalKindVale) {
        case "w":
          return "bg-work-very-light";
        case "r":
          return "bg-rest-very-light";
        default:
          return "";
      }
    },
  },

  methods: {
    updateTick() {
      if (!this.playing) return null; // is paused --> do not update
      this.currentTimeInSeconds += 1;
    },
    startTraining(intervals) {
      if (Array.isArray(intervals)) {
        const newIntervals = [];

        // remove repetitions
        const intervalsWithoutRepetitions = [];
        intervals.forEach(({ workTime, restTime, repetitions }) => {
          const newIntervalObject = { repetitions: 1, workTime, restTime };
          for (let index = 0; index < repetitions; index++) {
            intervalsWithoutRepetitions.push(newIntervalObject);
          }
        });

        // shuffle input intervals
        const intervalsInRandomOrder = shuffle(intervalsWithoutRepetitions);

        // process interval data
        let time = 0;
        intervalsInRandomOrder.forEach(({ restTime, workTime }) => {
          const restTimeInSeconds = convertIntervalTimeToSeconds(restTime);
          const workTimeInSeconds = convertIntervalTimeToSeconds(workTime);

          if (workTimeInSeconds > 0)
            newIntervals.push({
              kind: "w",
              duration: workTimeInSeconds,
              startTime: time,
            });
          time += workTimeInSeconds;
          if (restTimeInSeconds > 0)
            newIntervals.push({
              kind: "r",
              duration: restTimeInSeconds,
              startTime: time,
            });
          time += restTimeInSeconds;
        });
        this.intervals = newIntervals;

        // start
        this.resetAndStartTimer();
      }
    },
    resetAndStartTimer() {
      if (this.updateTickInterval) clearInterval(this.updateTickInterval);
      this.currentTimeInSeconds = 0;
      this.playing = true;
      setTimeout(() => {
        this.updateTickInterval = setInterval(this.updateTick, 1000);
      }, 1000);
    },
    exitTimer() {
      this.pauseTimer();
      this.$emit("exit-timer");
    },
    pauseTimer() {
      this.playing = false;
    },
    resumeTimer() {
      this.playing = true;
    },
    skipTimerStep() {
      if (this.currentIntervalIndex === null) return null;
      const nextIntervalIndex = this.currentIntervalIndex + 1;
      if (this.intervals.length > nextIntervalIndex) {
        const nextInterval = this.intervals[nextIntervalIndex];
        this.currentTimeInSeconds = nextInterval.startTime;
      }
    },
  },
};
</script>


<style lang="postcss" scoped>
.control-btn *,
.control-btn-lg * {
  @apply text-main-text-color transform duration-75;
}
.control-btn {
  @apply w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl shadow-md hover:scale-105 hover:shadow-lg;
}
.control-btn-lg {
  @apply w-16 h-16 md:w-24 md:h-24 text-2xl md:text-4xl shadow-lg hover:scale-105 hover:shadow-xl;
}

.timer-wrapper-box {
  @apply bg-main-background rounded-xl py-8 px-4 my-10 mx-5;
}
</style>
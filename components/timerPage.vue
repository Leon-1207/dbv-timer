<template>
  <div
    class="h-screen max-h-screen overflow-y-auto"
    :class="computedTimerBgClass"
  >
    <div class="content-wrapper">
      <!-- screen height wrapper in order to hide progress -->
      <div class="min-h-screen pb-20">
        <!-- box with timer and control buttons -->
        <div class="timer-wrapper-box">
          progress

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
      </div>

      <!-- box with timeline -->
      <div class="timer-wrapper-box">TODO</div>
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
export default {
  emits: ["exit-timer"],

  data() {
    return {
      playing: false,
      currentTimeInSeconds: 0,
      showExitTrainingDialog: false,
      isWorkInterval: false,
      intervals: [], // in form of [{kind: 'w', duration: 120}, {kind: 'r', duration: 15}]
    };
  },

  computed: {
    currentIntervalIndex() {
      // TODO
      return 0;
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
  },

  methods: {
    updateTick() {
      // update value of is work interval
    },
    startTraining(intervals) {
      // TODO
      this.currentTimeInSeconds = 0;
      this.playing = true;
    },
    exitTimer() {
      this.playing = false;
      this.$emit("exit-timer");
    },
    pauseTimer() {
      this.playing = false;
    },
    resumeTimer() {
      this.playing = true;
    },
    skipTimerStep() {
      // TODO
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
  @apply bg-main-background rounded-xl py-2 px-4 my-10;
}
</style>
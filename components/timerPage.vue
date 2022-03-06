<template>
  <div>
    timer

    <!-- control buttons -->
    <div>
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
      <button v-else class="circle-btn control-btn-lg" @click="resumeTimer">
        <font-awesome-icon icon="play" />
      </button>

      <!-- skip button -->
      <button class="circle-btn control-btn" @click="skipTimerStep">
        <font-awesome-icon icon="forward-step" />
      </button>
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
    };
  },

  methods: {
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
  @apply w-12 h-12 text-xl shadow-md hover:scale-105 hover:shadow-lg;
}
.control-btn-lg {
  @apply w-16 h-16 text-2xl shadow-lg hover:scale-105 hover:shadow-xl;
}
</style>
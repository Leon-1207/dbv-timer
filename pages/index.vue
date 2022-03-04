<template>
  <div
    id="timer-app"
    class="w-screen h-screen overflow-y-auto bg-main-background"
  >
    <setup-page
      v-show="setupMode"
      @add-interval="openAddIntervalDialog"
      @start-training="startTraining"
    />

    <timer-page v-show="!setupMode" ref="timerPage" />

    <!-- add interval -->
    <transition name="fade">
      <div v-if="showAddIntervalDialog" class="contents">
        <dialog-window>
          <template #body>
            <h6 class="dialog-title">Intervall hinzufügen</h6>
            <div>
              <!-- TODO add inputs here -->
            </div>
            {{ newInterval }}
          </template>
          <template #bottom>
            <button
              class="text-red-500 hover:text-red-400"
              @click="showAddIntervalDialog = false"
            >
              Abbrechen
            </button>
            <button
              class="text-blue-500"
              :class="{ disabled: !isNewIntervalInputValid }"
              @click="clickedOnAddIntervalInDialog"
            >
              Hinzufügen
            </button>
          </template>
        </dialog-window>
      </div>
    </transition>
  </div>
</template>

<script>
import DialogWindow from "~/components/dialogWindow.vue";
import setupPage from "~/components/setupPage.vue";
import TimerPage from "~/components/timerPage.vue";
export default {
  name: "IndexPage",

  components: { setupPage, TimerPage, DialogWindow },

  data() {
    return {
      setupMode: true,
      showAddIntervalDialog: false,
      newInterval: null,
      intervals: {},
    };
  },

  computed: {
    isNewIntervalInputValid() {
      return true;
    },
  },

  methods: {
    openAddIntervalDialog() {
      this.newInterval = {
        workTime: 0,
        restTime: 0,
        repetitions: 1,
      };
      this.showAddIntervalDialog = true;
    },
    clickedOnAddIntervalInDialog() {
      if (!this.isNewIntervalInputValid) this.addNewIntervalAndCloseDialog();
      // else do nothing
    },
    addNewIntervalAndCloseDialog() {
      // add interval
      //
      //
    },
    addInterval(inputInterval) {
      if (typeof inputInterval !== "object") return null;

      // get key for new interval
      let keyNum = 0;
      while (String(keyNum) in this.intervals) {
        keyNum += 1;
      }
      const key = String(keyNum);

      // add data
      this.intervals[key] = inputInterval;
    },
    startTraining() {
      this.setupMode = false;
      const timerPageRef = this.$refs.timerPage;
      timerPageRef.startTraining();
    },
  },
};
</script>


<style lang="postcss">
.circle-btn {
  @apply border border-solid bg-white rounded-full w-8 h-8;
}

#timer-app {
  --main-text-color: #424242;
}

#timer-app {
  color: var(--main-text-color);
}

#timer-app button {
  outline: none;
}

#timer-app button.disabled {
  @apply bg-opacity-20 cursor-not-allowed text-gray-200;
}
</style>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
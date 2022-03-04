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
            <div class="grid gap-4">
              <div>
                <p>WIEDERHOLUNGEN</p>
                <!-- TODO add minus button -->
                <input
                  v-model="newInterval.repetitions"
                  class="time-input"
                  type="number"
                  min="0"
                  max="999"
                />
                <!-- TODO add plus button -->
              </div>

              <div>
                <p>TRAINING</p>
                <div class="flex justify-center">
                  <!-- TODO add minus button -->
                  <div class="time-input-wrapper">
                    <input
                      v-model="newInterval.workTime.minutes"
                      type="number"
                      min="0"
                      max="99"
                    />
                    <span>
                      {{ addZeroPaddingToNumber(newInterval.workTime.minutes) }}
                    </span>
                  </div>
                  <span class="font-bold">:</span>
                  <div class="time-input-wrapper">
                    <input
                      v-model="newInterval.workTime.seconds"
                      type="number"
                      min="0"
                      max="60"
                      @input="updateTime(newInterval.workTime)"
                    />
                    <span>
                      {{ addZeroPaddingToNumber(newInterval.workTime.seconds) }}
                    </span>
                  </div>
                  <!-- TODO add plus button -->
                </div>
              </div>

              <div>
                <p>PAUSE</p>
                <div class="flex justify-center">
                  <!-- TODO add minus button -->
                  <div class="time-input-wrapper">
                    <input
                      v-model="newInterval.restTime.minutes"
                      type="number"
                      min="0"
                      max="99"
                    />
                    <span>
                      {{ addZeroPaddingToNumber(newInterval.restTime.minutes) }}
                    </span>
                  </div>
                  <span class="font-bold">:</span>
                  <div class="time-input-wrapper">
                    <input
                      v-model="newInterval.restTime.seconds"
                      type="number"
                      min="0"
                      max="60"
                      @input="updateTime(newInterval.restTime)"
                    />
                    <span>
                      {{ addZeroPaddingToNumber(newInterval.restTime.seconds) }}
                    </span>
                  </div>
                  <!-- TODO add plus button -->
                </div>
              </div>
            </div>

            <div class="mt-5">{{ newInterval }}</div>
          </template>
          <template #bottom>
            <button
              class="text-red-500 hover:text-red-300"
              @click="showAddIntervalDialog = false"
            >
              Abbrechen
            </button>
            <button
              class="text-blue-500"
              :class="
                isNewIntervalInputValid ? 'hover:text-blue-300' : 'disabled'
              "
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
        workTime: { minutes: 0, seconds: 0 },
        restTime: { minutes: 0, seconds: 0 },
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
      // TODO

      // close dialog
      this.showAddIntervalDialog = false;
    },
    addZeroPaddingToNumber(inputNumber) {
      let str = String(inputNumber || 0) || "0";
      while (str.length < 2) {
        str = "0" + str;
      }
      return str;
    },
    updateTime(inputTime) {
      const seconds = inputTime?.seconds || 0;
      if (Number(seconds) >= 60) {
        const minutes =
          typeof inputTime?.minutes === "number" ? inputTime?.minutes : 0;
        inputTime.minutes = Math.min(99, minutes + Math.floor(seconds / 60));
        inputTime.seconds = seconds % 60;
      }
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

.time-input-wrapper {
  @apply relative;
}
.time-input-wrapper > input {
  @apply outline-none text-transparent w-8 select-none;
}
.time-input-wrapper > input:focus {
  @apply border-b-2 border-solid border-gray-200;
}
.time-input-wrapper > span {
  @apply absolute top-0 left-0 bottom-0 right-0 pointer-events-none z-10 text-main-text-color;
}
.time-input-wrapper > input::-webkit-outer-spin-button,
.time-input-wrapper > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
.time-input-wrapper > input[type="number"] {
  -moz-appearance: textfield;
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
<template>
  <div
    id="timer-app"
    class="w-screen h-screen overflow-y-auto bg-main-background"
  >
    <setup-page
      v-show="setupMode"
      :intervals="intervals"
      @add-interval="openAddIntervalDialog"
      @start-training="startTraining"
      @edit-interval="openEditDialog"
      @delete-interval="openDeleteDialog"
    />

    <timer-page
      v-show="!setupMode"
      ref="timerPage"
      @exit-timer="setupMode = true"
    />

    <!-- add interval -->
    <transition name="fade">
      <dialog-window
        v-if="
          showAddIntervalDialog ||
          showEditIntervalDialog ||
          showDeleteIntervalDialog
        "
      >
        <template #body>
          <h6 v-if="showAddIntervalDialog" class="dialog-title">
            Intervall hinzufügen
          </h6>
          <h6 v-else-if="showEditIntervalDialog" class="dialog-title">
            Intervall bearbeiten
          </h6>
          <h6 v-else class="dialog-title">Intervall löschen</h6>

          <!-- delete -->
          <div v-if="showDeleteIntervalDialog">
            <span> Möchtest du wirklich dieses Intervall löschen? </span>
          </div>

          <!-- add or edit -->
          <div v-else class="grid gap-4">
            <div>
              <p class="time-input-label">WIEDERHOLUNGEN</p>

              <div class="time-input-wrapper">
                <input
                  v-model="newInterval.repetitions"
                  type="number"
                  min="1"
                  max="99"
                />
                <span>
                  {{ newInterval.repetitions }}
                </span>
              </div>
            </div>

            <div>
              <p class="time-input-label">TRAINING</p>
              <div class="flex justify-center">
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
              </div>
            </div>

            <div>
              <p class="time-input-label">PAUSE</p>
              <div class="flex justify-center">
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
              </div>
            </div>
          </div>
        </template>

        <!-- add new interval -->
        <template v-if="showAddIntervalDialog" #bottom>
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

        <!-- edit interval -->
        <template v-else-if="showEditIntervalDialog" #bottom>
          <button
            class="text-red-500 hover:text-red-300"
            @click="clickedOnAbortEdit"
          >
            Abbrechen
          </button>
          <button
            class="text-blue-500"
            :class="
              isNewIntervalInputValid ? 'hover:text-blue-300' : 'disabled'
            "
            @click="clickedOnApplyEdit"
          >
            Okay
          </button>
        </template>

        <!-- delete interval -->
        <template v-else #bottom>
          <button
            class="text-blue-500 hover:text-blue-300"
            @click="showDeleteIntervalDialog = false"
          >
            Zurück
          </button>
          <button
            class="text-red-500 hover:text-red-300"
            @click="confirmDeletion"
          >
            Löschen
          </button>
        </template>
      </dialog-window>
    </transition>
  </div>
</template>


<script>
import {
  convertAllIntervalStringValuesToNumbers,
  convertIntervalTimeToSeconds,
  convertSecondsToTimeObject,
  getTotalTimeOfInterval,
} from "~/static/intervals";
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
      showEditIntervalDialog: false,
      showDeleteIntervalDialog: false,
      newInterval: null,
      newIntervalTime: 0,
      intervals: [
        {
          workTime: { minutes: 1, seconds: 30 },
          restTime: { minutes: 0, seconds: 20 },
          repetitions: 3,
        },
        {
          workTime: { minutes: 1, seconds: 0 },
          restTime: { minutes: 0, seconds: 10 },
          repetitions: 1,
        },
        {
          workTime: { minutes: 2, seconds: 15 },
          restTime: { minutes: 0, seconds: 30 },
          repetitions: 4,
        },
      ],
      editIntervalCopy: null,
      editIntervalIndex: null,
      deleteIntervalIndex: null,
    };
  },

  computed: {
    isNewIntervalInputValid() {
      return this.newIntervalTime > 0;
    },
  },

  watch: {
    newInterval: {
      deep: true,
      handler() {
        this.newIntervalTime = getTotalTimeOfInterval(this.newInterval);
      },
    },
  },

  mounted() {
    this.loadUrlQuery();
  },

  methods: {
    openEditDialog(intervalIndex) {
      const interval = this.intervals[intervalIndex];
      this.newInterval = JSON.parse(JSON.stringify(interval));
      this.editIntervalIndex = intervalIndex;
      this.showEditIntervalDialog = true;
    },
    openDeleteDialog(intervalIndex) {
      this.showDeleteIntervalDialog = true;
      this.deleteIntervalIndex = intervalIndex;
    },
    confirmDeletion() {
      try {
        this.deleteInterval(this.deleteIntervalIndex);
      } catch (error) {}
      this.deleteIntervalIndex = null;
      this.showDeleteIntervalDialog = false;
    },
    clickedOnApplyEdit() {
      if (!this.isNewIntervalInputValid) return null;

      // delete old interval
      if (this.editIntervalIndex !== null)
        this.deleteInterval(this.editIntervalIndex);

      // add new
      this.addIntervalObject(this.newInterval);

      // close dialog
      this.showEditIntervalDialog = false;
    },
    clickedOnAbortEdit() {
      this.showEditIntervalDialog = false;
      this.editIntervalCopy = null;
      this.editIntervalIndex = null;
    },
    deleteInterval(intervalIndex) {
      if (intervalIndex > -1) {
        this.intervals.splice(intervalIndex, 1); // 2nd parameter means remove one item only
      }
      this.updateUrlQuery();
    },
    sortIntervals() {
      const compareIntervals = (intervalA, intervalB) => {
        const timeA = convertIntervalTimeToSeconds(intervalA.workTime);
        const timeB = convertIntervalTimeToSeconds(intervalB.workTime);
        return timeA - timeB;
      };

      this.intervals.sort(compareIntervals);
    },
    resetNewInterval() {
      this.newIntervalTime = 0;
      this.newInterval = {
        workTime: { minutes: 0, seconds: 0 },
        restTime: { minutes: 0, seconds: 0 },
        repetitions: 1,
      };
    },
    openAddIntervalDialog() {
      this.resetNewInterval();
      this.showAddIntervalDialog = true;
    },
    clickedOnAddIntervalInDialog() {
      if (this.isNewIntervalInputValid) this.addNewIntervalAndCloseDialog();
      // else do nothing
    },
    addNewIntervalAndCloseDialog() {
      // add interval
      this.addIntervalObject(
        convertAllIntervalStringValuesToNumbers(this.newInterval)
      );
      this.resetNewInterval();

      // close dialog
      this.showAddIntervalDialog = false;
    },
    addInterval(workTimeInSeconds, restTimeInSeconds, repetitions) {
      const valuesAreNumbers = [
        workTimeInSeconds,
        restTimeInSeconds,
        repetitions,
      ].every((value) => typeof value === "number");
      if (!valuesAreNumbers) return null;

      const workTime = convertSecondsToTimeObject(workTimeInSeconds);
      const restTime = convertSecondsToTimeObject(restTimeInSeconds);

      const interval = {
        repetitions,
        workTime,
        restTime,
      };

      this.addIntervalObject(interval);
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
    addIntervalObject(inputInterval) {
      if (typeof inputInterval !== "object") return null;

      // add data
      this.intervals.push(inputInterval);
      this.sortIntervals(); // sort array after work time
      this.updateUrlQuery();
    },
    startTraining() {
      this.setupMode = false;
      const timerPageRef = this.$refs.timerPage;
      timerPageRef.startTraining(this.intervals);
    },
    updateUrlQuery() {
      // get data
      const intervalObjectToString = ({ repetitions, workTime, restTime }) => {
        const workTimeInSeconds = convertIntervalTimeToSeconds(workTime);
        const restTimeInSeconds = convertIntervalTimeToSeconds(restTime);
        return [workTimeInSeconds, restTimeInSeconds, repetitions]
          .map((value) => String(value))
          .join("-");
      };

      const dataArray = (this.intervals || []).map(intervalObjectToString);
      const data = dataArray.join("_");

      // push route
      this.$router.push({ query: { data } });
    },
    loadUrlQuery() {
      try {
        const data = this.$route.query?.data;
        if (typeof data === "string" && data.length > 0) {
          const convertStringIntervalToObject = (str) => {
            const numbers = str.split("-").map((subStr) => Number(subStr));
            const workTime = convertSecondsToTimeObject(numbers[0]);
            const restTime = convertSecondsToTimeObject(numbers[1]);
            const repetitions = numbers[2];
            return { workTime, restTime, repetitions };
          };
          this.intervals = data.split("_").map(convertStringIntervalToObject);
        }
      } catch (error) {}
    },
  },
};
</script>


<style lang="postcss">
.circle-btn {
  @apply border border-solid bg-white rounded-full shadow;
}

#timer-app {
  --main-text-color: #4b5563; /* #424242; */
}

#timer-app {
  color: var(--main-text-color);
}

#timer-app,
#timer-app * {
  box-sizing: border-box;
}

#timer-app button {
  outline: none;
}

#timer-app button.disabled {
  @apply bg-opacity-20 cursor-not-allowed text-gray-200;
}

.interval-btn {
  @apply w-5 h-5 bg-theme-light hover:bg-theme border border-solid rounded-full text-white text-xl font-semibold flex justify-center items-center my-auto relative;
}
.interval-btn.plus::before,
.interval-btn.minus::before {
  color: white;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: 13px;
}
.interval-btn.plus::before {
  content: "+";
}
.interval-btn.minus::before {
  content: "-";
}
.time-input-label {
  @apply text-lg text-theme;
}
.time-input-wrapper {
  @apply relative;
}
.time-input-wrapper > input {
  @apply outline-none text-transparent w-8 select-none text-lg border-b-2 border-solid border-transparent text-center;
}
.time-input-wrapper > input:focus {
  @apply border-theme-light text-theme-light;
}
.time-input-wrapper > input:focus + span {
  @apply text-theme-light hidden;
}
.time-input-wrapper > span {
  @apply absolute top-0 left-0 bottom-0 right-0 pointer-events-none z-10 text-main-text-color text-lg;
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

.content-wrapper {
  @apply max-w-4xl mx-auto;
}

.page-title {
  @apply text-4xl text-center w-full text-theme;
}

.info-box {
  @apply text-gray-400 border-l-4 border-solid border-theme bg-theme-very-light p-4;
}

.page-top-wrapper {
  @apply rounded-b-2xl;
}
.page-bottom-wrapper {
  @apply rounded-t-2xl;
}
.page-top-wrapper,
.page-bottom-wrapper {
  @apply bg-white shadow-lg w-full px-4 sm:px-8 py-6 border border-solid flex gap-4 justify-between;
}

.hover-uplift {
  @apply duration-75 transform hover:scale-105 hover:shadow-lg;
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
<template>
  <div class="w-full flex justify-center">
    <div
      class="rounded-full flex justify-center items-center"
      :style="{
        width: innerRadiusValue,
        height: innerRadiusValue,
        '-webkit-box-shadow':
          '0px 0px 22px 15px rgba(' +
          intervalKindColorRGB +
          ',0.2), 0px 0px 12px 3px rgba(' +
          intervalKindColorRGB +
          ',0.2)',
        'box-shadow':
          '0px 0px 22px 15px rgba(' +
          intervalKindColorRGB +
          ',0.2), 0px 0px 12px 3px rgba(' +
          intervalKindColorRGB +
          ',0.2)',
      }"
    >
      <radial-progress-bar
        :diameter="diameter"
        :completed-steps="completedStepsTraining"
        :total-steps="totalSteps"
        start-color="rgb(107 114 128)"
        stop-color="rgb(55 65 81)"
        inner-stroke-color="transparent"
        :inner-stroke-width="10"
        :fps="10"
        :animate-speed="0"
      >
        <radial-progress-bar
          :diameter="intervalIndicatorDiameter"
          :completed-steps="completedStepsInterval"
          :total-steps="totalSteps"
          :start-color="startColor"
          :stop-color="stopColor"
          inner-stroke-color="transparent"
          :inner-stroke-width="10"
          :fps="10"
          :animate-speed="0"
        >
          <div
            class="bg-white rounded-full flex justify-center items-center"
            :style="{ width: innerRadiusValue, height: innerRadiusValue }"
          >
            <slot />
          </div>
        </radial-progress-bar>
      </radial-progress-bar>
    </div>
  </div>
</template>


<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  components: {
    RadialProgressBar,
  },

  props: {
    intervalKind: {
      type: String,
      required: true,
    },
    intervalProgress: {
      type: Number,
      required: true,
    },
    trainingProgress: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      totalSteps: 1000,
      diameter: 320,
    };
  },

  computed: {
    completedStepsInterval() {
      return Math.round(this.intervalProgress * this.totalSteps) + 1;
    },
    completedStepsTraining() {
      return Math.round(this.trainingProgress * this.totalSteps) + 1;
    },
    intervalIndicatorDiameter() {
      return this.diameter - 20;
    },
    innerRadiusValue() {
      return String(this.diameter - 20 * 2.5) + "px";
    },
    startColor() {
      if (this.intervalKind === "w") return "#DE781F";
      if (this.intervalKind === "r") return "#1F85DE";
      return null;
    },
    stopColor() {
      if (this.intervalKind === "w") return "#de981f";
      if (this.intervalKind === "r") return "#1fa5de";
      return null;
    },
    intervalKindColorRGB() {
      if (this.intervalKind === "w") return "222,120,31";
      if (this.intervalKind === "r") return "31,133,222";
      return "255, 255, 55";
    },
  },
};
</script>
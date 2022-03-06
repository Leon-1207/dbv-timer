<template>
  <div     class="w-full flex justify-center">
    <radial-progress-bar
      :diameter="diameter"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      :start-color="startColor"
      :stop-color="stopColor"
      inner-stroke-color="transparent"
      inner-stroke-width="10"
      fps="10"
      animate-speed="0"
    >
      <div
        class="bg-white rounded-full flex justify-center items-center"
        :style="{ width: innerRadiusValue, height: innerRadiusValue }"
      >
        <slot />
      </div>
    </radial-progress-bar>
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
    completedSteps() {
      return Math.round(this.intervalProgress * this.totalSteps);
    },
    innerRadiusValue() {
      return String(this.diameter - 30) + "px";
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
  },
};
</script>
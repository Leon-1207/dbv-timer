<template>
  <div class="w-screen h-screen overflow-y-auto bg-main-background">
    <setup-page
      v-show="setupMode"
      @add-interval="openAddIntervalDialog"
      @start-training="startTraining"
    />

    <timer-page v-show="!setupMode" ref="timerPage" />
  </div>
</template>

<script>
import setupPage from "~/components/setupPage.vue";
import TimerPage from "~/components/timerPage.vue";
export default {
  name: "IndexPage",

  components: { setupPage, TimerPage },

  data() {
    return {
      setupMode: true,
      intervals: [{ id: 1 }, { id: 1 }],
    };
  },

  methods: {
    openAddIntervalDialog() {
      // TODO
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
</style>
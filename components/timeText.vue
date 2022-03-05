<template>
  <span>
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    seconds() {
      return this.data?.seconds || 0;
    },
    minutes() {
      const minutesNum = this.data?.minutes || 0;
      return Math.floor(minutesNum % 60);
    },
    hours() {
      const minutesNum = this.data?.minutes || 0;
      return Math.floor(minutesNum / 60);
    },
    text() {
      const numbers = [this.hours, this.minutes, this.seconds];
      const texts = numbers.map((number) => {
        let str = String(number);
        while (str.length < 2) {
          str = "0" + str;
        }
        return str;
      });

      return (this.hours > 0 ? texts[0] + ":" : "") + texts[1] + ":" + texts[2];
    },
  },
};
</script>
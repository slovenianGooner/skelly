export default {
  props: {
    block: {
      type: Object,
      require: true,
    },
    blockIndex: {
      type: Number,
      default: 0
  },
  created() {
    if (this.block.form !== undefined) {
      this.form = this.block.form;
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit("change", this.form);
      },
    },
  },
};

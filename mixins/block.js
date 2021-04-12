export default {
  props: {
    block: {
      type: Object,
      require: true,
    },
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

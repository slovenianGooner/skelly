import ckeditor from "@ckeditor/ckeditor5-vue";
import classicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    ckeditor: ckeditor.component,
  },
  data() {
    return {
      classicEditor: classicEditor,
    };
  },
};

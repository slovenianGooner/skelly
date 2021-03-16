import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  getComponents() {
    const requireComponent = require.context(
      // The relative path of the components folder
      "./components",
      // Whether or not to look in subfolders
      true,
      // The regular expression used to match base component filenames
      /[\w-]+\.vue$/
    );

    return requireComponent.keys().map((fileName) => {
      // Get component config
      const componentConfig = requireComponent(fileName);
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          //   fileName
          //     .split("/")
          //     .pop()
          //     .replace(/\.\w+$/, "")
          fileName.replace("./", "").replace(".vue", "").replace("/", "")
        )
      );

      return {
        name: "X" + componentName,
        config: componentConfig.default || componentConfig,
      };
    });
  },
};

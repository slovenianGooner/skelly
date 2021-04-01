import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  getSolidIcons() {
    const requireComponent = require.context(
      // The relative path of the components folder
      "./node_modules/@heroicons/vue/solid/esm",
      // Whether or not to look in subfolders
      true,
      // The regular expression used to match base component filenames
      /[\w-]+\.js$/
    );

    return requireComponent.keys().map((fileName) => {
      // Get component config
      const componentConfig = requireComponent(fileName);
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          fileName.replace("./", "").replace(".js", "").replace("/", "")
        )
      );

      return {
        name: "Solid" + componentName,
        config: componentConfig.default || componentConfig,
      };
    });
  },
  getOutlineIcons() {
    const requireComponent = require.context(
      // The relative path of the components folder
      "./node_modules/@heroicons/vue/outline/esm",
      // Whether or not to look in subfolders
      true,
      // The regular expression used to match base component filenames
      /[\w-]+\.js$/
    );

    return requireComponent.keys().map((fileName) => {
      // Get component config
      const componentConfig = requireComponent(fileName);
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          fileName.replace("./", "").replace(".js", "").replace("/", "")
        )
      );

      return {
        name: "Outline" + componentName,
        config: componentConfig.default || componentConfig,
      };
    });
  },
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

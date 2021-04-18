export default {
  methods: {
    transformAncestors(options, ancestorResolver, key, shiftFirstAncestor) {
      var findAncestors = require("find-ancestors");
      let ancestors = findAncestors(options, ancestorResolver).map(
        (ancestor) => ancestor[key]
      );

      if (shiftFirstAncestor) {
        ancestors.shift();
      }

      let transformedOptions = [...options];
      let component = this;
      transformedOptions.forEach(function iter(a) {
        a.isOpen = ancestors.includes(component.resolveValue(a));
        Array.isArray(a[component.childrenResolver]) &&
          a[component.childrenResolver].forEach(iter);
      });

      return transformedOptions;
    },
    findInTree(array, value) {
      let component = this;
      var o;
      array.some(function iter(a) {
        if (component.resolveValue(a) == value) {
          o = a;

          return true;
        }
        return (
          Array.isArray(a[component.childrenResolver]) &&
          a[component.childrenResolver].some(iter)
        );
      });

      if (o) {
        return component.resolveLabel(o);
      }

      return o;
    },
  },
};

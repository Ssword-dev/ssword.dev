// Vue Original Implementation: https://github.com/vueuse/vueuse/blob/main/packages/core/useActiveElement/index.ts

/**
 * @link [Original Implementation](https://github.com/vueuse/vueuse/blob/main/packages/core/useActiveElement/index.ts#L38-45)
 */
const getDeepActiveElement = () => {
  let el = document.activeElement;

  while (el?.shadowRoot) {
    el = el.shadowRoot.activeElement;
  }

  return el;
};

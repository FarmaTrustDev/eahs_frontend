<template>
  <div>
    <slot name="extra" />
    <span class="imageHeading">
      <figure>
        <figcaption>
          {{ detail.heading }}
        </figcaption>
      </figure>
    </span>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: {
    detail: { type: Object, default: () => ({}), required: true },
    imgProperties: {
      type: Object,
      default: () => ({ width: '25px', height: '25px' }),
    },
  },
}
</script>

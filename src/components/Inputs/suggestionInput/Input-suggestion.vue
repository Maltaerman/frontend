<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="relative">
    <vue3-simple-typeahead
      id="typeahead_id"
      :class="{
        'rounded-xl': isBorderRounded,
        'rounded-tl-xl rounded-tr-xl': !isBorderRounded,
      }"
      :item-projection="itemProjectionFunction"
      :items="suggestionC"
      :min-input-length="1"
      :placeholder="placeholder"
      @onBlur="onBlurEventHandler"
      @onFocus="onFocusEventHandler"
      @onInput="onInputEventHandler"
      @selectItem="selectItemEventHandler"
    >
      <template #list-item-text="slot">
        <span>
          {{ slot.boldMatchText(slot.itemProjection(slot.item)) }}
        </span>
      </template>
    </vue3-simple-typeahead>
  </div>
</template>

<!-- eslint-disable vue/require-default-prop -->
<script>
export default {
  name: 'InputSuggest',
  props: {
    suggestion: Array,
    maxSuggestionVisible: {
      type: Number,
      default: 5,
    },
    itemProjectionFunction: {
      type: Function,
      default(item) {
        try {
          return item.toString()
        } catch {
          return 'itemProjectionFunction error'
        }
      },
    },
    placeholder: String,
  },
  emits: ['select-item', 'update:modelValue', 'on-focus', 'on-blur'],
  data() {
    return {}
  },
  computed: {
    isBorderRounded() {
      if (this.suggestion && this.suggestion.length > 0) return false
      return true
    },
    suggestionC() {
      return this.suggestion
        ? this.suggestion.slice(0, this.maxSuggestionVisible)
        : []
    },
  },
  methods: {
    onInputEventHandler(e) {
      this.$emit('update:modelValue', e.input)
    },
    selectItemEventHandler(item) {
      this.$emit('select-item', item)
    },
    onFocusEventHandler() {
      this.$emit('on-focus')
    },
    onBlurEventHandler() {
      this.$emit('on-blur')
    },
  },
}
</script>

<style>
@tailwind base;
@tailwind utilities;
@tailwind components;

.simple-typeahead {
  @apply relative;
}

.simple-typeahead-input {
  @apply w-full border
  px-4 py-2 text-h3 font-normal
  outline-none hover:border-blue-c-400
  focus:border-blue-c-500 disabled:bg-gray-c-100
  disabled:text-gray-c-500 disabled:hover:border-gray-c-300;
}

.simple-typeahead-list {
  @apply absolute left-0 right-0 z-50
  overflow-hidden rounded-bl-xl rounded-br-xl
  border border-t-0 border-gray-c-300 font-normal;
}
.simple-typeahead-list-item {
  @apply w-full bg-white px-4 py-2 text-h3;
}
.simple-typeahead-list-item-active {
  @apply bg-blue-c-100;
}
</style>

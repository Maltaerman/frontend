<template>
  <div @focusout="onLeave" tabindex="1">
    <div
      class="input-1 flex flex-nowrap justify-between items-center cursor-pointer"
      @click="Drop"
    >
      <div>
        {{ modelValue.text ?? modelValue.item }}
      </div>
      <button class="block h-full">
        <img src="/src/assets/dropdown-arrow.svg" />
      </button>
    </div>
    <div class="relative">
      <transition name="drop">
        <ul class="drop-container overflow-y-auto-custom z-10" v-if="isDropped">
          <li
            v-for="item in options"
            class="drop-item"
            @click="SetSelectedItem(item)"
            :class="SelectedItemClass(item)"
          >
            {{ item.text }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownSelect',
  props: {
    modelValue: Object,
    options: Array,
  },
  data() {
    return {
      isDropped: false,
    }
  },
  methods: {
    Drop() {
      this.isDropped = !this.isDropped
    },
    SelectedItemClass(Item) {
      return {
        'drop-item-selected': Item === this.modelValue,
      }
    },
    SetSelectedItem(item) {
      this.$emit('update:modelValue', item)
      this.isDropped = false
    },
    onLeave() {
      this.isDropped = false
    },
  },
}
</script>

<style scoped>
.drop-item {
  @apply hover:bg-blue-c-100 hover:text-blue-c-500
	cursor-pointer px-4 py-2 text-h3 snap-start;
}
.drop-item-selected {
  @apply bg-blue-c-200 text-blue-c-500;
}

.drop-container {
  @apply bg-white
	absolute top-1 w-full rounded-xl shadow-cs1 max-h-[210px] snap-start snap-y;
}

.drop-enter-active,
.drop-leave-active {
  transition: margin 0.2s ease;
}

.drop-enter-from {
  margin: 10px 0px 10px 0px;
}

.drop-leave-to {
  margin: -10px 0px 10px 0px;
}
</style>

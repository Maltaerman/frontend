<template>
  <div class="h-full overflow-y-auto p-6">
    <h1 class="w-full py-2 text-center text-2xl">Welcome to test screen</h1>
    <div>
      <SearchDropDown
        v-model="dpVal"
        class="w-[250px]"
        :options="getDpOption"
      />
    </div>
    <div class="h-[60px] w-full bg-red-500 text-center">
      {{ dpVal }}
    </div>
    <ProgressBar :progress="50" />
  </div>
</template>

<script>
import DropDownOption from './Inputs/SearchDropDown/DropDownOption'
import SearchDropDown from './Inputs/SearchDropDown/SearchDropDown.vue'
import ProgressBar from './Other/ProgressBar.vue'

export default {
  name: 'Test',
  components: {
    ProgressBar,
    SearchDropDown,
  },
  data() {
    return {
      dpVal: undefined,
    }
  },
  computed: {
    OrgStr() {
      return JSON.stringify(this.organization)
    },
    dateStr() {
      if (!this.date) return ''
      return (
        new Date(this.date[0]).toDateString() +
        '\n\r' +
        new Date(this.date[1]).toDateString()
      )
    },
    getDpOption() {
      let res = []
      for (let i = 1; i < 21; i++) {
        res.push(
          DropDownOption(`option ${i}`, {
            value: `Value is ${i}`,
          }),
        )
      }
      return res
    },
  },
  watch: {
    date(newVal) {
      console.log(newVal)
    },
  },
  methods: {
    Test1() {
      this.items = null
    },
    Test2() {
      this.modalVisible = !this.modalVisible
    },
    HideModal() {
      this.modalVisible = false
    },
    close() {
      this.$toast.clear()
    },
    changeMessage() {
      this.mess = 'qwertyyyyy'
    },
    onValidation(res) {
      console.log(res)
    },
  },
}
</script>

<style>
.fade-enter-active {
  transition: all, 2s, ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>

<template>
  <div class="h-full overflow-y-auto p-6">
    <h1 class="w-full py-2 text-center text-2xl">Welcome to test screen</h1>
    <button-text-1 @click="Test1"> Test </button-text-1>
    <button-text-1 @click="Test2"> ShowModal </button-text-1>

    <div>
      <VueDatePicker
        v-model="date"
        auto-apply
        close-on-auto-apply
        :enable-time-picker="false"
        locale="ua"
        placeholder="Date"
        :range="true"
        utc
      />
    </div>
    <div>
      {{ dateStr }}
    </div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'

export default {
  name: 'Test',
  components: {
    VueDatePicker,
  },
  data() {
    return {
      date: undefined,
      mess: 'Message',
      modalVisible: false,
      items: [
        'Golden Retriever t',
        'Cat',
        'Cat',
        'Cat',
        'Cat',
        'Cat',
        'Cat',
        'Cat',
        'Squirrel',
        'Golden Retriever t',
        'Cat',
        'Squirrel',
        'Golden Retriever t',
        'Cat',
        'Squirrel',
      ],
      organization: {
        name: '',
        site: '',
        address: '',
        description: '',
        logo: undefined,
      },
      userData: {
        mail: 'mailtest@gmail.com',
        name: 'UserName',
      },
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

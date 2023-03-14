<template>
  <h1 class="w-full py-2 text-2xl text-center">Welcome to test screen</h1>
  <button-text-1 @click="Test1"> Test </button-text-1>
  <button-text-1 @click="Test2"> ShowModal </button-text-1>

  <InputSuggest class="bg-red-c-500 px-2 mb-2" :suggestion="items" />
  <div class="bg-green-700 h-10 w-full"></div>
  <user-invite-modal
    :close-func="HideModal"
    :is-hide-on-click="true"
    :is-modal-visible="modalVisible"
  />
</template>

<script>
import InputSuggest from './Inputs/suggestionInput/Input-suggestion.vue'
import UserInviteModal from './Modals/UserInviteModal.vue'

export default {
  name: 'BaseTest',
  components: {
    InputSuggest,
    UserInviteModal,
  },
  data() {
    return {
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
    }
  },
  methods: {
    Test1() {
      this.items = null
    },
    Test2() {
      this.modalVisible = true
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

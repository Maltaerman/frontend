<template>
  <div>
    <p class="text-gray-c-500">
      {{ $t('userSideBar.formHelperText') }}
    </p>
    <div class="h-min">
      <textarea
        id="issueMessage"
        class="my-4 h-max min-h-[68px] w-full resize-none rounded-lg border border-gray-c-300 px-4 py-2"
        :placeholder="$t('userSideBar.formTextAreaPlaceholder')"
        v-model="issueMessage"
      >
      </textarea>
      <button
        @click="this.Show(issueMessage)"
        :disabled="this.isDisabled"
        :class="{
          'bg-gray-c-200 text-gray-c-400': isDisabled,
          'bg-gray-c-200 text-gray-c-600 ': !isDisabled,
          'hover:text-gray-c-500 active:bg-gray-c-300 active:text-gray-c-600':
            !isDisabled,
        }"
        class="block rounded-lg border px-[50px] py-2 font-medium"
        id="issueMessSendButt"
      >
        Відправити
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedBackForm',
  data: function () {
    return {
      issueMessage: '',
    }
  },
  methods: {
    Show(string) {
      alert(string)
    },
  },
  computed: {
    isDisabled() {
      return this.issueMessage.length < 10
    },
  },
}
</script>

<style scoped></style>

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex flex-col gap-6">
    <Input1
      v-model="modelValue.username"
      inp-id="setting-name"
      :label="$t('userSettings.name')"
      :placeholder="$t('userSettings.name')"
      :validation-message="$t('validations.minLength', { amount: 2 })"
      validation-type="name"
    />
    <Input1
      v-model="modelValue.email"
      disabled
      inp-id="setting-mail"
      :label="$t('userSettings.email')"
      :placeholder="$t('userSettings.email')"
      :validation-message="$t('validations.mailNotValid')"
      validation-type="mail"
    />
  </div>
</template>

<script>
import Input1 from '../Inputs/Input-1.vue'
import regex from '../mixins/regex'

export default {
  name: 'ChangeMailNameInputs',
  components: {
    Input1,
  },
  mixins: [regex],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    modelValue: Object,
  },
  emits: ['validation'],
  data() {
    return {
      isDataValid: false,
    }
  },
  watch: {
    // eslint-disable-next-line func-names
    'modelValue.username': function () {
      this.Validation()
    },
    // eslint-disable-next-line func-names
    'modelValue.email': function () {
      this.Validation()
    },
  },
  mounted() {
    this.Validation()
  },
  methods: {
    Validation() {
      this.isDataValid = this.isMail(this.modelValue.email)
        && this.isName(this.modelValue.username)
      this.$emit('validation', this.isDataValid)
    },
  },
}
</script>

<style scoped></style>

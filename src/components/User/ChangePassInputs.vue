<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex flex-col gap-6">
    <InputPass
      v-model="modelValue.old_password"
      inp-id="setting-pass"
      :label="$t('userSettings.password')"
      :placeholder="$t('userSettings.password')"
      :validation-message="$t('validations.passNotValid')"
    />
    <InputPass
      v-model="modelValue.new_password"
      inp-id="setting-new-pass"
      :label="$t('userSettings.new-password')"
      :placeholder="$t('userSettings.new-password')"
      :validation-message="$t('validations.passNotValid')"
    />
  </div>
</template>

<script>
import InputPass from '../Inputs/Input-pass.vue'
import regex from '../mixins/regex'

export default {
  name: 'ChangePassInputs',
  components: { InputPass },
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
    'modelValue.old_password': function () {
      this.Validation()
    },
    // eslint-disable-next-line func-names
    'modelValue.new_password': function () {
      this.Validation()
    },
  },
  methods: {
    Validation() {
      this.isDataValid = this.isPass(this.modelValue.old_password)
        && this.isPass(this.modelValue.new_password)
      this.$emit('validation', this.isDataValid)
    },
  },
}
</script>

<style scoped></style>

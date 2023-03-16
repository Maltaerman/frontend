<template>
  <div class="flex flex-col gap-6">
    <Input1
      :label="$t('userSettings.name')"
      inp-id="setting-name"
      :placeholder="$t('userSettings.name')"
      v-model="modelValue.username"
      validation-type="name"
      :validation-message="$t('validations.minLength', { amount: 2 })"
    />
    <Input1
      :label="$t('userSettings.email')"
      inp-id="setting-mail"
      :placeholder="$t('userSettings.email')"
      v-model="modelValue.email"
      validation-type="mail"
      :validation-message="$t('validations.mailNotValid')"
      disabled
    />
  </div>
</template>

<script>
import Input1 from "../Inputs/Input-1.vue";
import regex from "../mixins/regex.js";
export default {
  name: "ChangeMailNameInputs",
  mixins: [regex],
  emits: ["validation"],
  components: {
    Input1,
  },
  props: {
    modelValue: Object,
  },
  data() {
    return {
      isDataValid: false,
    };
  },
  methods: {
    Validation() {
      this.isDataValid =
        this.isMail(this.modelValue.email) &&
        this.isName(this.modelValue.username);
      this.$emit("validation", this.isDataValid);
    },
  },
  watch: {
    "modelValue.username"() {
      this.Validation();
    },
    "modelValue.email"() {
      this.Validation();
    },
  },
  mounted() {
    this.Validation();
  },
};
</script>

<style scoped></style>

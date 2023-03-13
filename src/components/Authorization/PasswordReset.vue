<template>
  <div class="flex flex-col h-screen">
    <AppHeader class="grow-0 shrink-0" />
    <div class="grow flex items-center justify-center p-4 overflow-y-auto">
      <div class="w-[480px] mobile:w-full">
        <div class="text-center text-h1 font-semibold mb-9 text-gray-c-800">
          Відновлення паролю
        </div>
        <div class="text-center text-body-2 font-semibold mb-6">
          Введіть новий пароль
        </div>
        <div>
          <div class="mb-6">
            <label
class="block mb-1 text-h4 text-gray-c-500"
for="user-pass">
              Новий пароль
            </label>
            <input-pass
              v-model="pass"
              class="outline-none"
              inp-id="user-pass"
              tabindex="3"
              :validation-message="$t('validations.passNotValid')"
              @validation="onPassValid"
            />
          </div>
          <div class="mb-6">
            <label
              class="block mb-1 text-h4 text-gray-c-500"
              for="user-pass-conf"
            >
              Повторіть новий пароль
            </label>
            <input-pass
              v-model="passConfirm"
              class="outline-none"
              inp-id="user-pass-conf"
              :placeholder="$t('userRegistration.passRepeatPlaceholder')"
              tabindex="4"
              :validation-func="isPassEquals"
              :validation-message="$t('validations.passNotEquals')"
            />
          </div>
        </div>

        <button-1
          class="w-full"
          :disabled="isButtonDisabled"
          tabindex="7"
          @click="ResetPass"
        >
          {{ $t('general.confirm') }}
        </button-1>
      </div>
    </div>
  </div>
  <BaseLoader
v-if="isLoaderVisible"
class="z-[9999]" />
</template>

<script>
import api from '../../http_client/index.js'
import AppHeader from '../AppHeader.vue'
import InputPass from '../Inputs/Input-pass.vue'
import regex from '../mixins/regex.js'

export default {
  name: 'PasswordReset',
  components: {
    AppHeader,
    InputPass,
  },
  mixins: [regex],
  data() {
    return {
      pass: '',
      passConfirm: '',
      isPassValid: false,
      isLoaderVisible: false,
      access_token: undefined,
    }
  },
  computed: {
    isButtonDisabled() {
      return !this.isPassValid || !this.isPassEquals()
    },
  },
  mounted() {
    this.GetIsResetAvailable()
  },
  methods: {
    onPassValid(value) {
      this.isPassValid = value
    },
    isPassEquals() {
      return this.pass === this.passConfirm
    },
    onCompleted() {
      this.$router.push('/welcome')
    },
    GetIsResetAvailable() {
      if (!this.$route.query.access_token) {
        this.$toast.error(
          'Некоректне посилання.',
          this.$toast.options(false, false, this.onCompleted)
        )
        return
      }
      this.access_token = this.$route.query.access_token
    },
    //TODO Localization
    async ResetPass() {
      this.isLoaderVisible = true
      await api.user
        .PassResetConfirm(this.access_token, this.pass)
        .then((res) => {
          console.log(res)
          this.isLoaderVisible = false
          this.$toast.success(
            'Пароль успішно змінено',
            this.$toast.options(false, false, this.onCompleted)
          )
        })
        .catch((err) => {
          console.error(err)
          this.isLoaderVisible = false

          this.$toast.error('Error', this.$toast.options(false, false))
        })
    },
  },
}
</script>

<style scoped></style>

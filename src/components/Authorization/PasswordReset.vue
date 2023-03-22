<template>
  <div class="flex h-screen flex-col">
    <Header class="shrink-0 grow-0" />
    <div class="flex grow items-center justify-center overflow-y-auto p-4">
      <div class="w-[480px] mobile:w-full">
        <div class="mb-9 text-center text-h1 font-semibold text-gray-c-800">
          Відновлення паролю
        </div>
        <div class="text-body-2 mb-6 text-center font-semibold">
          Введіть новий пароль
        </div>
        <div>
          <div class="mb-6">
            <label class="mb-1 block text-h4 text-gray-c-500" for="user-pass">
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
              class="mb-1 block text-h4 text-gray-c-500"
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
  <Loader v-if="isLoaderVisible" class="z-[9999]" />
</template>

<script>
import regex from '../mixins/regex.js'

import Header from '@/components/Header.vue'
import InputPass from '@/components/Inputs/Input-pass.vue'
import api from '@/http_client/index.js'

export default {
  name: 'PasswordReset',
  components: {
    Header,
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
          this.$toast.options(false, false, this.onCompleted),
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
            this.$toast.options(false, false, this.onCompleted),
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

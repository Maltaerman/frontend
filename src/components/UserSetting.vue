<template>
  <ModalTemplate
    :classList="
      'grid place-items-end mobile:place-items-center' + ' mobile:px-4'
    "
    :close-func="closeModal"
    :is-modal-visible="isSettingVisible"
  >
    <div
      class="relative h-screen w-[600px] animate-userSettingsAppear bg-white p-9 tablet:w-[480px] tablet:p-4 mobile:h-min mobile:w-full mobile:rounded-lg mobile:p-4"
      @click.stop
      :class="{ 'animate-userSettingsAppear': isSettingVisible }"
      id="userSettings"
    >
      <Loader v-if="isShowLoader"></Loader>
      <!--      Header-->
      <div
        class="relative mb-6 text-h1 font-semibold mobile:text-center mobile:text-h2"
      >
        {{ $t('userSettings.header') }}
        <img
          class="absolute top-0 hidden h-min w-min mobile:right-0 mobile:block"
          @click="closeModal"
          src="/close.svg"
        />
      </div>
      <button-text1
        id="close-settings"
        class="absolute top-7 right-4 w-[100px] py-2 mobile:hidden"
        @click="closeModal"
      >
        {{ $t('general.close') }}
      </button-text1>
      <!--    FORM-->
      <div
        class="w-full text-h4 text-gray-c-500"
        :class="{ 'mobile:flex mobile:flex-col-reverse': isPassChangeVisible }"
      >
        <div :class="{ 'mobile:hidden': isPassChangeVisible }">
          <label for="setting-name">{{ $t('userSettings.name') }}</label>
          <input-1
            inp-id="setting-name"
            :placeholder="$t('userSettings.name')"
            v-model="username"
            class="mt-1 mb-6 block text-black"
          />
          <label for="setting-mail">{{ $t('userSettings.email') }}</label>
          <input-1
            inp-id="setting-mail"
            :placeholder="$t('userSettings.email')"
            v-model="email"
            class="mt-1 text-black"
            disabled
          />
        </div>

        <div
          class="flex flex-row-reverse gap-3 py-6"
          :class="{ 'mobile:hidden': isPassChangeVisible }"
        >
          <Button1
            id="updateData"
            :disabled="saveButDisable"
            @click="updateUserData"
          >
            {{ $t('general.save') }}
          </Button1>
          <ButtonOptions
            id="updatePassword"
            :button-color="'blue'"
            @valueChange="changePassVisibility"
            :checked="isPassChangeVisible"
          >
            {{ $t('userSettings.change-password') }}
          </ButtonOptions>
        </div>

        <div v-show="isPassChangeVisible" id="passChangeBlock">
          <label for="setting-pass">{{ $t('userSettings.password') }}</label>
          <input-pass
            inp-id="setting-pass"
            :placeholder="$t('userSettings.password')"
            class="mt-1 mb-6 text-black"
            v-model="oldPass"
          />
          <label for="setting-new-pass">{{
            $t('userSettings.new-password')
          }}</label>
          <input-pass
            inp-id="setting-new-pass"
            :placeholder="$t('userSettings.new-password')"
            class="mt-1 text-black"
            v-model="newPass"
          />

          <div class="flex flex-row-reverse gap-3 py-6">
            <button1
              :disabled="isChangePassButtonDisabled"
              id="changePassButton"
              @click="updateUserPassword"
            >
              {{ $t('general.save') }}
            </button1>
            <ButtonOptions
              :button-color="'blue'"
              class="hidden mobile:block"
              @valueChange="changePassVisibility"
              :checked="isPassChangeVisible"
            >
              {{ $t('userSettings.change-password') }}
            </ButtonOptions>
          </div>
        </div>
      </div>
    </div>
  </ModalTemplate>
</template>

<script>
import ButtonText1 from './Buttons/Button_text_1.vue'
import Input1 from './Inputs/Input-1.vue'
import InputPass from './Inputs/Input-pass.vue'
import ButtonOptions from './Buttons/Button-options.vue'
import ModalTemplate from './Modals/ModalTemplate.vue'
import Button1 from './Buttons/Button_1.vue'
import { mapGetters, mapMutations } from 'vuex'
import api from '../http_client/index.js'
import Loader from './Loader.vue'

export default {
  name: 'UserSetting',
  emits: ['close'],
  components: {
    Loader,
    Button1,
    ModalTemplate,
    InputPass,
    Input1,
    ButtonText1,
    ButtonOptions,
  },
  props: {
    isSettingVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPassChangeVisible: false,
      isSaveButtonDisabled: true,
      isChangePassButtonDisabled: true,
      isShowLoader: false,
      oldPass: '',
      newPass: '',
      username: '',
      email: '',
    }
  },
  methods: {
    ...mapMutations(['setLoggedUserInfo']),
    closeModal() {
      this.isPassChangeVisible = false
      this.$emit('close')
    },
    changePassVisibility(isVisible) {
      this.isPassChangeVisible = isVisible
    },
    updateSaveButDisable() {
      if (
        this.username !== this.getUser.username ||
        this.email !== this.getUser.email
      )
        this.isSaveButtonDisabled = false
      else this.isSaveButtonDisabled = true
    },
    updateSavePassDisable() {
      if (this.oldPass.length >= 8 && this.newPass.length >= 8)
        this.isChangePassButtonDisabled = false
      else this.isChangePassButtonDisabled = true
    },
    async updateUserData() {
      let updatedData = {
        username: this.username,
        email: this.email,
        full_name: '',
      }
      this.isShowLoader = true
      await api.user
        .UpdateUserData(updatedData)
        .then((res) => {
          this.setLoggedUserInfo(res.data)
          this.$toast.success(
            this.$t('userSettings.userDataUpdatedSuccessMess'),
          )
        })
        .catch((err) => {
          this.$toast.error(this.$t('userSettings.userDataUpdatedErrorMess'))
        })
        .finally(() => {
          this.isShowLoader = false
        })
    },
    async updateUserPassword() {
      let updatedPass = {
        old_password: this.oldPass,
        new_password: this.newPass,
      }
      console.log(updatedPass)
      this.isShowLoader = true
      await api.user
        .UpdateUserPass(updatedPass)
        .then((res) => {
          this.$toast.success(
            this.$t('userSettings.userDataUpdatedSuccessMess'),
          )
        })
        .catch((err) => {
          this.$toast.error(this.$t('userSettings.userDataUpdatedErrorMess'))
        })
        .finally(() => {
          this.newPass = ''
          this.oldPass = ''
          this.isShowLoader = false
        })
    },
  },
  computed: {
    ...mapGetters(['getUser']),
    saveButDisable() {
      return (
        this.username === this.getUser.username &&
        this.email === this.getUser.email
      )
    },
  },
  watch: {
    getUser(newValue) {
      if (this.getUser) {
        this.username = this.getUser.username
        this.email = this.getUser.email
      }
    },
    username(newVal) {
      this.updateSaveButDisable()
    },
    email(newVal) {
      this.updateSaveButDisable()
    },
    newPass(newVal) {
      this.updateSavePassDisable()
    },
    oldPass(newVal) {
      this.updateSavePassDisable()
    },
  },
  mounted() {
    if (this.getUser) {
      this.username = this.getUser.username
      this.email = this.getUser.email
    }
  },
}
</script>

<style scoped></style>

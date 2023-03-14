<template>
  <ModalTemplate
    :class-list="
      'grid place-items-end mobile:place-items-center' + ' mobile:px-4'
    "
    :close-func="closeModal"
    :is-modal-visible="isSettingVisible"
  >
    <div
      id="userSettings"
      class="w-[600px] h-screen bg-white p-9 mobile:p-4 tablet:p-4 animate-userSettingsAppear relative mobile:w-full tablet:w-[480px] mobile:h-min mobile:rounded-lg"
      :class="{ 'animate-userSettingsAppear': isSettingVisible }"
      @click.stop
    >
      <BaseLoader v-if="isShowLoader"></BaseLoader>
      <!--      Header-->
      <div
        class="mb-6 text-h1 mobile:text-h2 mobile:text-center relative font-semibold"
      >
        {{ $t('userSettings.header') }}
        <img
          class="w-min h-min absolute top-0 mobile:right-0 hidden mobile:block"
          src="/close.svg"
          @click="closeModal"
        />
      </div>
      <button-text1
        id="close-settings"
        class="w-[100px] absolute top-7 right-4 mobile:hidden py-2"
        @click="closeModal"
      >
        {{ $t('general.close') }}
      </button-text1>
      <!--    FORM-->
      <div
        class="text-h4 text-gray-c-500 w-full"
        :class="{
          'mobile:flex mobile:flex-col-reverse': isPassChangeVisible,
        }"
      >
        <div :class="{ 'mobile:hidden': isPassChangeVisible }">
          <label for="setting-name">{{ $t('userSettings.name') }}</label>
          <BaseInput1
            v-model="username"
            class="block text-black mt-1 mb-6"
            inp-id="setting-name"
            :placeholder="$t('userSettings.name')"
          />
          <label for="setting-mail">{{ $t('userSettings.email') }}</label>
          <BaseInput1
            v-model="email"
            class="text-black mt-1"
            disabled
            inp-id="setting-mail"
            :placeholder="$t('userSettings.email')"
          />
        </div>

        <div
          class="flex flex-row-reverse gap-3 py-6"
          :class="{ 'mobile:hidden': isPassChangeVisible }"
        >
          <BaseButton1
            id="updateData"
            :disabled="saveButDisable"
            @click="updateUserData"
          >
            {{ $t('general.save') }}
          </BaseButton1>
          <ButtonOptions
            id="updatePassword"
            :button-color="'blue'"
            :checked="isPassChangeVisible"
            @valueChange="changePassVisibility"
          >
            {{ $t('userSettings.change-password') }}
          </ButtonOptions>
        </div>

        <div v-show="isPassChangeVisible" id="passChangeBlock">
          <label for="setting-pass">{{ $t('userSettings.password') }}</label>
          <input-pass
            v-model="oldPass"
            class="text-black mt-1 mb-6"
            inp-id="setting-pass"
            :placeholder="$t('userSettings.password')"
          />
          <label for="setting-new-pass">{{
            $t('userSettings.new-password')
          }}</label>
          <input-pass
            v-model="newPass"
            class="text-black mt-1"
            inp-id="setting-new-pass"
            :placeholder="$t('userSettings.new-password')"
          />

          <div class="flex flex-row-reverse gap-3 py-6">
            <BaseButton1
              id="changePassButton"
              :disabled="isChangePassButtonDisabled"
              @click="updateUserPassword"
            >
              {{ $t('general.save') }}
            </BaseButton1>
            <ButtonOptions
              :button-color="'blue'"
              :checked="isPassChangeVisible"
              class="hidden mobile:block"
              @valueChange="changePassVisibility"
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
import { mapGetters, mapMutations } from 'vuex'

import api from '../http_client/index.js'

import BaseLoader from './BaseLoader.vue'
import ButtonOptions from './Buttons/Button-options.vue'
import BaseButton1 from './Buttons/Button_1.vue'
import ButtonText1 from './Buttons/Button_text_1.vue'
import BaseInput1 from './Inputs/BaseInput1.vue'
import InputPass from './Inputs/Input-pass.vue'
import ModalTemplate from './Modals/ModalTemplate.vue'

export default {
  name: 'UserSetting',
  components: {
    BaseLoader,
    BaseButton1,
    ModalTemplate,
    InputPass,
    BaseInput1,
    ButtonText1,
    ButtonOptions,
  },
  props: {
    isSettingVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
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
    getUser() {
      if (this.getUser) {
        this.username = this.getUser.username
        this.email = this.getUser.email
      }
    },
    username() {
      this.updateSaveButDisable()
    },
    email() {
      this.updateSaveButDisable()
    },
    newPass() {
      this.updateSavePassDisable()
    },
    oldPass() {
      this.updateSavePassDisable()
    },
  },
  mounted() {
    if (this.getUser) {
      this.username = this.getUser.username
      this.email = this.getUser.email
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
            this.$t('userSettings.userDataUpdatedSuccessMess')
          )
        })
        .catch(() => {
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
        .then(() => {
          this.$toast.success(
            this.$t('userSettings.userDataUpdatedSuccessMess')
          )
        })
        .catch(() => {
          this.$toast.error(this.$t('userSettings.userDataUpdatedErrorMess'))
        })
        .finally(() => {
          this.newPass = ''
          this.oldPass = ''
          this.isShowLoader = false
        })
    },
  },
}
</script>

<style scoped></style>

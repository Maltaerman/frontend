<template>
  <teleport to="body">
    <div
      v-if="isModalVisible"
      id="addressRequestModal"
      class="fixed top-0 left-0 right-0 bottom-0 z-[1050] grid h-screen w-screen place-items-center overflow-y-hidden bg-black/30 mobile:px-2"
    >
      <transition mode="out-in" name="modal-anim">
        <div
          v-if="animStep == 1"
          class="relative mx-auto flex h-min w-[500px] rounded-xl bg-white p-6 mobile:w-full"
          @click.stop
        >
          <button class="absolute top-6 right-6 h-4 w-4" @click="hide">
            <svg
              fill="none"
              height="14"
              viewBox="0 0 14 14"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"
                fill="#1D2229"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M13.364 2.04988C13.7545 1.65936 13.7545 1.02619 13.364 0.635667C12.9734 0.245142 12.3403 0.245142 11.9497 0.635667L7.00003 5.58537L2.05033 0.635667C1.6598 0.245142 1.02664 0.245142 0.636113 0.635667C0.245589 1.02619 0.245589 1.65936 0.636113 2.04988L5.58582 6.99959L0.636033 11.9494C0.245509 12.3399 0.245508 12.9731 0.636033 13.3636C1.02656 13.7541 1.65972 13.7541 2.05025 13.3636L7.00003 8.4138L11.9498 13.3636C12.3403 13.7541 12.9735 13.7541 13.364 13.3636C13.7546 12.9731 13.7546 12.3399 13.364 11.9494L8.41425 6.99959L13.364 2.04988Z"
                fill="black"
                fill-opacity="0.2"
                fill-rule="evenodd"
              />
            </svg>
          </button>
          <transition mode="out-in" name="modal-anim">
            <div v-if="step === steps.numEnter" class="w-full text-center">
              <div class="text-body-2 font-semibold">
                {{ $t('addressReqModal.step1Title') }}
              </div>
              <div class="text-body-1 mt-2 text-gray-c-600">
                {{ $t('addressReqModal.step1Tips') }}
              </div>
              <TelInput
                v-model="telNum"
                class="my-6"
                @enter-click="numInpEnterClick"
                @validation="onNumValidation"
              />
              <!--              <TelInputV2
                v-model="telNum"
                class="my-6"
                @enter-click="numInpEnterClick"
                @validation="onNumValidation"
              />-->
              <button-1
                class="w-full"
                :disabled="!isNumValid"
                @click="GetCodeAction"
              >
                {{ $t('addressReqModal.step1Button') }}
              </button-1>
            </div>
            <div
              v-else-if="step === steps.codeEnter"
              class="w-full text-center"
            >
              <div class="text-body-2 font-semibold">
                {{ $t('addressReqModal.step2Title') }}
              </div>
              <div class="text-body-1 mt-2 text-gray-c-600">
                {{ step2Tips }}
              </div>
              <CodeInput
                v-model="code"
                class="my-6 w-full"
                :digit-amount="6"
                @enter-click="codeInpEnterClick"
              />
              <button-1
                class="w-full"
                :disabled="!isCodeValid"
                @click="SendRequestAction"
              >
                {{ $t('addressReqModal.step2Button') }}
              </button-1>
              <div
                class="text-body-1 mt-4 flex h-[42px] place-items-center justify-center text-gray-c-500"
              >
                <transition mode="out-in" name="modal-anim">
                  <div v-if="codeExpiredIn > 0">
                    {{ $t('addressReqModal.codeExpires') }}
                    <span class="font-semibold text-blue-c-500">
                      &nbsp;{{ timer }}
                    </span>
                  </div>
                  <button
                    v-else
                    class="font-semibold text-blue-c-500"
                    @click="GetCodeAction"
                  >
                    {{ $t('addressReqModal.sendCodeAgain') }}
                  </button>
                </transition>
              </div>
            </div>
          </transition>
          <!--				<Loader v-if="isLoaderVisible"></Loader>-->
        </div>
        <div
          v-else-if="animStep == 2"
          class="mx-auto grid h-[164px] w-[500px] items-center gap-6 rounded-xl bg-white px-[26px] py-10"
          @click.stop
        >
          <div class="subTitle text-center text-gray-c-800">
            Sending your request...
          </div>
          <ProgressBar :progress="sendingProgress" />
        </div>
        <div v-else></div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import api from '../../http_client/index.js'
import CodeInput from '../Inputs/CodeInput.vue'
import TelInput from '../Inputs/TelInput.vue'
//import TelInputV2 from '../Inputs/TelInputV2.vue'
import ProgressBar from '../Other/ProgressBar.vue'
import regex from '../mixins/regex.js'

export default {
  name: 'SendReportRequestModal',
  components: {
    //TelInputV2,
    ProgressBar,
    TelInput,
    CodeInput,
  },
  mixins: [regex],
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
    closeFunc: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isClosedClick: false,
      isLoaderVisible: false,
      telNum: '',
      isNumValid: false,
      code: '',
      codeExpiredIn: 0,
      step: 'numEnter',
      animStep: 1,
      steps: {
        numEnter: 'numEnter',
        codeEnter: 'codeEnter',
      },

      onClose: () => {},
      intervalId: 0,
      sendingProgress: 0,
    }
  },
  computed: {
    ...mapGetters({
      notFoundedMarker: 'notFoundedMarker',
      getRequestMarkers: 'getRequestMarkers',
    }),
    timer() {
      let min = Math.trunc(this.codeExpiredIn / 60)
      let sec = Math.round(this.codeExpiredIn % 60)
      min = min > 9 ? min : `0${min}`
      sec = sec > 9 ? sec : `0${sec}`
      return `${min}:${sec}`
    },
    step2Tips() {
      return this.$t('addressReqModal.step2Tips', { telNum: this.telNum })
    },
    isCodeValid() {
      return (
        this.onlyDigitsRegex.test(this.code) &&
        this.code.length === 6 &&
        this.codeExpiredIn > 0
      )
    },
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  },
  methods: {
    ...mapMutations({
      setUnreviewedMarkers: 'setUnreviewedMarkers',
      setNotFoundMarker: 'setNoDataMarker',
    }),
    hide() {
      this.isClosedClick = true
      setTimeout(() => {
        this.sendingProgress = 0
        this.isClosedClick = false
        this.step = this.steps.numEnter
        this.telNum = ''
        this.code = ''
        this.codeExpiredIn = 0
        this.isNumValid = false
        this.onClose()
        this.onClose = () => {}
        this.animStep = 1
        this.closeFunc()
      }, 400)
    },
    async getCode() {
      if (!this.isNumValid) {
        this.$toast.error(
          this.$t('validations.numNotValid'),
          this.$toast.options(false, false),
        )
        return
      }
      let tel = this.telNum.replace('+', '%2B')
      await api.guest
        .getCode(tel)
        .then((res) => {
          console.log(res)
          this.startTimer(this.getExpiredTime(res.data.expires_at))
          //this.startTimer(res.data.expiration_minutes * 60);
          this.step = this.steps.codeEnter
        })
        .catch((error) => {
          let errorMess = this.$t('general.errorMessage')
          if (error.response.status === 400)
            errorMess = this.$t('validations.numNotValid')
          this.$toast.error(errorMess, this.$toast.options(false, false))
        })
    },
    getCodeDev() {
      this.step = this.steps.codeEnter
      this.startTimer(15 * 60)
    },
    getExpiredTime(date) {
      return (new Date(date) - new Date()) / 1000
    },
    startTimer(seconds) {
      clearInterval(this.intervalId)
      this.codeExpiredIn = seconds
      this.intervalId = setInterval(() => {
        this.codeExpiredIn--
        if (this.codeExpiredIn <= 0) clearInterval(this.intervalId)
      }, 1000)
    },
    async sendRequestDev() {
      if (!this.notFoundedMarker) {
        this.$toast.error(this.$t('addressReqModal.markerError'))
        return
      }
      if (!this.isCodeValid) {
        this.$toast.error(this.$t('validations.codeNotValid'))
        return
      }
      this.animStep = 2
      let payload = {
        lat: this.notFoundedMarker.position.lat,
        lng: this.notFoundedMarker.position.lng,
      }
      this.sendingProgress = 45
      await new Promise((resolve) => setTimeout(resolve, 300))
      await api.locations
        .requestAddressReview(payload)
        .then(async (res) => {
          console.log(res)
          let data = {
            position: { ...res.data.position } ?? { ...payload },
            status: res.status ?? 1,
          }
          this.setUnreviewedMarkers([data, ...this.getRequestMarkers])
          this.setNotFoundMarker({
            id: res.data.location_id,
            position: res.data.position,
            address: this.notFoundedMarker.address,
          })
          let successMess = this.$t('notFoundAddress.modalSuccessMess', {
            address: this.notFoundedMarker.address,
          })
          this.sendingProgress = 100
          await new Promise((resolve) => setTimeout(resolve, 300))
          this.onClose = () => {
            this.$toast.success(successMess)
          }
          this.hide()
        })
        .catch((err) => {
          console.error(err)
          let errMess = this.$t('general.errorMessage')
          if (err.response && err.response.status === 400)
            errMess = this.$t('notFoundAddress.modalErrRequestExist')
          this.isLoaderVisible = false
          this.onClose = () => {
            this.$toast.error(errMess)
          }
          this.hide()
        })
    },
    async sendRequest() {
      if (!this.isNumValid) {
        this.$toast.error(
          this.$t('validations.numNotValid'),
          this.$toast.options(false, false),
        )
        return
      }
      if (!this.isCodeValid) {
        this.$toast.error(
          this.$t('validations.codeNotValid'),
          this.$toast.options(false, false),
        )
        return
      }
      let params = {
        phone_number: this.telNum,
        otp: this.code,
        ...this.notFoundedMarker.position,
      }
      this.animStep = 2
      this.sendingProgress = 45
      await new Promise((resolve) => setTimeout(resolve, 300))
      await api.guest
        .sendAddressRequest(params)
        .then(async (res) => {
          let data = {
            position: { ...this.notFoundedMarker.position },
            status: res.status ?? 1,
          }

          this.setUnreviewedMarkers([data, ...this.getRequestMarkers])
          this.setNotFoundMarker({
            location_id: res.data.location_id,
            position: { ...this.notFoundedMarker.position },
            address: this.notFoundedMarker.address,
          })
          let successMess = this.$t('notFoundAddress.modalSuccessMess', {
            address: this.notFoundedMarker.address,
          })

          this.sendingProgress = 100
          await new Promise((resolve) => setTimeout(resolve, 300))
          this.isLoaderVisible = false
          this.onClose = () => {
            this.$toast.success(successMess)
          }
          this.hide()
        })
        .catch((err) => {
          console.error(err)
          let errMess = this.$t('general.errorMessage')
          //TODO 400 статкус код коли запит на локацію вже існує. чи коли код чи номер не валідний?
          /*if(err.response && err.response.status === 400)
              errMess = this.$t("notFoundAddress.modalErrRequestExist");*/
          this.isLoaderVisible = false
          this.onClose = () => {
            this.$toast.error(errMess)
          }
          this.hide()
        })
    },
    onNumValidation(arg) {
      this.isNumValid = arg
    },
    numInpEnterClick() {
      if (this.isNumValid) this.GetCodeAction()
    },
    codeInpEnterClick() {
      if (this.isCodeValid) this.SendRequestAction()
    },
    GetCodeAction() {
      //this.getCode();
      this.getCodeDev()
    },
    SendRequestAction() {
      //this.sendRequest();
      this.sendRequestDev()
    },
  },
}
</script>

<style scoped></style>

<template>
  <modal-template
    :class-list="`grid place-content-center px-2`"
    :close-func="close"
    :is-hide-on-click="isHideOnClick"
    :is-modal-visible="isModalVisible"
  >
    <transition name="modal-anim">
      <div
        v-if="animTrigger"
        class="bg-white w-[480px] rounded-lg relative mobile:w-full relative p-6 mx-auto max-h-screen"
        @click.stop
      >
        <button
class="absolute top-6 right-6 cursor-pointer"
@click="close">
          <img src="/src/assets/close.svg" />
        </button>
        <div class="text-h2 text-center font-semibold">
          {{ $t('organizationProfile.addEmployee') }}
        </div>
        <div class="text-h3 text-gray-c-600 mt-2 mb-4">
          {{ $t('organizationProfile.employeeEnvelope') }}
        </div>

        <div class="flex flex-col gap-4 mt-4 mb-2">
          <input-suggest
            v-model.trim="requestedOrg"
            :item-projection-function="suggestionProjection"
            :placeholder="$t('dashboard.organizationSearchPlaceholder')"
            :suggestion="suggestionsC"
            @select-item="setSelectedItem"
          />
          <input1
            v-model.trim="mail"
            class="outline-none"
            placeholder="E-mail"
            :validation-message="$t('validations.mailNotValid')"
            validation-type="mail"
          />
        </div>

        <button-1
          class="w-full mt-6"
          :disabled="!InviteSendingAvailable"
          @click="SendInvite"
        >
          {{ $t('organizationProfile.sendInvite') }}
        </button-1>
        <BaseLoader v-if="isLoader" />
      </div>
    </transition>
  </modal-template>
</template>

<script>
import api from '../../http_client/index.js'
import input1 from '../Inputs/Input-1.vue'
import InputSuggest from '../Inputs/suggestionInput/Input-suggestion.vue'
import regex from '../mixins/regex.js'

import ModalTemplate from './ModalTemplate.vue'
export default {
  name: 'UserInviteModal',
  components: { InputSuggest, ModalTemplate, input1 },
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
    classList: {
      type: String,
    },
    isHideOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      animTrigger: false,
      mail: '',
      requestedOrg: '',
      organization: undefined,
      isLoader: false,
      suggestions: [],
    }
  },
  computed: {
    suggestionsC() {
      return this.suggestions.slice(0, 5)
    },
    InviteSendingAvailable() {
      return this.organization && this.isMail(this.mail)
    },
  },
  watch: {
    isModalVisible(newVal) {
      if (newVal)
        this.$nextTick(() => {
          this.animTrigger = true
        })
    },
    requestedOrg(n) {
      this.organization = undefined
      if (!n || n.length < 3) {
        this.suggestions = []
      } else this.getOrganization()
    },
  },
  methods: {
    close() {
      this.animTrigger = false
      setTimeout(() => {
        this.mail = ''
        this.requestedOrg = ''
        this.organization = undefined
        this.suggestions = []
        this.closeFunc()
      }, 200)
    },
    async getOrganization() {
      if (this.requestedOrg.length < 2) return
      await api.organizations
        .getOrganizationByName(this.requestedOrg, {})
        .then((res) => {
          console.log(res)
          if (res.data[0]) {
            this.suggestions = res.data
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async SendInvite() {
      if (!this.InviteSendingAvailable) {
        this.$toast.error(this.$t('general.errorMessage'))
        return
      }
      this.isLoader = true
      let payload = {
        email: this.mail,
        organization: this.organization.id,
      }
      await api.user
        .SendInvite(payload)
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.$toast.success(this.$t('organizationProfile.successInvite'))
          }, 200)
          this.close()
        })
        .catch((err) => {
          console.error(err)
          setTimeout(() => {
            this.$toast.error(this.$t('general.errorMessage'))
          }, 200)
        })
        .finally(() => {
          this.isLoader = false
        })
    },
    suggestionProjection: (org) => {
      return org.name
    },
    setSelectedItem(item) {
      this.organization = item
      this.suggestions = []
    },
  },
}
</script>

<style scoped></style>

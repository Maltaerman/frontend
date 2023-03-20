<template>
  <ModalTemplate
    class-list="grid place-items-center p-4"
    :close-func="closeThisModal"
    :is-modal-visible="isVisible"
    :isHideOnClick="true"
  >
    <div
      class="bg-white w-[480px] mx-auto mobile:w-full relative p-6 rounded-lg"
      @click.stop
    >
      <img
        class="absolute top-6 right-6 cursor-pointer"
        src="/src/assets/close.svg"
        @click="closeThisModal"
      />
      <div class="text-h2 text-center font-semibold">
        {{ $t('dashboard.addOrganization') }}
      </div>
      <div class="flex flex-col gap-4 mt-4 mb-6">
        <input1
          v-model.trim="organization.name"
          inp-id="inpRegNewOrgName"
          :label="$t('dashboard.organizationName')"
          :model-value="organization.name"
          :placeholder="$t('dashboard.namePlaceholder')"
        />
        <input1
          v-model.trim="organization.website"
          inp-id="inpRegNewOrgSite"
          :label="$t('dashboard.website')"
          :model-value="organization.website"
          placeholder="organization.com"
        />
        <input1
          v-model.trim="organization.address"
          :label="$t('dashboard.address')"
          :model-value="organization.address"
          :placeholder="$t('dashboard.address')"
        />
        <div class="text-h4 text-gray-c-500 text-left font-normal">
          {{ $t('general.email') }}
        </div>
        <input1
          v-for="(item, index) in organization.emails"
          v-model.trim="organization.emails[index]"
          :model-value="organization.emails[index]"
          :placeholder="$t('general.email')"
          :validation-message="$t('validations.mailNotValid')"
          validationType="mail"
        />

        <ButtonText1
          v-if="isAddEmailVisible"
          class="group p-2 font-medium w-min flex flex-nowrap items-center"
          @click="addEmail"
        >
          <svg
            class="inline-block mr-2"
            fill="#2E60B2"
            height="14"
            viewBox="0 0 14 14"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z"
              fill-rule="evenodd"
            />
          </svg>
          <p class="whitespace-nowrap">
            {{ $t('organizationProfile.addMore') }}
          </p>
        </ButtonText1>
      </div>
      <button-1
        class="w-full"
        :disabled="!isAllDataValid"
        @click.stop="InviteOrganization"
      >
        {{ $t('general.save') }}
      </button-1>
      <Loader v-if="isLoaderVisible" />
    </div>
  </ModalTemplate>
</template>

<script>
import api from '../../http_client/index.js'
import ButtonText1 from '../Buttons/Button_text_1.vue'
import Input1 from '../Inputs/Input-1.vue'
import ModalTemplate from '../Modals/ModalTemplate.vue'
import StringFormatter from '../mixins/StringFormatter'
import regex from '../mixins/regex.js'
export default {
  components: {
    ButtonText1,
    ModalTemplate,
    Input1,
  },
  mixins: [StringFormatter, regex],
  inheritAttrs: false,
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    closeCreateOrgModal: {
      type: Function,
    },
    isLoaderVisible: {
      type: Boolean,
    },
  },
  emits: ['addOrganization'],
  data() {
    return {
      organization: {
        name: '',
        website: '',
        address: '',
        emails: [''],
      },
    }
  },
  computed: {
    isAllDataValid() {
      return (
        this.organization.name.length > 2 &&
        this.organization.website.length > 2 &&
        this.organization.address.length > 2 &&
        this.organization.emails.every((x) => this.isMail(x))
      )
    },
    isAddEmailVisible() {
      return this.organization.emails.length < 3
    },
    //TODO remove from here
  },
  watch: {
    isVisible(newVal) {
      this.organization = {
        name: '',
        website: '',
        address: '',
        emails: [''],
      }
    },
  },
  methods: {
    closeThisModal() {
      console.log('joł')
      this.closeCreateOrgModal()
    },
    onAddOrganization() {
      console.log('adding from modal')
      this.$emit('addOrganization', this.organization)
    },
    addEmail() {
      if (this.organization.emails.length < 3) this.organization.emails.push('')
    },
    async InviteOrganization() {
      if (!this.isAllDataValid) return
      await api.organizations
        .inviteOrganization(this.organization)
        .then((res) => {
          console.log(res)
          this.onAddOrganization()
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

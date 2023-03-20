<template>
  <div v-if="isVisible">
    <ModalTemplate
      :is-modal-visible="isModalVisible"
      :is-hide-on-click="true"
      :close-func="closeThisComponent"
      class-list="grid place-items-center px-4"
    >
      <div
        class="relative relative mx-auto max-h-screen w-[480px] overflow-y-auto rounded-lg bg-white p-6 mobile:w-full"
        @click.stop
      >
        <button
          class="absolute top-6 right-6 cursor-pointer"
          @click="closeThisComponent"
        >
          <img src="/src/assets/close.svg" />
        </button>
        <div class="text-s1 mb-2">
          {{ $t('organizationProfile.deleteOrganization') }}
        </div>
        <div class="text-s1 text-red-c-500 underline">
          "{{ organization.name }}"
        </div>
        <div class="my-2 text-h3 text-gray-c-600">
          {{ $t('general.toDeleteType') }}
          <span class="text-center text-h3 font-semibold text-gray-c-800">
            {{ organization.name.trim() }}
          </span>
        </div>

        <input-1 v-model="inputValue" class="w-full" />

        <button-1
          :disabled="!isRemoveAvailable"
          class="mt-6 w-full"
          @click.stop="removeOrg"
        >
          Видалити
        </button-1>
        <Loader v-if="isLoaderVisible" class="rounded-lg" />
      </div>
    </ModalTemplate>
  </div>
</template>

<script>
import ModalTemplate from '../Modals/ModalTemplate.vue'
import input1 from '../Inputs/Input-1.vue'
import Loader from '../Loader.vue'
import api from '../../http_client/index.js'
export default {
  name: 'RemoveOrgModal',
  components: {
    ModalTemplate,
    input1,
    Loader,
  },
  emits: ['on-remove-success', 'on-remove-failed'],
  data() {
    return {
      inputValue: '',
      isModalVisible: true,
      isLoaderVisible: false,
    }
  },
  props: {
    organization: Object,
    isVisible: false,
    onRemoveSuccess: Function,
    onRemoveFailed: Function,
    closeFunc: Function,
  },
  methods: {
    closeThisComponent() {
      ;(this.isModalVisible = true),
        (this.isLoaderVisible = false),
        this.closeFunc()
    },
    closeSuccess() {
      this.onRemoveSuccess()
      this.closeThisComponent()
    },
    closeError() {
      this.onRemoveFailed()
      this.closeThisComponent()
    },
    async removeOrg() {
      this.isLoaderVisible = true
      await api.organizations
        .removeOrganization(this.organization.id)
        .then((res) => {
          this.isModalVisible = false
          this.isLoaderVisible = false
          this.$toast.success(
            this.$t('removeOrgModal.successMess', {
              orgName: this.organization.name,
            }),
            {
              duration: false,
              onClose: this.closeSuccess,
            },
          )
        })
        .catch((err) => {
          this.isModalVisible = false
          this.isLoaderVisible = false
          this.$toast.error(
            this.$t('removeOrgModal.errorMess', {
              orgName: this.organization.name,
            }),
            {
              duration: false,
              onClose: this.closeError,
            },
          )
        })
        .finally(() => {})
    },
  },
  computed: {
    isRemoveAvailable() {
      return this.organization.name.trim() === this.inputValue
    },
  },
}
</script>

<style scoped>
@tailwind base;
@tailwind utilities;
@tailwind components;

.text-s1 {
  @apply text-center text-h2 font-semibold;
}
</style>

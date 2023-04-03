<template>
  <ModalTemplate
    class-list="grid place-items-center p-4"
    :close-func="closeThisModal"
    :is-modal-visible="isVisible"
    :isHideOnClick="true"
  >
    <div
      class="relative mx-auto w-[480px] rounded-lg bg-white p-6 mobile:w-full"
      @click.stop
    >
      <img
        class="absolute top-6 right-6 cursor-pointer"
        src="/src/assets/close.svg"
        @click="closeThisModal"
      />
      <div class="text-center text-h2 font-semibold">
        {{ $t('dashboard.addOrganization') }}
      </div>
      <div class="mt-4 mb-6 flex flex-col gap-4">
        <div>
          <label class="text-h4 text-gray-c-500" for="inpRegNewOrgName">{{
            $t('dashboard.organizationName')
          }}</label>
          <input1
            v-model.trim="organization.createOrgName"
            class="mt-1 w-full"
            inp-id="inpRegNewOrgName"
            :placeholder="$t('dashboard.namePlaceholder')"
          />
        </div>
        <div>
          <label class="text-h4 text-gray-c-500" for="inpRegNewOrgSite">{{
            $t('dashboard.website')
          }}</label>
          <input1
            v-model.trim="organization.createOrgSite"
            class="mt-1 w-full"
            inp-id="inpRegNewOrgSite"
            placeholder="organization.com"
          />
        </div>
      </div>
      <button-1
        class="w-full"
        :disabled="isOrgCreateButtDisabled"
        @click.stop="addOrganization"
      >
        {{ $t('general.save') }}
      </button-1>
      <Loader v-if="isLoaderVisible" />
    </div>
  </ModalTemplate>
</template>

<script>
import Input1 from '../Inputs/Input-1.vue'
import ModalTemplate from '../Modals/ModalTemplate.vue'
import StringFormatter from '../mixins/StringFormatter'
export default {
  components: {
    ModalTemplate,
    Input1,
  },
  mixins: [StringFormatter],
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
        createOrgName: '',
        createOrgSite: '',
      },
    }
  },
  computed: {
    isOrgCreateButtDisabled() {
      return this.TrimTurbo(this.organization.createOrgName).length < 3
    },
  },
  methods: {
    closeThisModal() {
      console.log('joł')
      this.closeCreateOrgModal()
    },
    addOrganization() {
      console.log('adding from modal')
      this.$emit('addOrganization', this.organization)
    },
  },
}
</script>

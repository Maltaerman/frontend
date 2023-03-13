<template>
  <ModalTemplate
    class-list="grid place-items-center p-4"
    :close-func="closeThisModal"
    :is-hide-on-click="true"
    :is-modal-visible="isVisible"
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
        <div>
          <label class="text-h4 text-gray-c-500" for="inpRegNewOrgName">{{
            $t('dashboard.organizationName')
          }}</label>
          <input1
            v-model="organization.createOrgName"
            class="w-full mt-1"
            inp-id="inpRegNewOrgName"
            :placeholder="$t('dashboard.namePlaceholder')"
          />
        </div>
        <div>
          <label class="text-h4 text-gray-c-500" for="inpRegNewOrgSite">{{
            $t('dashboard.website')
          }}</label>
          <input1
            v-model="organization.createOrgSite"
            class="w-full mt-1"
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
      <BaseLoader v-if="isLoaderVisible" />
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

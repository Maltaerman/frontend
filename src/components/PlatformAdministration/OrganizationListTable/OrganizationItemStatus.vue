<template>
  <div>
    <div
      class="flex max-w-max flex-row rounded-lg border bg-white px-2 py-0.5"
      :class="getOrganizationStatus()"
    >
      <div
        v-if="status === ORGANIZATION_STATUSES?.DISABLED"
        class="relative top-0.5 mr-1 inline-block h-5 w-5 border-green-c-200"
      >
        <SVG_eye_crossed class="fill-green-c-500"></SVG_eye_crossed>
      </div>
      <span class="capitalize"> {{ getStatusTranslate }}</span>
    </div>
  </div>
</template>

<script>
import SVG_eye_crossed from '../../ComponentsSVG/Icons/SVG_eye_crossed.vue'
import { ORGANIZATION_STATUSES } from '../constants'
export default {
  name: 'OrganizationItemStatus',
  components: {
    SVG_eye_crossed,
  },
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ORGANIZATION_STATUSES,
    }
  },
  computed: {
    getStatusTranslate() {
      const { ACTIVE, PENDING, DISABLED } = this.ORGANIZATION_STATUSES
      let status = this.$t('general.error')
      switch (this.status) {
        case ACTIVE:
          status = this.$t('general.active')
          break
        case PENDING:
          status = this.$t('general.pending')
          break
        case DISABLED:
          status = this.$t('general.disabled')
          break
        default:
          break
      }
      return status
    },
  },
  methods: {
    getOrganizationStatus() {
      const { ACTIVE, PENDING, DISABLED } = this.ORGANIZATION_STATUSES
      switch (this.status) {
        case ACTIVE:
          return 'border-green-c-200 text-green-c-500'
        case PENDING:
          return 'border-gray-c-200 text-gray-c-500'
        case DISABLED:
          return 'border-gray-c-300 text-gray-c-500 fill-gray-c-200'
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <ConfirmModal
    :accept-button-func="PageLeaveAccepted"
    :accept-button-text="$t('reportTools.acceptButtonText')"
    :cancel-button-func="PageLeaveCanceled"
    :cancel-button-text="$t('reportTools.cancelButtonText')"
    :close-func="closeLeavePageConfirmModal"
    :is-bg-click-close="false"
    :is-visible="isLeaveModalVisible"
    :question="$t('reportTools.beforeLeaveMessage')"
    :title="$t('general.dataNotSaved')"
  />
  <div class="h-full overflow-y-auto py-4 px-6">
    <div class="mb-2 flex flex-wrap justify-between">
      <div class="text-h2 font-semibold">
        <span class="align-middle">{{ $t('reportTools.header') }}</span>
      </div>
      <div class="flex h-[42px] gap-2 mobile:w-full">
        <button-3 class="min-w-[80px] mobile:grow" @click="GoBack">
          {{ $t('general.cancel') }}
        </button-3>
        <button-1
          class="min-w-[80px] mobile:grow"
          :disabled="saveButtDisabled"
          @click="PreviewFinishedReport"
        >
          {{ $t('general.save') }}
        </button-1>
      </div>
    </div>

    <div class="rounded-lg bg-blue-c-200 p-2">
      <h1 class="w-full text-center text-h2 font-semibold">
        {{ $t('reportTools.currentAddress') }}
      </h1>
      <label>
        <div class="py-2 text-h3 text-gray-c-600">
          {{ $t('reportTools.city') }}<sup class="text-red-c-500">*</sup>
        </div>
        <input1
          v-model="updatedReport.city"
          class="w-full rounded-xl"
          :placeholder="$t('reportTools.city')"
          :validation-func="AddressValidation"
          validation-message="Мінімальна довжина 2 символи"
        />
      </label>
      <label>
        <div class="py-2 text-h3 text-gray-c-600">
          {{ $t('reportTools.street') }}<sup class="text-red-c-500">*</sup>
        </div>
        <input1
          v-model="updatedReport.address"
          class="w-full rounded-xl"
          :placeholder="$t('reportTools.street')"
          :validation-func="AddressValidation"
          validation-message="Мінімальна довжина 2 символи"
        />
      </label>
      <label>
        <div class="py-2 text-h3 text-gray-c-600">
          {{ $t('reportTools.streetNumber') }}
        </div>
        <input1
          v-model="updatedReport.street_number"
          class="w-full rounded-xl"
          :placeholder="$t('reportTools.streetNumber')"
        />
      </label>
    </div>

    <div
      v-for="label in ReportsData()"
      :key="label.name"
      class="py-4 shadow-cs2"
    >
      <div class="mb-3 flex min-h-[34px] flex-wrap justify-between">
        <div class="py-2 text-h3 text-gray-c-600">
          {{ $t(`reportTools.${label.name}`) }}
        </div>
        <div class="flex flex-wrap gap-2">
          <ReportRadio
            v-model="updatedReport.reports[label.name].flag"
            :checked-op="updatedReport.reports[label.name].flag"
            :label="label"
          />
        </div>
      </div>
      <resize-textarea
        v-model="updatedReport.reports[label.name].description"
        class="text-area"
        :placeholder="$t('reportTools.textAreaPlaceholder')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import ButtonTag from '../../Buttons/ButtonTag.vue'
import Button1 from '../../Buttons/Button_1.vue'
import Button3 from '../../Buttons/Button_3.vue'
import ReportRadio from '../../Buttons/ReportRadio.vue'
import Input1 from '../../Inputs/Input-1.vue'
import ConfirmModal from '../../Modals/ConfirmModal.vue'
import ModalTemplate from '../../Modals/ModalTemplate.vue'
import helper from '../../mixins/helper.js'
import reportItemFlags from '../../mixins/reportItemFlags.js'

export default {
  name: 'ReportTools',
  components: {
    Input1,
    ReportRadio,
    ConfirmModal,
    ModalTemplate,
    ButtonTag,
    Button1,
    Button3,
  },
  mixins: [helper, reportItemFlags],
  data() {
    return {
      updatedReport: {},
      defaultReport: {
        buildingCondition: {
          flag: 'no_data',
          description: '',
        },
        electricity: {
          flag: 'no_data',
          description: '',
        },
        carEntrance: {
          flag: 'no_data',
          description: '',
        },
        water: {
          flag: 'no_data',
          description: '',
        },
        fuelStation: {
          flag: 'no_data',
          description: '',
          distance: 0,
        },
        hospital: {
          flag: 'no_data',
          description: '',
          distance: 0,
        },
      },
      isLeaveModalVisible: false,
      isPageLeaveConfirmed: false,
      targetLeaveRef: '',
    }
  },
  methods: {
    /*		...mapMutations(['setSelectedMarker']),*/
    ...mapActions(['setSelectedRequest']),
    PreviewFinishedReport() {
      this.setSelectedRequest(this.updatedReport)
      this.isPageLeaveConfirmed = true
      this.$router.push('submit-report-preview')
    },
    closeLeavePageConfirmModal() {
      this.isLeaveModalVisible = false
    },
    PageLeaveAccepted() {
      this.isPageLeaveConfirmed = true
      this.$router.push(this.targetLeaveRef)
    },
    PageLeaveCanceled() {
      this.isPageLeaveConfirmed = false
      this.targetLeaveRef = ''
    },
    GoBack() {
      this.$router.go(-1)
    },
    AddressValidation(value) {
      return value.length >= 2
    },
  },
  computed: {
    ...mapGetters(['getSelectedLocationRequest']),
    saveButtDisabled() {
      if (this.$route.params.previewUpdating) {
        return false
      } else {
        return (
          this.updatedReport.city?.length < 2 ||
          this.updatedReport.address?.length < 2 ||
          !this.updatedReport.reports ||
          this.isEqual2(this.getSelectedLocationRequest, this.updatedReport)
        )
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isEqual2(this.getSelectedLocationRequest, this.updatedReport))
      next()
    if (this.isPageLeaveConfirmed) next()
    else {
      this.isLeaveModalVisible = true
      this.targetLeaveRef = to.fullPath
      next(false)
    }
  },
  created() {
    if (this.getSelectedLocationRequest)
      this.updatedReport = JSON.parse(
        JSON.stringify(this.getSelectedLocationRequest),
      )
    if (!this.getSelectedLocationRequest.reports)
      this.updatedReport.reports = { ...this.defaultReport }
  },
}
</script>

<style scoped></style>

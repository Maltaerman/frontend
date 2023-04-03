<template>
  <div class="overflow-y-auto-custom h-full p-6 comp:p-9">
    <div class="title">{{ $t('OrganizationChangeLog.title') }}</div>

    <div
      class="my-3 flex flex-col gap-2.5 comp:flex-row comp:gap-3"
      data-search-inputs-group
    >
      <input-search
        v-model="query"
        class="w-full shrink grow comp:max-w-[400px]"
        :placeholder="$t('OrganizationChangeLog.searchPlaceholder')"
      />
      <drop-down-select
        v-model="selectedAidWorker"
        class="w-full shrink grow comp:max-w-[320px]"
        :options="aidWorkerDropSuggestion"
      />
      <VueDatePicker
        v-model="dateInterval"
        auto-apply
        class="w-full min-w-[260px] text-h3"
        close-on-auto-apply
        :enable-time-picker="false"
        input-class-name="date-input-org-change-history"
        :locale="$i18n.locale"
        :max-date="new Date()"
        placeholder="Date"
        :range="true"
      />
    </div>
    <div class="mb-6 flex justify-end">
      <Button1
        class="w-full min-w-[120px] comp:w-min"
        @click="getOrganizationChangeLog"
      >
        {{ $t('general.search') }}
      </Button1>
    </div>
    <organization-change-log-list
      :logs="logs"
      @record-visibility-toggle="toggleRecordVisibility"
    />
  </div>
</template>

<script>
//TODO datetime picker style
import VueDatePicker from '@vuepic/vue-datepicker'
import { mapActions, mapGetters } from 'vuex'

import api from '../../../http_client/index.js'
import StoreEvents from '../../../store/storeEventSystem.js'
import Button1 from '../../Buttons/Button_1.vue'
import DropDownSelect from '../../Inputs/DropDownSelect.vue'
import InputSearch from '../../Inputs/InputSearch.vue'

import OrganizationChangeLogList from './OrganizationChangeLogList.vue'

export default {
  name: 'OrganizationChangeHistory',
  components: {
    Button1,
    VueDatePicker,
    OrganizationChangeLogList,
    DropDownSelect,
    InputSearch,
  },
  data() {
    return {
      logs: [],
      selectedAidWorker: undefined,
      aidWorkerDropSuggestion: [],
      dateInterval: null,
      query: '',
    }
  },

  computed: {
    ...mapGetters({
      userOrg: 'getUserOrganization',
      getUser: 'getUser',
    }),
  },
  watch: {
    userOrg() {
      this.updateWorkerSuggestion()
    },
  },
  beforeMount() {
    StoreEvents.subscribe(
      StoreEvents.events.onOrganizationChangeLogUpdate,
      this.onChangeLogsUpdate,
    )
    this.updateWorkerSuggestion()
    this.getOrganizationChangeLog()
  },
  beforeUnmount() {
    StoreEvents.unsubscribe(
      StoreEvents.events.onOrganizationChangeLogUpdate,
      this.onChangeLogsUpdate,
    )
  },
  methods: {
    ...mapActions({
      //dates in seconds
      GetOrganizationChangeLog: 'GetOrganizationChangeLog',
    }),
    updateWorkerSuggestion() {
      this.aidWorkerDropSuggestion = []
      let unselectedWorker = {
        text: this.$t('OrganizationChangeLog.worker'),
        item: {
          id: undefined,
        },
      }
      this.selectedAidWorker = unselectedWorker
      this.aidWorkerDropSuggestion.push(unselectedWorker)
      if (!this.userOrg || !this.userOrg.participants) return
      this.userOrg.participants.forEach((el) => {
        if (el.email_confirmed)
          this.aidWorkerDropSuggestion.push({
            text: el['username'],
            item: {
              ...el,
            },
          })
      })
    },
    getOrganizationChangeLog() {
      let payload = {
        organization_id: this.getUser.organization_model.id,
      }
      if (this.query.length >= 3) payload['query'] = this.query
      if (this.selectedAidWorker.item.id)
        payload['admin_id'] = this.selectedAidWorker.item.id
      let interval = this.getIntervalPayload(this.dateInterval)
      if (interval) payload = { ...payload, ...interval }
      else payload['date_max'] = Math.round(Date.now() / 1000)
      this.GetOrganizationChangeLog(payload)
    },
    onChangeLogsUpdate(data) {
      if (data instanceof Error) {
        this.$toast(this.$t('general.errorMessage'))
        return
      } else {
        this.logs = data
      }
    },
    getIntervalPayload(dateRange) {
      let datePayload = {}
      if (!dateRange) datePayload = dateRange
      else {
        let from = new Date(dateRange[0])
        from.setHours(0)
        from.setMinutes(0)
        datePayload['date_min'] = Math.round(from.getTime() / 1000)
        let to = new Date(dateRange[1])
        to.setHours(23)
        to.setMinutes(59)
        to.setSeconds(59)
        datePayload['date_max'] = Math.round(to.getTime() / 1000)
      }
      return datePayload
    },
    async toggleRecordVisibility(id) {
      await api.changelogs
        .locationChangelogVisibilityToggle(id)
        .then((res) => {
          let log = this.logs.find((x) => x.id === res.data.id)
          if (log) log.hidden = res.data.hidden
        })
        .catch(() => {
          this.$toast.error(this.$t('general.errorMessage'))
        })
    },
  },
}
</script>

<style>
.date-input-org-change-history {
  height: 100%;
}
.dp__input_wrap {
  height: 40px;
}
</style>

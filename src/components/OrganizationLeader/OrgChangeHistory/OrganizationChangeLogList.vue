<template>
  <div>
    <organization-change-log-item
      v-for="item in sortedChangedLogs"
      :key="`item${item[0].id}`"
      :logs="item"
      @record-visibility-toggle="toggleVisibility"
    />
  </div>
</template>

<!-- eslint-disable vue/require-default-prop -->
<script>
import OrganizationChangeLogItem from './OrganizationChangeLogItem.vue'

export default {
  name: 'OrganizationChangeLogList',
  components: { OrganizationChangeLogItem },
  props: {
    logs: Array,
  },
  emits: ['record-visibility-toggle'],
  data() {
    return {
      sortedChangedLogs: [],
    }
  },
  watch: {
    logs() {
      this.sortChangedLogs()
    },
  },
  methods: {
    sortChangedLogs() {
      // TODO fix it, they must be sorted by data, from earlier to latest, not reverse()
      // eslint-disable-next-line vue/no-mutating-props
      const result = this.logs.reverse().reduce((dates, log) => {
        const date = log.created_at.split('T')[0]
        // eslint-disable-next-line no-param-reassign
        if (!dates[date]) dates[date] = []
        dates[date].push(log)
        return dates
      }, {})
      this.sortedChangedLogs = result
    },
    toggleVisibility(id) {
      this.$emit('record-visibility-toggle', id)
    },
  },
}
</script>

<style scoped></style>

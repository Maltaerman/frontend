<template>
  <div>
    <organization-change-log-item
      v-for="item in sortedChangedLogs"
      :logs="item"
      :key="`item${item[0].id}`"
      @record-visibility-toggle="toggleVisibility"
    />
  </div>
</template>

<script>
import OrganizationChangeLogItem from "./OrganizationChangeLogItem.vue";
export default {
  name: "OrganizationChangeLogList",
  emits: ["record-visibility-toggle"],
  components: { OrganizationChangeLogItem },
  props: {
    logs: Array,
  },
  data() {
    return {
      sortedChangedLogs: [],
    };
  },
  methods: {
    sortChangedLogs() {
      //TODO fix it, they must be sorted by data, from earlier to latest, not reverse()
      let result = this.logs.reverse().reduce((dates, log) => {
        let date = log.created_at.split("T")[0];
        if (!dates[date]) dates[date] = [];
        dates[date].push(log);
        return dates;
      }, {});
      this.sortedChangedLogs = result;
    },
    toggleVisibility(id) {
      this.$emit("record-visibility-toggle", id);
    },
  },
  watch: {
    logs(newVal) {
      this.sortChangedLogs();
    },
  },
};
</script>

<style scoped></style>

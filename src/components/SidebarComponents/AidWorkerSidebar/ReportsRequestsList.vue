<template>
  <div
    ref="viewport"
    class="p-6"
  >
    <div v-if="unreviewedMarkers.length > 0">
      <ReportRequestListItem
        v-for="item in unreviewedMarkers"
        :key="`request${item.id}`"
        item-usage-tab-name="requestsList"
        :location-request="item"
        @add-to-my-list="OnAddToMyList"
      />
    </div>
    <div
      v-else
      class="mt-6 text-center text-h3 text-gray-c-800"
    >
      {{ $t('aidWorkerSideBar.allListEmpty') }}
    </div>
    <div
      v-if="pageMax < 0"
      ref="scrollObserver"
      class="relative h-[80px]"
    >
      <Loader v-show="isLoaderVisible" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Loader from '../../Loader.vue'

import ReportRequestListItem from './ReportRequestListItem.vue'

export default {
  name: 'ReportsRequestsList',
  components: {
    ReportRequestListItem,
    Loader,
  },
  props: {
    unreviewedMarkers: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    page: {
      type: Number,
      default: 0,
    },
    pageMax: {
      type: Number,
      default: -1,
    },
    isLoaderVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['next-page', 'add-to-my-list'],
  data() {
    return {
      /* unreviewedMarkers: [],
      page: 0,
      pageMax: -1,
      isLoaderVisible : false */
    }
  },
  computed: {
    ...mapGetters(['isAuth']),
  },
  mounted() {
    const options = {
      threshold: 0,
    }
    const callback = (entries) => {
      if (
        entries[0].isIntersecting
        && !this.isLoaderVisible
        && this.pageMax < 0
      ) {
        this.GetNextPage()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.scrollObserver)
  },
  methods: {
    GetNextPage() {
      this.$emit('next-page')
    },
    OnAddToMyList(req) {
      this.$emit('add-to-my-list', req)
    },
  },
}
</script>

<style scoped></style>

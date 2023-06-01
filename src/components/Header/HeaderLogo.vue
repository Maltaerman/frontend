<template>
	<div class="h-full w-fit">
		<router-link v-if="!isAuth" class="h-full w-auto block" to="/">
			<img class="h-full w-auto" src="/logo/Logo.svg">
		</router-link>
		<div v-else class="h-full">
			<router-link class="hidden comp:flex comp:flex-nowrap comp:items-center comp:gap-[18px]" to="/">
				<img src="/logo/Logo-mini.svg">
				<div>
					<div class="flex flex-nowrap gap-1.5">
						<img :src="currentUserIconLink">
						<p class="text-b3 font-semibold whitespace-normal">{{ getUser.username }}</p>
					</div>
					<div class="text-b3 text-gray-500 mt-0.5">
						{{ getUser.organization_model?.name ?? "" }}
					</div>
				</div>
			</router-link>
			<button class="h-full comp:hidden w-10 py-0.5" @click="showMenu">
				<img class="h-full " src="/menu-burger.svg">
			</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

import userRoles from '../mixins/userRoles.js'

export default {
	name: 'HeaderLogo',
	mixins: [userRoles],
	emits: ['menu'],
  computed: {
    ...mapGetters({
      isAuth: 'isAuth',
      getUser: 'getUser',
      getRole: 'getRole'
    }),
    isDefaultLogo() {
      return !this.isAuth
    },
    currentUserIconLink() {
      switch (this.getRole) {
        case this.userRoles.platformAdmin:
          return '/userIcons/platform-adm.svg'
        case this.userRoles.organizationAdmin:
          return '/userIcons/Org-leader.svg'
        case this.userRoles.aidWorker:
        default:
          return '//userIcons/User.svg'
      }
    },
  },
  methods: {
		showMenu() {
			this.$emit('menu')
		}
	},
}
</script>

<style scoped>

</style>
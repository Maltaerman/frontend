<template>
  <header
    class="w-full mobile:h-[62px] tablet:h-[62px] comp:h-[74px] mobile:px-4 mobile:py-2.5 tablet:px-4 tablet:py-2.5 comp:px-6 comp:py-0 sticky mobile:top-0 bg-white flex items-center gap-3 mobile:justify-between shadow-cs2 z-[1000]"
  >
    <div class="w-min h-full place-content-center hidden mobile:grid">
      <div class="w-6 h-5 py-1" @click="toggleMenu">
        <div class="bg-black w-full h-0.5 rounded-xl"></div>
        <div class="bg-black w-full h-0.5 rounded-xl my-1"></div>
        <div class="bg-black w-full h-0.5 rounded-xl"></div>
      </div>
    </div>
    <div
      class="hidden absolute top-[62px] left-0 mobile:h-[calc(100vh-62px)] w-full bg-black/30"
      :class="{
        'mobile:block': isMenuVisibleOnMobile,
        'mobile:hidden': !isMenuVisibleOnMobile,
      }"
      @click="toggleMenu"
    ></div>

    <div
      class="flex flex-nowrap h-full justify-between bg-white grow mobile:flex-col mobile:absolute mobile:h-[calc(100vh-62px)] mobile:top-[62px] mobile:w-[300px] mobile:shadow-inner mobile:justify-start mobile:gap-3 mobile:transition-[left] mobile:duration-200"
      :class="{
        'mobile:left-0': isMenuVisibleOnMobile,
        'mobile:left-[-300px]': !isMenuVisibleOnMobile,
      }"
    >
      <div
        class="cursor-pointer h-min my-auto mobile:my-0 mobile:h-[76px] mobile:p-4 mobile:shadow-cs2 mobile:grid mobile:content-center"
        @click="goToMain"
      >
        <div v-if="isAuth" class="flex text-h4 items-center">
          <img
            class="mobile:h-6 tablet:h-6 h-10 w-auto mr-4 mobile:hidden"
            src="/src/assets/Logo_2.svg"
          />
          <img
            class="h-6 w-auto mobile:block hidden mr-3.5"
            :src="currentUserIconLink"
          />
          <div>
            <p class="font-semibold">
              <img
                class="h-4 w-auto inline mobile:hidden"
                :src="currentUserIconLink"
              />
              {{ userName }}
            </p>
            <p class="text-gray-c-500">
              {{ userOrganization }}
            </p>
          </div>
        </div>
        <div v-else>
          <img
            alt=""
            class="block mobile:h-6 tablet:h-6 comp:h-10 w-auto"
            src="/src/assets/Logo.svg"
          />
        </div>
      </div>

      <div
        class="flex mobile:flex-col font-medium mobile:font-semibold text-blue-c-500 comp:p-2 text-h3"
      >
        <LocalizationDropDown
          id="langDrop"
          class="w-[150px] mobile:order-3 mobile:px-4 mobile:w-full h-full mobile:h-[58px]"
        />

        <div
          v-if="isAuth"
          class="flex items-center gap-x-6 mobile:gap-x-1 ml-7 mobile:ml-0 mobile:flex-col-reverse"
        >
          <div
            id="settings"
            class="menu-item menu-item-mobile"
            @click="showSettingModal"
          >
            <svg
              class="mobile:fill-gray-c-500 fill-blue-c-500 h-6 w-auto block"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8.49298 2.68377C8.62909 2.27543 9.01123 2 9.44166 2H10.5586C10.9891 2 11.3712 2.27543 11.5073 2.68377L11.9228 3.93035L12.0614 4.34601L12.4609 4.52593C12.8311 4.69266 13.1817 4.89601 13.5078 5.13149L13.8637 5.3884L14.2937 5.30041L15.5826 5.03664C16.0043 4.95035 16.4339 5.14358 16.6491 5.51634L17.2076 6.48366L17.968 6.04466L17.2076 6.48366C17.4228 6.85642 17.3753 7.32508 17.0898 7.64713L16.2169 8.6315L15.9265 8.95897L15.97 9.39448C15.9899 9.59333 16.0001 9.79532 16.0001 10C16.0001 10.2047 15.9899 10.4067 15.97 10.6055L15.9265 11.041L16.2169 11.3685L17.0898 12.3529C17.3753 12.6749 17.4228 13.1436 17.2076 13.5163L16.6491 14.4837C16.4339 14.8564 16.0043 15.0497 15.5826 14.9634L14.2937 14.6996L13.8637 14.6116L13.5078 14.8685C13.1817 15.104 12.8311 15.3073 12.4609 15.4741L12.0614 15.654L11.9228 16.0696L11.5073 17.3162C11.3712 17.7246 10.9891 18 10.5586 18H9.44166C9.01123 18 8.62909 17.7246 8.49298 17.3162L8.07745 16.0696L7.9389 15.654L7.5394 15.4741C7.16916 15.3073 6.81864 15.104 6.49247 14.8685L6.13662 14.6116L5.70664 14.6996L4.41769 14.9634L4.61817 15.9431L4.41769 14.9634C3.996 15.0496 3.5664 14.8564 3.35118 14.4837L2.7927 13.5163C2.57749 13.1436 2.62495 12.6749 2.91052 12.3529L3.78341 11.3685L4.0738 11.041L4.03025 10.6055C4.01036 10.4067 4.00015 10.2047 4.00015 10C4.00015 9.79532 4.01036 9.59333 4.03025 9.39448L4.0738 8.95897L3.78341 8.6315L2.91052 7.64713C2.62495 7.32508 2.57749 6.85642 2.7927 6.48366L3.35118 5.51634C3.5664 5.14358 3.996 4.95035 4.41769 5.03664L5.70664 5.30041L6.13662 5.3884L6.49247 5.13149C6.81864 4.89601 7.16917 4.69266 7.5394 4.52593L7.9389 4.34601L8.07745 3.93035L8.49298 2.68377ZM9.44166 0C8.15037 0 7.00396 0.82629 6.59561 2.05132L6.31317 2.89864C6.10116 3.00891 5.89475 3.12837 5.69448 3.25647L4.81865 3.07725C3.55358 2.81837 2.26478 3.39805 1.61913 4.51634L1.06065 5.48366C0.415006 6.60195 0.557386 8.00792 1.41412 8.97407L2.00795 9.64374C2.00277 9.76191 2.00015 9.88068 2.00015 10C2.00015 10.1193 2.00277 10.2381 2.00795 10.3563L1.41412 11.0259C0.557385 11.9921 0.415005 13.398 1.06065 14.5163L1.61913 15.4837C2.26478 16.6019 3.55357 17.1816 4.81865 16.9228L5.69448 16.7435C5.89475 16.8716 6.10116 16.9911 6.31317 17.1014L6.59561 17.9487C7.00396 19.1737 8.15037 20 9.44166 20H10.5586C11.8499 20 12.9963 19.1737 13.4047 17.9487L13.6871 17.1014C13.8991 16.9911 14.1055 16.8716 14.3058 16.7435L15.1816 16.9228C16.4467 17.1816 17.7355 16.602 18.3812 15.4837L18.9396 14.5163C19.5853 13.3981 19.4429 11.9921 18.5862 11.0259L17.9923 10.3563C17.9975 10.2381 18.0001 10.1193 18.0001 10C18.0001 9.88068 17.9975 9.76191 17.9923 9.64374L18.5862 8.97407C19.4429 8.00792 19.5853 6.60195 18.9396 5.48366L18.3812 4.51634C17.7355 3.39805 16.4467 2.81837 15.1816 3.07725L14.3058 3.25647C14.1055 3.12837 13.8991 3.00891 13.6871 2.89864L13.4047 2.05132C12.9963 0.82629 11.8499 0 10.5586 0L9.44166 0ZM10.0001 6C7.79099 6 6.00013 7.79086 6.00013 10C6.00013 12.2091 7.79099 14 10.0001 14C12.2093 14 14.0001 12.2091 14.0001 10C14.0001 7.79086 12.2093 6 10.0001 6ZM8.00013 10C8.00013 8.89543 8.89556 8 10.0001 8C11.1047 8 12.0001 8.89543 12.0001 10C12.0001 11.1046 11.1047 12 10.0001 12C8.89556 12 8.00013 11.1046 8.00013 10Z"
                fill-rule="evenodd"
              />
            </svg>
            <p class="h-min hidden mobile:block mobile:grow">
              {{ $t('header.settings') }}
            </p>
          </div>

          <div
            class="menu-item menu-item-mobile relative"
            @click="goToRequests"
          >
            <div
              v-if="RequestsCount > 0"
              class="absolute bg-red-c-500 rounded-[32px] py-0.5 px-1 font-semibold text-b3 text-white top-[-15px] right-[-5px] h-6 min-w-[22px] w-min text-center mobile:static mobile:order-3"
            >
              {{ RequestsCount }}
            </div>
            <svg
              class="h-6 w-auto"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="mobile:fill-gray-c-500 fill-blue-c-500"
                clip-rule="evenodd"
                d="M9.9931 7.17581C9.45934 7.52724 9.00618 8.03052 8.49257 8.67669C8.21101 9.03092 7.68763 9.096 7.32357 8.82205C6.9595 8.5481 6.89262 8.03887 7.17417 7.68464C7.70222 7.0203 8.29072 6.33865 9.05904 5.83278C9.85145 5.31106 10.7961 5 12 5C14.9228 5 17 6.95808 17 8.8346C17 10.5196 15.7383 12.2862 12.8334 13.6309V15.1351C12.8334 15.5829 12.4603 15.9459 12 15.9459C11.5398 15.9459 11.1667 15.5829 11.1667 15.1351V13.1081V12.5747L11.6702 12.3635C14.657 11.1109 15.3333 9.6736 15.3333 8.8346C15.3333 8.09274 14.2689 6.62162 12 6.62162C11.1206 6.62162 10.5028 6.84023 9.9931 7.17581ZM12 17.9811C12.4603 17.9811 12.8334 18.3441 12.8334 18.7919V19.1892C12.8334 19.637 12.4603 20 12 20C11.5398 20 11.1667 19.637 11.1667 19.1892V18.7919C11.1667 18.3441 11.5398 17.9811 12 17.9811Z"
                fill-rule="evenodd"
              />
              <rect
                class="mobile:stroke-gray-c-500 stroke-blue-c-500"
                height="22"
                rx="7"
                stroke-width="2"
                width="22"
                x="1"
                y="1"
              />
            </svg>
            <p class="h-min hidden mobile:block mobile:grow">
              {{ $t('header.requests') }}
            </p>
          </div>

          <div
            v-if="isPlatformAdmin"
            class="org-menu-item"
            @click="goToOrgList"
          >
            <div>
              <svg
                class="h-4 ml-1 w-auto fill-gray-c-500"
                fill="none"
                height="12"
                viewBox="0 0 14 12"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1ZM5 0C4.44772 0 4 0.447715 4 1C4 1.55228 4.44772 2 5 2H13C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0H5ZM5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H13C13.5523 7 14 6.55228 14 6C14 5.44772 13.5523 5 13 5H5ZM4 11C4 10.4477 4.44772 10 5 10H13C13.5523 10 14 10.4477 14 11C14 11.5523 13.5523 12 13 12H5C4.44772 12 4 11.5523 4 11ZM1 7C1.55228 7 2 6.55228 2 6C2 5.44772 1.55228 5 1 5C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7ZM2 11C2 11.5523 1.55228 12 1 12C0.447715 12 0 11.5523 0 11C0 10.4477 0.447715 10 1 10C1.55228 10 2 10.4477 2 11Z"
                  fill-rule="evenodd"
                />
              </svg>

              <!--									<img src="/src/assets/Organizations/List.svg" class="h-4 ml-1 w-auto">-->
            </div>
            <p class="h-min hidden mobile:block">
              {{ $t('dashboard.organizations') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-nowrap gap-3">
      <div v-if="isPlatformAdmin" class="h-min font-medium text-gray-c-600">
        <router-link to="/main">
          <button
            class="px-3 py-2 rounded-l-lg border"
            :class="{
              'border-blue-c-500 bg-blue-c-500 text-white': !isAdminPage,
              'border-gray-c-300': isAdminPage,
            }"
          >
            <svg
              class="mobile:inline hidden"
              :class="{
                'fill-white': !isAdminPage,
                'fill-gray-c-600': isAdminPage,
              }"
              height="20"
              viewBox="0 0 20 20"
              width="20"
            >
              <path
                clip-rule="evenodd"
                d="M7.58471 0.188765C7.84548 0.376716 8 0.678564 8 1.00001V17C8 17.4304 7.72457 17.8126 7.31623 17.9487L1.31623 19.9487C1.01128 20.0503 0.676058 19.9992 0.41529 19.8113C0.154521 19.6233 0 19.3215 0 19V3.00001C0 2.56958 0.27543 2.18744 0.683772 2.05132L6.68377 0.051324C6.98872 -0.0503253 7.32394 0.000813857 7.58471 0.188765ZM2 3.72077V17.6126L6 16.2792V2.38743L2 3.72077Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M19.5847 0.188765C19.8455 0.376716 20 0.678564 20 1.00001V17C20 17.4304 19.7246 17.8126 19.3162 17.9487L13.3162 19.9487C13.0113 20.0503 12.6761 19.9992 12.4153 19.8113C12.1545 19.6233 12 19.3215 12 19V3.00001C12 2.56958 12.2754 2.18744 12.6838 2.05132L18.6838 0.051324C18.9887 -0.0503253 19.3239 0.000813857 19.5847 0.188765ZM14 3.72077V17.6126L18 16.2792V2.38743L14 3.72077Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M6.41529 0.188765C6.15452 0.376716 6 0.678564 6 1.00001V17C6 17.4304 6.27543 17.8126 6.68377 17.9487L12.6838 19.9487C12.9887 20.0503 13.3239 19.9992 13.5847 19.8113C13.8455 19.6233 14 19.3215 14 19V3.00001C14 2.56958 13.7246 2.18744 13.3162 2.05132L7.31623 0.051324C7.01128 -0.0503253 6.67606 0.000813857 6.41529 0.188765ZM12 3.72077V17.6126L8 16.2792V2.38743L12 3.72077Z"
                fill-rule="evenodd"
              />
            </svg>

            <span class="mobile:hidden">
              {{ $t('header.map') }}
            </span>
          </button>
        </router-link>
        <router-link to="/admin/organizations">
          <button
            class="px-3 py-2 rounded-r-lg border"
            :class="{
              'border-blue-c-500 bg-blue-c-500 text-white': isAdminPage,
              'border-gray-c-300': !isAdminPage,
            }"
          >
            <svg
              class="mobile:inline hidden"
              :class="{
                'fill-white': isAdminPage,
                'fill-gray-c-600': !isAdminPage,
              }"
              height="20"
              viewBox="0 0 20 20"
              width="20"
            >
              <path
                clip-rule="evenodd"
                d="M0 2C0 0.895432 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V19C20 19.5523 19.5523 20 19 20H1C0.447715 20 0 19.5523 0 19V2ZM18 2L2 2V18H18V2Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M4 5C4.55228 5 5 4.55228 5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M7 5C7.55228 5 8 4.55228 8 4C8 3.44772 7.55228 3 7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44771 3 9 3.44772 9 4C9 4.55228 9.44771 5 10 5Z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M0 7C0 6.44772 0.447715 6 1 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H1C0.447715 8 0 7.55228 0 7Z"
                fill-rule="evenodd"
              />
            </svg>

            <span class="mobile:hidden">
              {{ $t('header.dashboard') }}
            </span>
          </button>
        </router-link>
      </div>

      <button-text-1
        v-if="!isAuth"
        id="loginButton"
        class="my-auto"
        role="link"
        @click="showLogInModal"
      >
        {{ $t('header.login') }}
      </button-text-1>
      <button-text1
        v-if="isAuth"
        id="logoutButton"
        class="h-min my-auto"
        @click="logOut"
      >
        {{ $t('header.logout') }}
      </button-text1>
    </div>
    <!--			#region Modals-->
    <LoginModal :close-func="closeModal" :is-modal-visible="isLoginModal">
    </LoginModal>
    <UserSetting
      v-if="isAuth"
      :is-setting-visible="isSettingModal"
      @close="closeModal"
    />
    <!--			#endregion -->
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import ButtonText1 from './Buttons/Button_text_1.vue'
import LocalizationDropDown from './Other/LocalizationDropDown.vue'
import UserSetting from './UserSetting.vue'
import userRoles from './mixins/userRoles.js'

export default {
  name: 'AppHeader',
  components: {
    LocalizationDropDown,
    ButtonText1,
    UserSetting,
  },
  mixins: [userRoles],
  props: {
    isShowSetting: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['settingClose'],
  data: function () {
    return {
      isLoginModal: false,
      isSettingModal: false,
      isMenuVisibleOnMobile: false,
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'isAuth',
      'getRole',
      'getUserOrganization',
      'RequestsCount',
    ]),
    userName() {
      return this.getUser.username
    },
    userOrganization() {
      return this.getUser.organization_model.name
    },
    isAdminPage() {
      return this.$route.matched.some((x) => x.path == '/admin')
    },
    currentUserIconLink() {
      switch (this.getRole) {
        case this.userRoles.aidWorker:
          return '/userIcons/User.svg'
        case this.userRoles.platformAdmin:
          return '/userIcons/platform-adm.svg'
        default:
          return '/userIcons/User.svg'
      }
    },
    isPlatformAdmin() {
      return this.isAuth && this.getRole === this.userRoles.platformAdmin
    },
  },
  watch: {
    isShowSetting: function (newValue) {
      if (newValue === true) this.showSettingModal()
    },
  },
  methods: {
    ...mapMutations(['setLoggedUserInfo', 'setLoggedUserCredentials']),
    ...mapActions(['getRequestsCount']),

    showLogInModal() {
      this.isMenuVisibleOnMobile = false
      this.isLoginModal = true
    },
    showSettingModal() {
      this.isMenuVisibleOnMobile = false
      this.isSettingModal = true
    },
    closeModal() {
      this.isLoginModal = false
      this.isSettingModal = false
      this.$emit('settingClose', false)
    },
    logOut() {
      this.setLoggedUserInfo(null)
      this.setLoggedUserCredentials(null)
      this.isMenuVisibleOnMobile = false
      this.$router.push('/')
    },
    goToMain() {
      this.isMenuVisibleOnMobile = false
      this.$router.push('/')
    },
    goToRequests() {
      this.getRequestsCount()
      this.isMenuVisibleOnMobile = false
      this.$router.push('/main/requests')
    },
    goToOrgList() {
      this.isMenuVisibleOnMobile = false
      this.$router.push('/admin/organizations')
    },
    toggleMenu() {
      this.closeModal()
      this.isMenuVisibleOnMobile = !this.isMenuVisibleOnMobile
    },
  },
}
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.menu-item {
  @apply hover: bg-blue-c-200 rounded-lg p-1 cursor-pointer flex gap-4 items-center;
}

.menu-item-mobile {
  @apply mobile: rounded-none mobile:px-4 mobile:h-[58px] mobile:w-full mobile:text-gray-c-500;
}

.org-menu-item {
  @apply hover: bg-blue-c-200 rounded-lg p-1 cursor-pointer mobile:flex hidden gap-4 items-center mobile:rounded-none mobile:px-4 mobile:h-[58px] mobile:w-full mobile:text-gray-c-500;
}
</style>

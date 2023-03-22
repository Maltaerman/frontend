import { createRouter, createWebHistory } from 'vue-router'

import PasswordReset from '@/components/components/Authorization/PasswordReset.vue'
import UserRegistration from '@/components/components/Authorization/UserRegistration.vue'
import MainScreen from '@/components/components/MainScreen.vue'
import MainPlatformAdministration from '@/components/components/PlatformAdministration/MainPlatformAdministration.vue'
import OrganizationsList from '@/components/components/PlatformAdministration/OrganizationsList.vue'
import OrganizationProfile from '@/components/components/PlatformAdministration/shared/OrganizationProfile.vue'
import ReportTools from '@/components/components/SidebarComponents/AidWorkerSidebar/ReportTools.vue'
import RequestCompletedPreview from '@/components/components/SidebarComponents/AidWorkerSidebar/RequestCompletedPreview.vue'
import SideBarAidWorker from '@/components/components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue'
import SideBar from '@/components/components/SidebarComponents/UserSidebar/SideBar.vue'
import Test from '@/components/components/Test.vue'
import WelcomeScreen from '@/components/components/WelcomeScreen/WelcomeScreen.vue'
import userRoles from '@/components/components/mixins/userRoles.js'
import { store } from '@/components/store/mainStore.js'

const mainRouter = [
  {
    path: '/',
    alias: ['/welcome'],
    component: WelcomeScreen,
  },
  {
    path: '/main',
    component: MainScreen,
    children: [
      {
        path: 'overview',
        alias: [''],
        component: SideBar,
      },
      {
        path: 'requests',
        component: SideBarAidWorker,
        meta: { requiresAuth: true },
      },
      {
        path: 'submit-report',
        component: ReportTools,
        meta: {
          requiresAuth: true,
          selectedRequest: true,
        },
      },
      {
        path: 'submit-report-preview',
        component: RequestCompletedPreview,
        meta: {
          requiresAuth: true,
          selectedRequest: true,
        },
      },
    ],
  },
  {
    path: '/admin',
    component: MainPlatformAdministration,
    meta: {
      requiresAuth: true,
      minRole: userRoles.data().userRoles.organizationAdmin,
    },
    children: [
      {
        path: 'organizations',
        alias: [''],
        component: OrganizationsList,
        meta: {
          requiresAuth: true,
          minRole: userRoles.data().userRoles.platformAdmin,
        },
      },
      {
        path: 'organization-profile/:id',
        component: OrganizationProfile,
        meta: {
          requiresAuth: true,
          minRole: userRoles.data().userRoles.organizationAdmin,
        },
      },
    ],
  },
  {
    path: '/registration',
    component: UserRegistration,
  },
  {
    path: '/password-reset',
    component: PasswordReset,
  },
  { path: '/test', component: Test },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      return {
        path: '/main',
      }
    },
  },
]
export const Router = createRouter({
  routes: mainRouter,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
})

Router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    return {
      path: '/main',
    }
  }
  if (to.meta.selectedRequest && !store.getters.getSelectedLocationRequest) {
    if (store.getters.isAuth) {
      return '/main/requests'
    } else return '/main'
  }
  //FIXME
  /*if(to.meta.minRole && !userRoles.methods.isRoleHaveAccess(store.getters.getRole))
    return {
      path : "/"
    }*/
})

import { createRouter, createWebHistory } from 'vue-router'

import PasswordReset from '../components/Authorization/PasswordReset.vue'
import UserRegistration from '../components/Authorization/UserRegistration.vue'
import MainScreen from '../components/MainScreen.vue'
import MainPlatformAdministration from '../components/PlatformAdministration/MainPlatformAdministration.vue'
import OrganizationsList from '../components/PlatformAdministration/OrganizationsList.vue'
import OrganizationProfile from '../components/PlatformAdministration/shared/OrganizationProfile.vue'
import ReportTools from '../components/SidebarComponents/AidWorkerSidebar/ReportTools.vue'
import RequestCompletedPreview from '../components/SidebarComponents/AidWorkerSidebar/RequestCompletedPreview.vue'
import SideBarAidWorker from '../components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue'
import SideBar from '../components/SidebarComponents/UserSidebar/SideBar.vue'
import Test from '../components/Test.vue'
import WelcomeScreen from '../components/WelcomeScreen/WelcomeScreen.vue'
import userRoles from '../components/mixins/userRoles.js'
import { store } from '../store/mainStore.js'

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
    redirect: (to) => {
      return {
        path: '/main',
      }
    },
  },
]
export const Router = createRouter({
  routes: mainRouter,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

Router.beforeEach((to, form) => {
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

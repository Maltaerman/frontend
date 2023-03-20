const WelcomeScreen = () => import('../components/WelcomeScreen/WelcomeScreen.vue')
const MainScreen = () => import('../components/MainScreen.vue')
const Test = () => import('../components/Test.vue')
const SideBar = () => import('../components/SidebarComponents/UserSidebar/SideBar.vue')
const SideBarAidWorker = () => import('../components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue')
const ReportTools = () => import('../components/SidebarComponents/AidWorkerSidebar/ReportTools.vue')
const RequestCompletedPreview = () => import('../components/SidebarComponents/AidWorkerSidebar/RequestCompletedPreview.vue')
const MainPlatformAdministration = () => import('../components/PlatformAdministration/MainPlatformAdministration.vue')
const OrganizationsList = () => import('../components/PlatformAdministration/OrganizationsList.vue')
const OrganizationProfile = () => import('../components/PlatformAdministration/shared/OrganizationProfile.vue')
const UserRegistration = () => import('../components/Authorization/UserRegistration.vue')
const PasswordReset = () => import('../components/Authorization/PasswordReset.vue')
const UserRolesList = () => import('../components/PlatformAdministration/Roles/UserRolesList.vue')
const RoleCreating = () => import('../components/PlatformAdministration/Roles/RoleCreating.vue')
const OrganizationRegistration = () => import('../components/OrganizationLeader/OrgRegistration.vue')

import { createRouter, createWebHistory } from 'vue-router'

import orgLeaderRouter from '../components/OrganizationLeader/OrgLeaderRouter.js'
import userRoles from '../components/mixins/userRoles.js'
import { store } from '../store/mainStore.js'

const mainRouter = [
  {
    path: '/',
    alias: ['/welcome'],
    component: WelcomeScreen,
  },
  {
    path: '/main/:lat?/:lng?',
    component: MainScreen,
    children: [
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
      {
        path: 'overview',
        alias: [''],
        component: SideBar,
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
      {
        path: 'roles',
        component: UserRolesList,
        meta: {
          requiresAuth: true,
          minRole: userRoles.data().userRoles.organizationAdmin,
        },
      },
      {
        path: 'roles/create',
        component: RoleCreating,
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
    path: '/organization-registration',
    component: OrganizationRegistration,
  },
  {
    path: '/password-reset',
    component: PasswordReset,
  },
  orgLeaderRouter,
  { path: '/test', component: Test },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => {
      console.log('Path not match redirect')
      console.log(to)
      return {
        path: '/main',
      }
    },
  },
]
export const Router = createRouter({
  history: createWebHistory(),
  routes: mainRouter,
  scrollBehavior: function (to, _from, savedPosition) {
    return savedPosition || { top: 0, left: 0 }
  },
})

Router.beforeEach((to, form) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    console.log('None authorize')
    return {
      path: '/main',
    }
  }
  if (to.meta.selectedRequest && !store.getters.getSelectedLocationRequest) {
    console.log('Selected request not exist')
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

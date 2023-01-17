const WelcomeScreen = () => import("../components/WelcomeScreen/WelcomeScreen.vue");
const MainScreen = () => import("../components/MainScreen.vue");
const Test = () => import("../components/Test.vue");
const SideBar = () => import("../components/SidebarComponents/UserSidebar/SideBar.vue");
const SideBarAidWorker = () => import("../components/SidebarComponents/AidWorkerSidebar/SideBarAidWorker.vue");
const ReportTools = () => import("../components/SidebarComponents/AidWorkerSidebar/ReportTools.vue");
const RequestCompletedPreview = () => import("../components/SidebarComponents/AidWorkerSidebar/RequestCompletedPreview.vue");
const MainPlatformAdministration = () => import("../components/PlatformAdministration/MainPlatformAdministration.vue");
const OrganizationsList = () => import("../components/PlatformAdministration/OrganizationsList.vue");
const OrganizationProfile = () => import("../components/PlatformAdministration/OrganizationProfile.vue");
const UserRegistration = () => import("../components/Authorization/UserRegistration.vue");
const PasswordReset = () => import("../components/Authorization/PasswordReset.vue");


import {store} from "../store/mainStore.js";
import {createRouter, createWebHistory} from "vue-router";
import userRoles from "../components/mixins/userRoles.js";



const mainRouter = [
  {
    path : "/",
    alias :["/welcome"],
    component : WelcomeScreen
  },
  {
    path : "/main",
    component : MainScreen,
    children : [
      {
        path : "overview",
        alias : [""],
        component : SideBar
      },
      {
        path : "requests",
        component : SideBarAidWorker,
        meta : {requiresAuth : true}
      },
      {
        path: "submit-report",
        component : ReportTools,
        meta : {
          requiresAuth  : true,
          selectedRequest : true
        }
      },
      {
        path: "submit-report-preview",
        component : RequestCompletedPreview,
        meta : {
          requiresAuth  : true,
          selectedRequest : true
        }
      },
    ]
  },
  {
    path : "/admin",
    component: MainPlatformAdministration,
    meta : {
      requiresAuth  : true,
      minRole : userRoles.data().userRoles.organizationAdmin
    },
    children: [
      {
        path: "organizations",
        alias: [""],
        component: OrganizationsList,
        meta : {
          requiresAuth  : true,
          minRole : userRoles.data().userRoles.platformAdmin
        },
      },
      {
        path : "organization-profile/:id",
        component : OrganizationProfile,
        meta : {
          requiresAuth  : true,
          minRole : userRoles.data().userRoles.organizationAdmin
        },
      }
    ]
  },
  {
    path: "/registration",
    component: UserRegistration
  },
  {
    path: "/password-reset",
    component: PasswordReset
  },
  { path : "/test", component : Test},
  {
    path: '/:pathMatch(.*)*',
    redirect: to=>{
      return {
        path : "/main"
      }
    }
  },
]
export const Router = createRouter({
  history : createWebHistory(),
  routes : mainRouter,
  scrollBehavior : function (to, _from, savedPosition) {
    return savedPosition || { top: 0, left: 0 }
  }
});

Router.beforeEach((to, form)=>{
  if(to.meta.requiresAuth && !store.getters.isAuth){
    return {
      path : "/main"
    }
  }
  if(to.meta.selectedRequest && !store.getters.getSelectedLocationRequest){
    if(store.getters.isAuth){
      return "/main/requests";
    }
    else
      return "/main";
  }
  //FIXME
  /*if(to.meta.minRole && !userRoles.methods.isRoleHaveAccess(store.getters.getRole))
    return {
      path : "/"
    }*/
})


const OrgLeaderMainComponent = () => import('./MainOrgLeader.vue')
const OrgProfile = () => import('./OrganizationProfile/OrganizationProfile.vue')
const OrgChangeHistory = () =>
  import('./OrgChangeHistory/OrganizationChangeHistory.vue')
const OrgSettings = () => import('./OrgSettings/OrganizationSettings.vue')

export default {
  path: '/organization',
  component: OrgLeaderMainComponent,
  children: [
    {
      path: 'profile',
      alias: [''],
      component: OrgProfile,
    },
    {
      path: 'change-history',
      component: OrgChangeHistory,
    },
    {
      path: 'settings',
      component: OrgSettings,
    },
  ],
}

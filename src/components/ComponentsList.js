import ButtonsList from './Buttons/ButtonComponuntsList.js'
import SVGComponentsList from './ComponentsSVG/SVGComponentsList.js'
import InputsComponentsList from './Inputs/InputsComponentsList.js'
import Loader from './Loader.vue'
import MapComponentsList from './MapComponents/MapComponentsList.js'
import modalList from './Modals/ModalList.js'
import OtherComponentsList from './Other/OtherComponentsList.js'
import PlatformAdminComponentsList from './PlatformAdministration/PlatformAdminComponentsList.js'
import AidWorkerComponentsList from './SidebarComponents/AidWorkerSidebar/AidWorkerComponentsList.js'
import UserSidebarComponentsList from './SidebarComponents/UserSidebar/UserSidebarComponentsList.js'
import WelcomeScreenComponentsList from './WelcomeScreen/WelcomeScreenComponentsList.js'

import AuthComponentList from '@/components/Authorization/AuthComponentList.js'

export default [
  ...AuthComponentList,
  ...ButtonsList,
  ...SVGComponentsList,
  ...InputsComponentsList,
  ...MapComponentsList,
  ...modalList,
  ...OtherComponentsList,
  ...PlatformAdminComponentsList,
  ...AidWorkerComponentsList,
  ...UserSidebarComponentsList,
  ...WelcomeScreenComponentsList,
  Loader,
]

import AuthComponentList from './Authorization/AuthComponentList.js'
import BaseLoader from './BaseLoader.vue'
import ButtonsList from './Buttons/ButtonComponuntsList.js'
import SVGComponentsList from './ComponentsSVG/SVGComponentsList.js'
import InputsComponentsList from './Inputs/InputsComponentsList.js'
import MapComponentsList from './MapComponents/MapComponentsList.js'
import modalList from './Modals/ModalList.js'
import OtherComponentsList from './Other/OtherComponentsList.js'
import PlatformAdminComponentsList from './PlatformAdministration/PlatformAdminComponentsList.js'
import AidWorkerComponentsList from './SidebarComponents/AidWorkerSidebar/AidWorkerComponentsList.js'
import UserSidebarComponentsList from './SidebarComponents/UserSidebar/UserSidebarComponentsList.js'
import WelcomeScreenComponentsList from './WelcomeScreen/WelcomeScreenComponentsList.js'

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
  BaseLoader,
]

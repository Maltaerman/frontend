import AuthComponentList from './Authorization/AuthComponentList'
import ButtonsList from './Buttons/ButtonComponuntsList'
import SVGComponentsList from './ComponentsSVG/SVGComponentsList'
import InputsComponentsList from './Inputs/InputsComponentsList'
import Loader from './Loader.vue'
import MapComponentsList from './MapComponents/MapComponentsList'
import modalList from './Modals/ModalList'
import OtherComponentsList from './Other/OtherComponentsList'
import PlatformAdminComponentsList from './PlatformAdministration/PlatformAdminComponentsList'
import AidWorkerComponentsList from './SidebarComponents/AidWorkerSidebar/AidWorkerComponentsList'
import UserSidebarComponentsList from './SidebarComponents/UserSidebar/UserSidebarComponentsList'
import WelcomeScreenComponentsList from './WelcomeScreen/WelcomeScreenComponentsList'

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

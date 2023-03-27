import ButtonsList from '@/components/Buttons/ButtonComponuntsList.js'
import SVGComponentsList from '@/components/ComponentsSVG/SVGComponentsList.js'
import InputsComponentsList from '@/components/Inputs/InputsComponentsList.js'
import Loader from '@/components/Loader.vue'
import MapComponentsList from '@/components/MapComponents/MapComponentsList.js'
import modalList from '@/components/Modals/ModalList.js'
import OtherComponentsList from '@/components/Other/OtherComponentsList.js'
import PlatformAdminComponentsList from '@/components/PlatformAdministration/PlatformAdminComponentsList.js'
import AidWorkerComponentsList from '@/components/SidebarComponents/AidWorkerSidebar/AidWorkerComponentsList.js'
import UserSidebarComponentsList from '@/components/SidebarComponents/UserSidebar/UserSidebarComponentsList.js'
import WelcomeScreenComponentsList from '@/components/WelcomeScreen/WelcomeScreenComponentsList.js'

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

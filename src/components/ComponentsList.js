import ButtonsList from "./Buttons/ButtonComponuntsList.js";
import InputsComponentsList from "./Inputs/InputsComponentsList.js";
import modalList from "./Modals/ModalList.js";
import AuthComponentList from "./Authorization/AuthComponentList.js";
import SVGComponentsList from "./ComponentsSVG/SVGComponentsList.js";
import MapComponentsList from "./MapComponents/MapComponentsList.js";
import OtherComponentsList from "./Other/OtherComponentsList.js";
import PlatformAdminComponentsList from "./PlatformAdministration/PlatformAdminComponentsList.js";
import AidWorkerComponentsList from "./SidebarComponents/AidWorkerSidebar/AidWorkerComponentsList.js";
import UserSidebarComponentsList from "./SidebarComponents/UserSidebar/UserSidebarComponentsList.js";
import WelcomeScreenComponentsList from "./WelcomeScreen/WelcomeScreenComponentsList.js";
import Loader from "./Loader.vue";

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
  Loader
]

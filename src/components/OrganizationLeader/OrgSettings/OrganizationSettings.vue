<template>
  <div class="px-4 py-6 comp:p-9">
    <div class="flex flex-col gap-6 comp:flex-row comp:justify-between">
      <div class="grow">
        <div class="title">{{ $t("dashboard.settings") }}</div>
        <div class="subTitle mb-6 mt-6 comp:mt-9">
          {{ $t("organizationProfile.organizationSettings") }}
        </div>
        <OrgEditInputsGroup
          class="comp:max-w-[480px] w-full"
          v-model="organization"
        />
      </div>
      <div>
        <Button1
          class="w-full h-min comp:w-min flex flex-nowrap items-center justify-center gap-2"
          @click="editUserOrganization"
          :disabled="!isOrgSaveButtonAvailable"
        >
          <SVG_save class="fill-white inline-block h-[18px] w-auto" />
          <p>
            {{ $t("general.save") }}
          </p>
        </Button1>
      </div>
    </div>
    <div class="mt-[48px]">
      <div class="subTitle">{{ $t("userSettings.personalSettings") }}</div>
      <div class="py-6 flex flex-col gap-6 comp:flex-row comp:justify-between">
        <div class="grow comp:max-w-[480px]">
          <ChangeMailNameInputs
            v-if="userEditUI.currentState === userEditUI.name"
            v-model="user"
            @validation="setIsNameMailValid"
          />
          <ChangePassInputs
            v-else-if="userEditUI.currentState === userEditUI.pass"
            v-model="userPassUpdate"
            @validation="setIsPassValid"
          />
          <Button2 @click="UserEditUISwitch" class="w-full comp:w-[200px] mt-6">
            {{ userSettingsButtonText }}
          </Button2>
        </div>
        <div>
          <Button1
            @click="saveUserDataButtonAction"
            :disabled="!isUserSaveButtonAvailable"
            class="w-full h-min comp:w-min flex flex-nowrap items-center justify-center gap-2"
          >
            <SVG_save class="fill-white inline-block h-[18px] w-auto" />
            <p>
              {{ $t("general.save") }}
            </p>
          </Button1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrgEditInputsGroup from "../Shared/OrgEditInputsGroup.vue";
import { mapActions, mapGetters } from "vuex";
import Button1 from "../../Buttons/Button_1.vue";
import SVG_save from "../../ComponentsSVG/Icons/SVG_save.vue";
import ChangeMailNameInputs from "../../User/ChangeMailNameInputs.vue";
import ChangePassInputs from "../../User/ChangePassInputs.vue";
import Button2 from "../../Buttons/Button_2.vue";
import StoreEvents from "../../../store/storeEventSystem.js";
import { popScopeId } from "vue";
export default {
  name: "OrganizationSettings",
  components: {
    Button2,
    ChangePassInputs,
    ChangeMailNameInputs,
    SVG_save,
    Button1,
    OrgEditInputsGroup,
  },
  data() {
    return {
      organization: undefined,
      user: undefined,
      isNameMailValid: false,
      userPassUpdate: {
        old_password: "",
        new_password: "",
        isAllValid: false,
      },
      userEditUI: {
        currentState: "name",
        pass: "pass",
        name: "name",
      },
    };
  },
  methods: {
    ...mapActions({
      editOrganization: "EditUserOrganization",
      editUser: "EditUserData",
      editUserPass: "updateUserPassword",
    }),
    UserEditUISwitch() {
      switch (this.userEditUI.currentState) {
        case this.userEditUI.name:
          this.userEditUI.currentState = this.userEditUI.pass;
          break;
        case this.userEditUI.pass:
          this.userEditUI.currentState = this.userEditUI.name;
          break;
        default:
          break;
      }
    },
    onOgrEdit(data) {
      this.$toast.clear();
      if (data instanceof Error)
        this.$toast.error(this.$t("OrganizationSettings.OrgEditError"));
      else this.$toast.success(this.$t("OrganizationSettings.OrgEditSuccess"));
    },
    editUserOrganization() {
      let payload = {
        id: this.organization.id,
        name: this.organization.name,
      };
      if (this.organization.name !== this.userOrganization.name)
        payload["name"] = this.organization.name;
      if (this.organization.website !== this.userOrganization.website)
        payload["website"] = this.organization.website;
      if (this.organization.description !== this.userOrganization.description)
        payload["description"] = this.organization.description;
      if (this.organization.address !== this.userOrganization.address)
        payload["address"] = this.organization.address;
      if (this.organization.logo !== this.userOrganization.logo)
        payload["logo"] = this.organization.logo;
      this.editOrganization(payload);
    },
    setIsPassValid(value) {
      this.userPassUpdate.isAllValid = value;
    },
    setIsNameMailValid(value) {
      let isNameChanged = this.userData.username !== this.user.username;
      let isMailChanged = this.userData.email !== this.user.email;
      this.isNameMailValid = (isNameChanged || isMailChanged) && value;
    },
    updateUserData() {
      if (!this.isNameMailValid) return;
      this.$toast.wait(this.$t("userSettings.inProcess"));
      let payload = {};
      //if(this.userData.username !== this.user.username)
      payload["username"] = this.user.username;
      //if(this.userData.email !== this.user.email)
      payload["email"] = this.user.email;
      payload["full_name"] = "";
      console.log(payload);
      this.editUser(payload);
    },
    onUserDataUpdate(data) {
      this.$toast.clear();
      if (data instanceof Error) {
        this.$toast.error(this.$t("userSettings.userDataUpdatedErrorMess"));
        return;
      } else {
        this.user = { ...this.userData };
        this.$toast.success(this.$t("userSettings.userDataUpdatedSuccessMess"));
      }
    },
    updatesUserPass() {
      this.$toast.wait(this.$t("userSettings.inProcess"));
      let payload = {
        old_password: this.userPassUpdate.old_password,
        new_password: this.userPassUpdate.new_password,
      };
      this.editUserPass(payload);
    },
    onUserPassUpdate(data) {
      this.$toast.clear(data);
      if (data instanceof Error) {
        this.$toast.error(this.$t("userSettings.userDataUpdatedErrorMess"));
        return;
      } else {
        this.user = { ...this.userData };
        this.userPassUpdate.new_password = "";
        this.userPassUpdate.old_password = "";
        this.$toast.success(this.$t("userSettings.userDataUpdatedSuccessMess"));
      }
    },
    saveUserDataButtonAction() {
      switch (this.userEditUI.currentState) {
        case this.userEditUI.name:
          this.updateUserData();
          break;
        case this.userEditUI.pass:
          this.updatesUserPass();
          break;
        default:
          break;
      }
    },
  },
  computed: {
    ...mapGetters({
      userOrganization: "getUserOrganization",
      userData: "getUser",
    }),
    userSettingsButtonText() {
      let text = "Error";
      switch (this.userEditUI.currentState) {
        case this.userEditUI.name:
          text = this.$t("userSettings.change-password");
          break;
        case this.userEditUI.pass:
          text = this.$t("general.back");
          break;
        default:
          break;
      }
      return text;
    },
    isUserSaveButtonAvailable() {
      let res = false;
      switch (this.userEditUI.currentState) {
        case this.userEditUI.name:
          res = this.isNameMailValid;
          break;
        case this.userEditUI.pass:
          res = this.userPassUpdate.isAllValid;
          break;
        default:
          break;
      }
      return res;
    },
    isOrgSaveButtonAvailable() {
      if (!this.userOrganization) return false;
      let isChanged = [
        this.organization.name !== this.userOrganization.name,
        this.organization.website !== this.userOrganization.website,
        this.organization.description !== this.userOrganization.description,
        this.organization.address !== this.userOrganization.address,
        this.organization.logo !== this.userOrganization.logo,
      ];
      return isChanged.some((x) => x == true);
    },
  },
  watch: {
    userOrganization(newVal) {
      if (newVal) this.organization = { ...newVal };
      else this.organization = {};
    },
  },
  beforeMount() {
    this.organization = { ...this.userOrganization };
    this.user = { ...this.userData };
    StoreEvents.subscribe(
      StoreEvents.events.onUserOrganizationUpdate,
      this.onOgrEdit
    );
    StoreEvents.subscribe(
      StoreEvents.events.onUserDataUpdate,
      this.onUserDataUpdate
    );
    StoreEvents.subscribe(
      StoreEvents.events.onUserPasswordUpdate,
      this.onUserPassUpdate
    );
  },
  beforeUnmount() {
    StoreEvents.unsubscribe(
      StoreEvents.events.onUserOrganizationUpdate,
      this.onOgrEdit
    );
    StoreEvents.unsubscribe(
      StoreEvents.events.onUserDataUpdate,
      this.onUserDataUpdate
    );
    StoreEvents.unsubscribe(
      StoreEvents.events.onUserPasswordUpdate,
      this.onUserPassUpdate
    );
  },
};
</script>

<style scoped></style>

<!--
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzc3Nzk1NDksInN1YiI6Imtvc2h5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJ1c2Vyczpjb25maXJtIl19.MKxf5tRdZ8gcihMnGNXt8A6TZ6KtnUI-zUgmXTuAi9s-->

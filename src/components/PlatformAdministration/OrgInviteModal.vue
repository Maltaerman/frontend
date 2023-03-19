<template>
  <ModalTemplate
    class-list="grid place-items-center p-4"
    :is-modal-visible="isVisible"
    :close-func="closeThisModal"
    :isHideOnClick="true"
  >
    <div
      class="bg-white w-[480px] mx-auto mobile:w-full relative p-6 rounded-lg"
      @click.stop
    >
      <img
        src="/src/assets/close.svg"
        class="absolute top-6 right-6 cursor-pointer"
        @click="closeThisModal"
      />
      <div class="text-h2 text-center font-semibold">
        {{ $t("dashboard.addOrganization") }}
      </div>
      <div class="flex flex-col gap-4 mt-4 mb-6">
        <input1
          inp-id="inpRegNewOrgName"
          v-model.trim="organization.name"
          :model-value="organization.name"
          :placeholder="$t('dashboard.namePlaceholder')"
          :label="$t('dashboard.organizationName')"
        />
        <input1
          inp-id="inpRegNewOrgSite"
          v-model.trim="organization.website"
          :model-value="organization.website"
          placeholder="organization.com"
          :label="$t('dashboard.website')"
        />
        <input1
          v-model.trim="organization.address"
          :model-value="organization.address"
          :label="$t('dashboard.address')"
          :placeholder="$t('dashboard.address')"
        />
        <div class="text-h4 text-gray-c-500 text-left font-normal">
          {{ $t("general.email") }}
        </div>
        <input1
          v-for="(item, index) in organization.emails"
          :placeholder="$t('general.email')"
          validationType="mail"
          v-model.trim="organization.emails[index]"
          :model-value="organization.emails[index]"
          :validation-message="$t('validations.mailNotValid')"
        />

        <ButtonText1
          class="group p-2 font-medium w-min flex flex-nowrap items-center"
          v-if="isAddEmailVisible"
          @click="addEmail"
        >
          <svg
            class="inline-block mr-2"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="#2E60B2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44771 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z"
            />
          </svg>
          <p class="whitespace-nowrap">
            {{ $t("organizationProfile.addMore") }}
          </p>
        </ButtonText1>
      </div>
      <button-1
        class="w-full"
        :disabled="!isAllDataValid"
        @click.stop="InviteOrganization"
      >
        {{ $t("general.save") }}
      </button-1>
      <Loader v-if="isLoaderVisible" />
    </div>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from "../Modals/ModalTemplate.vue";
import Input1 from "../Inputs/Input-1.vue";
import StringFormatter from "../mixins/StringFormatter";
import ButtonText1 from "../Buttons/Button_text_1.vue";
import regex from "../mixins/regex.js";
import api from "../../http_client/index.js";
export default {
  inheritAttrs: false,
  emits: ["addOrganization"],
  mixins: [StringFormatter, regex],
  components: {
    ButtonText1,
    ModalTemplate,
    Input1,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    closeCreateOrgModal: {
      type: Function,
    },
    isLoaderVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      organization: {
        name: "",
        website: "",
        address: "",
        emails: [""],
      },
    };
  },
  methods: {
    closeThisModal() {
      console.log("joł");
      this.closeCreateOrgModal();
    },
    onAddOrganization() {
      console.log("adding from modal");
      this.$emit("addOrganization", this.organization);
    },
    addEmail() {
      if (this.organization.emails.length < 3)
        this.organization.emails.push("");
    },
    async InviteOrganization() {
      if (!this.isAllDataValid) return;
      await api.organizations
        .inviteOrganization(this.organization)
        .then((res) => {
          console.log(res);
          this.onAddOrganization();
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    isAllDataValid() {
      return (
        this.organization.name.length > 2 &&
        this.organization.website.length > 2 &&
        this.organization.address.length > 2 &&
        this.organization.emails.every((x) => this.isMail(x))
      );
    },
    isAddEmailVisible() {
      return this.organization.emails.length < 3;
    },
    //TODO remove from here
  },
  watch: {
    isVisible(newVal) {
      this.organization = {
        name: "",
        website: "",
        address: "",
        emails: [""],
      };
    },
  },
};
</script>

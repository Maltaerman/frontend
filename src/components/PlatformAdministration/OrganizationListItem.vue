<template>
  <div
    @click.stop="goToOrgProfile"
    @mouseleave="HideMenu"
    class="h-[182px] min-w-[240px] mobile:w-full border border-gray-c-300 rounded-lg p-4 cursor-pointer relative group"
  >
    <div
      @click.stop="ShowMenu"
      class="absolute top-2 right-4 cursor-pointer px-1 py-3 rounded-full hover:bg-blue-c-200"
    >
      <img src="/src/assets/dots.svg" />
    </div>

    <div
      @click.stop
      ref="menu"
      class="p-2 rounded-lg shadow-cs3 absolute top-1 right-6 w-[230px] h-[84px] font-semibold bg-white"
      :class="{
        hidden: !isMenuVisible,
        absolute: isMenuVisible,
      }"
    >
      <button
        class="p-1 text-h3 text-blue-c-500 cursor-pointer hover:bg-blue-c-100 w-full text-left"
        @click.stop="goToOrgProfile"
      >
        {{ $t("general.details") }}
      </button>
      <button
        class="p-1 text-h3 text-red-c-500 cursor-pointer hover:bg-blue-c-100 w-full text-left"
        @click="removeOrg"
      >
        {{ $t("general.delete") }}
      </button>
    </div>

    <svg
      class="block h-[60px] w-[60px] mx-auto mt-6"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" class="fill-blue-c-100" />
      <path
        fill-rule="evenodd"
        class="fill-blue-c-300 group-hover:fill-blue-c-400"
        clip-rule="evenodd"
        d="M39.3311 23.5204C37.3152 20.9221 33.2687 21.3578 31.8522 24.3258C31.1087 25.8836 28.8913 25.8836 28.1478 24.3258C26.7313 21.3578 22.6848 20.9221 20.6688 23.5204L20.2563 24.052C18.4843 26.336 18.7401 29.5931 20.8471 31.5724L30 40.1706L39.1528 31.5724C41.2598 29.5932 41.5157 26.336 39.7436 24.052L39.3311 23.5204ZM30 22.2112C32.6359 18.3426 38.4386 18.0198 41.438 21.8857L41.8505 22.4174C44.4657 25.7881 44.0881 30.595 40.9786 33.516L31.7085 42.2243C31.6997 42.2326 31.6908 42.241 31.6818 42.2495C31.5464 42.3768 31.3832 42.5302 31.2264 42.651C31.0413 42.7935 30.7634 42.9736 30.3851 43.0478C30.1308 43.0977 29.8692 43.0977 29.6148 43.0478C29.2365 42.9736 28.9586 42.7935 28.7735 42.651C28.6168 42.5302 28.4536 42.3768 28.3182 42.2495C28.3092 42.241 28.3002 42.2326 28.2915 42.2243L19.0213 33.516C15.9118 30.595 15.5342 25.7881 18.1495 22.4174L18.5619 21.8857C21.5613 18.0198 27.3641 18.3426 30 22.2112Z"
      />
    </svg>

    <div
      class="text-body-1 text-center font-semibold mt-4 mb-1 break-words group-hover:text-blue-c-500"
    >
      {{ organization.name }}
    </div>

    <div class="text-center text-b3 text-gray-c-500">
      {{ organization.site }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrganizationListItem",
  emits: ["remove"],
  props: {
    organization: {
      //required : true,
      type: Object,
    },
  },
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    ...mapActions(["setSelectedOrganization"]),
    ShowMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    HideMenu() {
      this.isMenuVisible = false;
    },
    goToOrgProfile() {
      //console.log("Go to org profile")
      this.setSelectedOrganization(this.organization);
      this.$router.push(`/admin/organization-profile/${this.organization.id}`);
    },
    removeOrg() {
      this.$emit("remove", this.organization);
    },
  },
};
</script>

<style scoped></style>

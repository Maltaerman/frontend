<template>
  <div class="px-4 py-6 comp:p-9 h-full overflow-y-auto relative">
    <div
      class="flex flex-nowrap gap-4 justify-between items-center"
      @click="GoToCreate"
    >
      <div class="title">{{ $t("Roles.Roles") }}</div>
      <Button1 class="h-min block flex flex-nowrap gap-2.5 items-center">
        <img class="block" src="/src/assets/plus.svg" />
        <p>{{ $t("Roles.CreateRole") }}</p>
      </Button1>
    </div>
    <div class="py-6 comp:py-9">
      <table class="w-full text-left">
        <thead class="bg-gray-c-100">
          <tr class="text-gray-c-400 font-semibold">
            <th class="p-4" colspan="4">
              {{ $t("Roles.Role") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="h-8 w-8 rounded-full bg-gray-c-100 flex justify-center items-center overflow-hidden"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-h3 font-semibold text-left">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
          </tr>

          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="h-8 w-8 rounded-full bg-gray-c-100 flex justify-center items-center overflow-hidden"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-h3 font-semibold text-left">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
          </tr>
          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="h-8 w-8 rounded-full bg-gray-c-100 flex justify-center items-center overflow-hidden"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-h3 font-semibold text-left">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="fill-blue-c-500 hover:fill-blue-c-300 cursor-pointer"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Button1 from "../../Buttons/Button_1.vue";
import SVG_Default_User from "../../ComponentsSVG/UserRolesSvg/SVG_Default_User.vue";
import SVG_Platform_Admin from "../../ComponentsSVG/UserRolesSvg/SVG_Platform_Admin.vue";
import SVG_edit from "../../ComponentsSVG/Icons/SVG_edit.vue";
import SVG_eye from "../../ComponentsSVG/Icons/SVG_eye.vue";
import Footer from "../../SidebarComponents/UserSidebar/Footer.vue";
export default {
  name: "UserRoles",
  components: {
    Footer,
    SVG_eye,
    SVG_edit,
    SVG_Platform_Admin,
    SVG_Default_User,
    Button1,
  },
  methods: {
    GoToCreate() {
      this.$router.push("roles/create");
    },
  },
};
</script>

<style scoped></style>

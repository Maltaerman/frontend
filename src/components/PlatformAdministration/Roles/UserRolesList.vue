<template>
  <div class="relative h-full overflow-y-auto px-4 py-6 comp:p-9">
    <div
      class="flex flex-nowrap items-center justify-between gap-4"
      @click="GoToCreate"
    >
      <div class="title">{{ $t('Roles.Roles') }}</div>
      <Button1 class="block flex h-min flex-nowrap items-center gap-2.5">
        <img class="block" src="/src/assets/plus.svg" />
        <p>{{ $t('Roles.CreateRole') }}</p>
      </Button1>
    </div>
    <div class="py-6 comp:py-9">
      <table class="w-full text-left">
        <thead class="bg-gray-c-100">
          <tr class="font-semibold text-gray-c-400">
            <th class="p-4" colspan="4">
              {{ $t('Roles.Role') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-c-100"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-left text-h3 font-semibold">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
                />
              </div>
            </td>
          </tr>

          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-c-100"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-left text-h3 font-semibold">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
                />
              </div>
            </td>
          </tr>
          <tr class="shadow-cs2">
            <td class="px-4 py-3.5">
              <div
                class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-c-100"
              >
                <SVG_Platform_Admin
                  class="block h-2/5 w-auto fill-gray-c-500"
                />
              </div>
            </td>
            <td class="w-full whitespace-nowrap">
              <div class="text-left text-h3 font-semibold">Platform admin</div>
              <div class="text-b3 text-gray-c-600">subtitle</div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_edit
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
                />
              </div>
            </td>
            <td class="px-2.5">
              <div>
                <SVG_eye
                  class="cursor-pointer fill-blue-c-500 hover:fill-blue-c-300"
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
import Button1 from '@/components/Buttons/Button_1.vue'
import SVG_edit from '@/components/ComponentsSVG/Icons/SVG_edit.vue'
import SVG_eye from '@/components/ComponentsSVG/Icons/SVG_eye.vue'
import SVG_Platform_Admin from '@/components/ComponentsSVG/UserRolesSvg/SVG_Platform_Admin.vue'
export default {
  name: 'UserRoles',
  components: {
    SVG_eye,
    SVG_edit,
    SVG_Platform_Admin,
    Button1,
  },
  methods: {
    GoToCreate() {
      this.$router.push('roles/create')
    },
  },
}
</script>

<style scoped></style>

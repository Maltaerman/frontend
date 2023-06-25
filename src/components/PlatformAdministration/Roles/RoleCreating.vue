<!-- eslint-disable max-len -->
<template>
  <div class="px-4 py-6 comp:p-9">
    <div>
      <router-link to="/admin/roles">
        <span class="text-body-1 cursor-pointer align-middle font-semibold">
          <svg
            class="mr-4 inline-block rotate-180 fill-gray-c-800"
            fill="none"
            height="14"
            viewBox="0 0 9 14"
            width="9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976312 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976317 1.31658 -0.0976317 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L8.41421 7L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071Z"
              fill-rule="evenodd"
            />
          </svg>
          {{ $t('Roles.Roles') }}
        </span>
      </router-link>
    </div>

    <div class="w-full max-w-[600px] py-6 comp:py-8">
      <div class="subTitle">
        {{ $t('Roles.CreateRole') }}
      </div>
      <Input1
        class="my-6"
        :label="$t('Roles.Title')"
      />
      <div>{{}}</div>
    </div>
  </div>
</template>

<script>
import Input1 from '../../Inputs/Input-1.vue'

export default {
  name: 'RoleCreating',
  components: { Input1 },
}
</script>

<style scoped></style>

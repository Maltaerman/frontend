<template>
  <div class="flex flex-col gap-6">
    <Input1
      v-model="modelValue.name"
      :label="$t('OrganizationRegistration.orgName')"
      :model-value="modelValue.name"
      :placeholder="$t('dashboard.organizationName')"
    />

    <Input1
      v-model="modelValue.website"
      :label="$t('OrganizationRegistration.site')"
      :model-value="modelValue.website"
      placeholder="https//:"
    />

    <Input1
      v-model="modelValue.address"
      :label="$t('dashboard.address')"
      :model-value="modelValue.address"
      :placeholder="$t('dashboard.orgAddress')"
    />

    <div data-org-desc>
      <div class="text-h4 text-gray-c-500">
        {{ $t('dashboard.orgDescription') }}
      </div>
      <resize-textarea
        ref="orgDesc"
        v-model="modelValue.description"
        class="text-area my-2 min-h-[144px]"
        :placeholder="$t('OrganizationRegistration.OrgDescPlaceholder')"
      />
      <div class="text-right text-h4 text-gray-c-500">
        {{ DescSymbolLimStr }}
      </div>
    </div>

    <div data-org-logo>
      <div class="text-h4 text-gray-c-500">
        {{ $t('organizationProfile.logo') }}
      </div>

      <div
        class="relative my-2 grid h-[160px] content-center justify-center rounded-xl border border-gray-c-300"
      >
        <div
          v-if="!logoImgSrc"
          class="grid h-[100px] w-[100px] content-center justify-center rounded-full bg-gray-200"
        >
          <div class="font-medium text-gray-c-500">Logo</div>
        </div>
        <img
          v-if="logoImgSrc"
          class="block h-full w-full object-contain"
          :src="logoImgSrc"
          title="Logo"
        />
        <SVG_basket_red
          v-if="logoImgSrc"
          class="absolute top-2 right-2 cursor-pointer"
          @click="ClearLogo"
        />
      </div>

      <input
        ref="fileInp"
        accept=".jpeg,.png,.jpg"
        class="hidden"
        type="file"
        @change.stop="onFileSelect"
      />

      <Button_2 class="w-full" @click="selectFile">
        {{ $t('organizationProfile.choseFile') }}
      </Button_2>
    </div>
  </div>
</template>

<script>
import Button_2 from '../../Buttons/Button_2.vue'
import Input1 from '../../Inputs/Input-1.vue'
export default {
  name: 'OrgEditInputsGroup',
  components: {
    Input1,
    Button_2,
  },
  props: {
    modelValue: Object,
  },
  data() {
    return {
      descSymbolLim: 300,
      logoImgSrc: undefined,
    }
  },
  computed: {
    DescSymbolLimStr() {
      if (!this.modelValue || !this.modelValue.description)
        return `0/${this.descSymbolLim} ${this.$t('general.symbols')}`
      else
        return `${this.modelValue.description.length}/${
          this.descSymbolLim
        } ${this.$t('general.symbols')}`
    },
  },
  watch: {
    'modelValue.description'(newVal, oldVal) {
      if (!newVal) return
      if (newVal.length > this.descSymbolLim) {
        this.modelValue.description = oldVal
        this.$refs.orgDesc.textareaContent = oldVal
      }
    },
    'modelValue.logo'(newVal) {
      //console.log(newVal)

      this.logoImgSrc = undefined
      if (!newVal) return
      let reader = new FileReader()

      reader.onload = (event) => {
        this.logoImgSrc = event.target.result
      }

      reader.readAsDataURL(newVal)
    },
  },
  methods: {
    selectFile() {
      this.$refs.fileInp.click()
    },
    onFileSelect(e) {
      //this.$emit("update:logo", e.target.files[0])
      this.modelValue.logo = e.target.files[0]
    },
    ClearLogo() {
      //this.$emit("update:logo", undefined)
      this.modelValue.logo = undefined
    },
  },
}
</script>

<style scoped></style>

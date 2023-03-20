<template>
  <div class="flex h-full flex-col">
    <Header class="h-[62px] shrink-0 grow-0 comp:h-[74px]" />
    <div class="shrink grow overflow-y-auto pt-[48px] pb-7">
      <div class="mx-auto w-full bg-white px-6 comp:w-[480px] comp:px-0">
        <div class="title mb-2 text-center">
          {{ $t('OrganizationRegistration.Welcome') }}
        </div>

        <div class="label mb-6 text-center">
          {{ $t('OrganizationRegistration.Info') }}
        </div>

        <!--				<div class="flex gap-2 justify-center">
					<div v-for="i in 2" class="border border-blue-c-500 h-2 w-2 rounded-xl"
							 :class="{'bg-blue-c-500' : stepNum == i}" @click="GoToStep(i)"/>
				</div>-->

        <div class="subTitle my-4 text-center">
          {{ $t('OrganizationRegistration.Step1') }}
        </div>

        <!--				<div data-step-1 v-if="stepNum==1">
					<div class="flex flex-col gap-6">
						<Input1 :label="$t('userRegistration.name')"
										:placeholder="$t('userRegistration.fullName')"
										validation-type="name"
										v-model="user.name"
										:model-value="user.name"
						/>
						<Input1 :label="$t('userRegistration.email')"
										:placeholder="$t('userRegistration.email')"
										validation-type="mail"
										v-model="user.mail"
										:model-value="user.mail"
						/>
						<InputPass :label="$t('userRegistration.password')"
											 :validation-message="$t('validations.passNotValid')"
											 v-model="user.pass"
											 :model-value="user.pass"
											 @validation="onPassValid"
						/>
						<InputPass :label="$t('userRegistration.newPassConf')"
											 :validation-message="$t('validations.passNotEquals')"
											 v-model="user.passConfirm"
											 :model-value="user.passConfirm"
											 :validation-func="isPassEquals"
											 ref="passConf"
						/>
					</div>

					<button1 class="w-full mt-10" @click="GoToStep(2)">
						{{$t("general.next")}}
					</button1>
				</div>-->

        <div>
          <OrgEditInputsGroup v-model="organization" />
          <div class="mt-9 flex flex-nowrap gap-6 comp:gap-2">
            <!--						<Button2 class="grow-[1]" @click="GoToStep(1)">
							{{$t("general.back")}}
						</Button2>-->
            <Button1
              class="grow-[2]"
              :disabled="!isOrgRegistrationEnabled"
              @click="organizationRegistration"
            >
              {{ $t('general.finish') }}
            </Button1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import {
  default as StoreEvents,
  default as StoreEventSystem,
} from '../../store/storeEventSystem.js'
import Button1 from '../Buttons/Button_1.vue'
import Header from '../Header.vue'

import OrgEditInputsGroup from './Shared/OrgEditInputsGroup.vue'

export default {
  name: 'OrgRegistration',
  components: {
    OrgEditInputsGroup,

    Button1,
    Header,
  },
  data() {
    return {
      stepNum: 1,
      organization: {
        name: '',
        website: '',
        address: '',
        description: '',
        logo: undefined,
      },
      /*			user : {
				name : "",
				mail : "",
				pass : "",
				passConfirm : ""
			},*/
      validation: {
        isPassValid: false,
        isPassEquals: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getUserOrganization: 'getUserOrganization',
    }),
    isOrgRegistrationEnabled() {
      return (
        this.organization.name.length > 2 &&
        this.organization.website.length > 4 &&
        this.organization.address.length > 2
      )
    },
  },
  watch: {
    'getUser.organization_model'() {
      this.checkIsOrgActive()
    },
  },

  beforeUnmount() {
    StoreEvents.unsubscribe(
      StoreEventSystem.events.onUserOrganizationUpdate,
      this.OnReg,
    )
  },
  beforeMount() {
    StoreEvents.subscribe(
      StoreEventSystem.events.onUserOrganizationUpdate,
      this.OnReg,
    )
    this.checkIsOrgActive()
    this.organization.name = this.getUser.organization_model.name
  },
  methods: {
    ...mapActions({
      setUserOrg: 'updateUserOrganizationModel',
      EditUserOrganization: 'EditUserOrganization',
    }),
    async organizationRegistration() {
      if (!this.isOrgRegistrationEnabled) return
      let payload = {
        id: this.getUser.organization_model.id,
        name: this.organization.name,
        website: this.organization.website,
        description: this.organization.description,
        address: this.organization.address,
      }
      this.EditUserOrganization(payload)
    },
    checkIsOrgActive() {
      if (
        this.user &&
        this.getUser.organization_model &&
        this.getUser.organization_model.activated
      )
        this.$router.push('/organization')
    },
    OnReg(data) {
      if (data instanceof Error) {
        this.$toast.error(this.$t('general.errorMessage'))
        return
      }
    },
  },
}
</script>

<style scoped></style>

<template>
    <ModalTemplate class-list="grid place-items-center p-4" :is-modal-visible="isVisible" :close-func="closeThisModal"
        :isHideOnClick="true">
        <div class="bg-white w-[480px] mx-auto mobile:w-full relative p-6 rounded-lg" @click.stop>
            <img src="/src/assets/close.svg" class="absolute top-6 right-6 cursor-pointer" @click="closeThisModal">
            <div class="text-h2 text-center font-semibold ">{{ $t('dashboard.addOrganization') }}</div>
            <div class="flex flex-col gap-4 mt-4 mb-6">
                <div>
                    <label for="inpRegNewOrgName" class="text-h4 text-gray-c-500">{{
                        $t('dashboard.organizationName')
                    }}</label>
                    <input1 inp-id="inpRegNewOrgName" v-model="organization.createOrgName" class="w-full mt-1"
                        :placeholder="$t('dashboard.namePlaceholder')" />
                </div>
                <div>
                    <label for="inpRegNewOrgSite" class="text-h4 text-gray-c-500">{{
                        $t('dashboard.website')
                    }}</label>
                    <input1 inp-id="inpRegNewOrgSite" v-model="organization.createOrgSite" class="w-full mt-1"
                        placeholder="organization.com" />
                </div>
            </div>
            <button-1 class="w-full" :disabled="isOrgCreateButtDisabled" @click.stop="addOrganization">
                {{ $t('general.save') }}
            </button-1>
            <Loader v-if="isLoaderVisible" />
        </div>
    </ModalTemplate>

</template>

<script>
import ModalTemplate from '../Modals/ModalTemplate.vue';
import Input1 from '../Inputs/Input-1.vue';
import StringFormatter from '../mixins/StringFormatter';
export default {
    inheritAttrs: false,
    emits: [
        "addOrganization"
    ],
    mixins: [StringFormatter],
    components: {
        ModalTemplate,
        Input1
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        closeCreateOrgModal: {
            type: Function
        },
        isLoaderVisible: {
            type: Boolean
        }
    },
    data() {
        return {
            organization: {
                createOrgName: "",
                createOrgSite: "",
            }
        }
    },
    computed: {
        isOrgCreateButtDisabled() {
            return this.TrimTurbo(this.organization.createOrgName).length < 3;
        }
    },
    methods: {
        closeThisModal() {
            console.log("joł")
            this.closeCreateOrgModal()
        },
        addOrganization() {
            console.log('adding from modal')
            this.$emit('addOrganization', this.organization)
        }
    },
}
</script>
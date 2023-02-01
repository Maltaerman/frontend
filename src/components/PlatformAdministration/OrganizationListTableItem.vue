<template>

    <tr class="h-[56px] " @mouseleave="HideMenu">
        <td class="flex max-content row pl-4 items-end pt-1">
            <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-5">
                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="flex-col">
                <div class="font-semibold text-base text-gray-c-800 truncate text-ellipsis overflow-hidden">{{ organization.name }}</div>
                <div class=" font-text-xs text-subtitle text-gray-c-600">{{ organization.place }}</div>
            </div>

        </td>
        <td class="text-right pr-4">{{ organization.workers || 64 }}</td>
        <td class="pl-4">
            <div class="flex flex-row bg-white rounded-lg max-w-max border px-2 py-0.5"
                :class="`${getOrganizationStatus().color} ${getOrganizationStatus().textColor}`">
                <div v-if="organization.status === organizationStatuses.DISABLED"
                    class="h-5 w-5 mr-1 top-0.5 relative inline-block  border-green-c-200">

                    <SVG_eye_crossed class="fill-green-c-500"></SVG_eye_crossed>
                </div>

                <span class="capitalize"> {{ organization.status || 'Disabled' }}</span>
            </div>
        </td>
        <td class="p-2 relative">
            <div @click.stop="ShowMenu"
                class="w-[25px] top-2 right-4 cursor-pointer px-1 py-3 rounded-full  absolute hover:bg-blue-c-200">
                <img src="/src/assets/dots.svg">
            </div>
            <div @click.stop ref="menu" class="p-2 rounded-lg shadow-cs3 absolute top-1 right-6
                            w-[230px] h-[84px] font-semibold bg-white" :class="{
                                'hidden': !isMenuVisible,
                                'absolute': isMenuVisible
                            }">
                <button class="p-1 text-h3 text-blue-c-500
				                    cursor-pointer hover:bg-blue-c-100 w-full text-left" @click.stop="goToOrgProfile">
                    {{ $t('general.details') }}
                </button>
                <button class="p-1 text-h3 text-red-c-500
			                        cursor-pointer hover:bg-blue-c-100 w-full text-left" @click="removeOrg">
                    {{ $t('general.delete') }}
                </button>
            </div>
        </td>
    </tr>

</template>

<script>
import dateFormatter from "../mixins/dateFormatter.js";
import SVG_building_condition from "../ComponentsSVG/SVG_building_condition.vue";
import SVG_eye_crossed from "../ComponentsSVG/SVG_eye_crossed.vue";
import dynamicContent from "../mixins/dynamicContent.js";
import reportItemFlags from "../mixins/reportItemFlags.js";

export default {
    name: 'OrganizationListTableItem',
    components: {
        SVG_building_condition,
        SVG_eye_crossed
    },
    mixins: [
        dateFormatter,
        dynamicContent,
        reportItemFlags
    ],
    props: {
        organization: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            isMenuVisible: false,
            organizationStatuses: {
                ACTIVE: 'active',
                PENDING: 'pending',
                DISABLED: 'disabled'
            }
        }
    },
    mounted() {
        console.log(this.organization)
    }, methods: {
        getOrganizationStatus() {
            const { status = "disabled" } = this.organization
            const { ACTIVE, PENDING, DISABLED } = this.organizationStatuses
            switch (status) {
                case ACTIVE:
                    return { staus: ACTIVE, color: 'border-green-c-200', textColor: 'text-green-c-500', }
                case PENDING:
                    return { staus: ACTIVE, color: 'border-gray-c-200', textColor: 'text-gray-c-500', }
                case DISABLED:
                    return { staus: ACTIVE, color: 'border-gray-c-300', textColor: 'text-gray-c-500', backgroundColor: 'fill-gray-c-200' }
                default:
                    break;
            }
        },
        ShowMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        HideMenu() {
            this.isMenuVisible = false;
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
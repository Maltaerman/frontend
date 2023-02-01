<template>
    <div>
        <table class="table-auto w-full overflow-x-scroll ">
            <thead>
                <tr class="text-left text-base font-medium text-gray-c-400 bg-gray-50 h-[56px] px-2">
                    <th class="w-1/3 text-base font-medium">Organization</th>
                    <th class="w-32 text-center text-base font-medium">Aid Workers</th>
                    <th class="text-base font-medium" colspan="2">Status</th>
                </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
                <OrganizationListTableItem v-for="(organization, index) in organizationsList" 
                    :key="`org${index}`"
                    :organization="{ ...organization, place: 'Kyiv, Ukraine', avatar }" 
                    />
            </tbody>
        </table>
    </div>
</template>

<script>

import OrganizationListTableItem from './OrganizationListTableItem.vue'
import avatar from "../../assets/Organizations/avatar.svg"
export default {
    name: "OrganizationListTable",
    components: {
        OrganizationListTableItem,
    },
    props: {
        organizationsList: {
            type: Array,
            default: []
        },
    },
    created () {
        console.log(this.organizationsList);
    },
    methods: {
        ShowMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        HideMenu() {
            this.isMenuVisible = false;
        },
        OnInputFocus(value) {
            this.isInputFocused = value;
        },
    },
}
</script>
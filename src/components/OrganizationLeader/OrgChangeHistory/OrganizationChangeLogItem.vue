<template>
	<div class="mb-6">
		<div class="bg-gray-c-100 py-2 px-6 w-full shadow-cs2">
			<p class="font-semibold text-black capitalize
			text-h2
			mobile:text-h3
			tablet:text-h3">
				{{getDate(logs[0].created_at)}}
			</p>
		</div>

		<div v-for="log in logs" class="py-4  flex gap-x-4 shadow-cs2 w-full" >
			<div class="flex flex-wrap comp:flex-nowrap comm:gap-9 w-full justify-between">
				<div class="text-gray-c-500 font-normal pt-1
						text-h3 align-middle
						mobile:text-h4
						tablet:text-h4
						comp:px-4">
					{{new Date(log.created_at).toTimeString().split(' ')[0]}}
				</div>
				<div class="grow shrink mobile:pr-6 w-full order-3 comp:order-2" >
					<div v-for="item in getChangedLogs(log)" class="my-2.5 font-semibold">
						<div class="flex flex-wrap gap-4 relative group cursor-default">
							<div class="flex gap-2" v-if="item.old_value">
								<p class="w-4 h-6">
									<SVG_status_list :icon='item.flag' :classList="getSVGColorClass(item.flag, item.old_value)"/>
								</p>
								<p class="grow my-auto uppercase
								text-h3
								mobile:text-h4
								tablet:text-h4" :class="getTextColorClass(item.flag, item.old_value)">
									{{GetStatusTranslation(item.old_value)}}
								</p>
							</div>
							<img src="/src/assets/change-arrow.svg" class="h-6 w-6" alt="arrow">
							<div class="flex gap-2">
								<p class="w-4 h-6">
									<SVG_status_list :icon='item.flag' :classList="getSVGColorClass(item.flag, item.new_value)"/>
								</p>
								<p class="grow my-auto uppercase text-base
								text-h3
								mobile:text-h4
								tablet:text-h4"
									 :class="getTextColorClass(item.flag, item.new_value)">
									{{GetStatusTranslation(item.new_value)}}
								</p>
							</div>
							<div class="tooltip">
								{{getTooltipText(item.flag)}}
							</div>
						</div>
						<Expander v-if="item.description" class="font-normal">
							{{item.description}}
						</Expander>
					</div>

					<router-link :to="getLocationOverviewRoute(log.location)" class="text-h3 mobile:text-h4
							tablet:text-h4 text-gray-c-500 font-semibold cursor-pointer">
						{{ log.user.username }}
						<span class="font-normal">
							{{$t("general.in")}}
						</span>
						{{ReportAddressFull(log.location)}}
					</router-link>

				</div>
				<div class="order-2 comp:order-3">
					<button class="group hide-button" @click="toggleRecordVisibility(log.id)">
						<div class="relative">
							<div class="w-0.5 bg-blue-c-500 h-full"></div>
							<SVG_eye class="hide-button-svg"/>
						</div>
<!--						<SVG_eye v-if="log.hidden" class="hide-button-svg"/>-->
						<div v-if="log.hidden" class="whitespace-nowrap hidden comp:block">
							{{$t("OrganizationChangeLog.showRecord")}}
						</div>

<!--						<SVG_eye_crossed v-if="!log.hidden" class="hide-button-svg"/>-->
						<div v-if="!log.hidden" class="whitespace-nowrap hidden comp:block">
							{{$t("OrganizationChangeLog.hideRecord")}}
						</div>

					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dateFormatter from "../../mixins/dateFormatter.js";
import dynamicContent from "../../mixins/dynamicContent.js";
import reportItemFlags from "../../mixins/reportItemFlags.js";
import SVG_eye from "../../ComponentsSVG/Icons/SVG_eye.vue";
import SVG_eye_crossed from "../../ComponentsSVG/Icons/SVG_eye_crossed.vue";
import Button_2 from "../../Buttons/Button_2.vue";

export default {
	name: "OrganizationChangeLogItem",
	emits : ["record-visibility-toggle"],
	components: {
		SVG_eye,
		Button_2,
		SVG_eye_crossed
	},
	mixins : [
		dynamicContent,
		reportItemFlags,
		dateFormatter
	],
	props : {
		logs : Array
	},
	methods : {
		getDate(strDate){
			return this.GetDayDateString(strDate).replace(' ', ", ");
		},
		getChangedLogs(log){
			let result = []
			if (!log.old_flags || Object.keys(log.old_flags).length<=0) {
				Object.keys(log.new_flags).forEach(flag=>{
					result.push({
						flag : flag,
						old_value : undefined,
						new_value : log.new_flags[flag].flag,
						description : log.new_flags.description
					})
				})
				return result;
			}

			Object.keys(log.old_flags).map((flag) => {
				if(log.old_flags[flag].flag !== log.new_flags[flag].flag) {
					result.push({
						flag : flag,
						old_value : log.old_flags[flag].flag,
						new_value : log.new_flags[flag].flag,
						description : ""
					})
				}

				if(log.old_flags[flag].description !==log.new_flags[flag].description){
					let el = result.find(el=>el.flag == flag)
					if(!el){
						result.push({
							flag : flag,
							old_value : log.old_flags[flag].flag,
							new_value : log.new_flags[flag].flag,
							description : log.new_flags[flag].description.length > 0 ?
								log.new_flags[flag].description : this.$t("reportTools.descriptionDeleted")
						})
					}
					else {
						el.description = log.new_flags[flag].description
					}
				}
			});
			return result;
		},
		toggleRecordVisibility(id){
			this.$emit("record-visibility-toggle", id);
		},
		getLocationOverviewRoute(log){
			let url = "/main/overview"
			if(!log)
				return url;
			if(log.id)
				url = `/main/overview?id=${log.id}`
			if(log.position)
				url += `&lat=${log.position.lat}&lng=${log.position.lng}`
			return url;
		}
	}
}
</script>

<style scoped>
	.hide-button{
		@apply
		hover:text-blue-c-400
		hover:border-blue-c-400
		disabled:text-gray-c-300
		disabled:border-gray-c-300
		active:text-blue-c-600
		active:border-blue-c-600
		flex flex-nowrap items-center gap-2
		text-blue-c-500 text-h3
		p-2 comp:p-0
	}
	.hide-button-svg{
		@apply
		block h-full fill-blue-c-500
		group-hover:fill-blue-c-300
		group-disabled:fill-gray-c-300
		group-active:fill-blue-c-600
	}
</style>
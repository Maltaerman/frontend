<template>
	<ModalTemplate :is-modal-visible="isVisible" :closeFunc="cancelButtonClick"
								 :isHideOnClick="isBgClickClose" class-list="grid items-center px-6">
		<div class="bg-white w-[480px] mx-auto mobile:w-full relative p-6 rounded-lg">
			<img src="/src/assets/close.svg" class="absolute top-6 right-6 cursor-pointer"
					 @click="cancelButtonClick">
			<div class="text-h2 text-center font-semibold">{{ title }}</div>
			<div class="mt-2 mb-6 text-center text-gray-c-500">
				{{question}}
			</div>
			<div class="flex gap-4 flex-nowrap">
				<button-2 class="w-full" @click="cancelButtonClick">
					{{cancelButtonTextC}}
				</button-2>
				<button-1 class="w-full" @click="acceptButtonClick">
					{{acceptButtonTextC}}
				</button-1>
			</div>
		</div>
	</ModalTemplate>
</template>

<script>

export default {
	name: "ConfirmModal",
	props : {
		isVisible : {
			default : false,
			type : Boolean
		},
		isBgClickClose : {
			type : Boolean,
			default : true
		},
		closeFunc : {
			required : true,
			type : Function
		},
		title : {
			type : String,
			default: ""
		},
		question : {
			type : String,
			required : true
		},
		acceptButtonText : String,
		cancelButtonText : String,
		acceptButtonFunc : {
			required : true,
			type : Function
		},
		cancelButtonFunc : {
			required : true,
			type : Function
		}
	},
	methods : {
		cancelButtonClick(){
			this.cancelButtonFunc();
			this.closeFunc();
		},
		acceptButtonClick(){
			this.acceptButtonFunc();
			this.closeFunc()
		}
	},
  computed : {
    acceptButtonTextC(){
      return this.acceptButtonText ? this.acceptButtonText : this.$t("general.confirm");
    },
    cancelButtonTextC(){
      return this.cancelButtonText ? this.cancelButtonText : this.$t("general.cancel");
    }

  }
}
</script>

<style scoped>

</style>

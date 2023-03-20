<template>
    <div v-show="isAct" class="overflow-hidden z-[9000] h-full w-full
    bg-black/30 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center mobile:px-2"
		@click.stop="bgClose">
			<div class="bg-white rounded-lg p-6 w-[480px]
				mobile:w-full relative " @click.stop>
				<img v-if="type!==types.wait" src="/src/assets/close.svg" class="absolute top-6 right-6 cursor-pointer"
						 @click="close">
				<div>
					<img v-if="isType(types.success)" src="/src/assets/Completed.svg" class="mx-auto">
					<img v-if="isType(types.error)" src="/src/assets/Error.svg" class="mx-auto">
					<img v-if="isType(types.wait)" src="/src/assets/Loader.svg" class="animate-spin mx-auto">
					<p class="text-h2 text-center mt-5 font-semibold"
					:class="textStyle">
						{{ message }}
					</p>
				</div>
			</div>

    </div>
</template>

<script>
import removeElement from "./remove-helper.js";
import messageTypes from "./messageTypes.js";
import eventSystem from "./event-system.js";

export default {
  name: "Toaster",
  props : {
		message : String,
		isCloseOnBg : {
			type : Boolean,
			default : true
		},
		type : {
			type : String,
			required : true,
			default : messageTypes.info,
			validator(value){
				return Object.keys(messageTypes).includes(value)
			}
		},
		onClose : {
			type : Function,
			default : ()=>{}
		},
		duration : {
			type : [Number, Boolean],
			default : 3000
		}
  },
  data(){
    return {
      isAct : true,
			timeoutID : 0
    }
  },
  methods : {
		bgClose(){
			if(this.isCloseOnBg) {
				clearTimeout(this.timeoutID);
				this.close();
			}
		},
		close(arg=[]){
      this.isAct = false;
      this.onClose()
      removeElement(this.$el)
		},
		isType(type){
			return type === this.type;
		},
  },
	computed : {
		textStyle(){
			return {
				"text-green-c-500" : this.type === messageTypes.success,
				"text-red-c-500" : this.type === messageTypes.error,
				"text-blue-c-500" : this.type === messageTypes.info,
				"text-red-c-300" : this.type === messageTypes.warning,
			}
		},
		types(){
			return messageTypes;
		},
	},
	mounted() {
    eventSystem.$on("toast-close", this.close)
		if(typeof(this.duration)==="number" && this.duration>0){
			this.timeoutID = setTimeout(this.close, this.duration)
		}
	},
  updated() {
    //beforeUnmount hook don't call. I don't know why
    if(!this.isAct)
      eventSystem.$off("toast-close", this.close)
  },
  beforeUnmount() {
    eventSystem.$off("toast-close", this.close)
  },
}
</script>

<style scoped>

</style>



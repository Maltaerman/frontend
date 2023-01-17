<template>
	<footer class="py-4 px-6 bg-gray-c-100">
		<div class="flex gap-6 pb-2 flex-nowrap text-h4 text-blue-c-500 font-semibold break-words shadow-cs2 justify-between">
			<div class="flex flex-nowrap gap-6">
				<a href="https://about.projectdim.org/" target="_blank">{{$t("footer.about")}}</a>
				<a href="https://dimblog.wixsite.com/project-dim" target="_blank">{{$t("footer.blog")}}</a>
			</div>
			<a href="https://about.projectdim.org/" target="_blank">❤ {{$t("footer.support")}}</a>
		</div>
		<div class="flex mobile:flex-col gap-2 text-h4 text-gray-c-400 font-semibold mt-3 justify-between">
			<p>{{$t("footer.ngo")}}</p>
			<p>{{$t("footer.code")}}</p>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer"
}
</script>

<style scoped>
a{
	@apply hover:text-blue-c-400
}
</style>

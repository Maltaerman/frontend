<template>
  <footer class="bg-gray-c-100 py-4 px-6">
    <div
      class="
        flex flex-nowrap justify-between gap-6
        break-words pb-2 text-h4 font-semibold
        text-blue-c-500 shadow-cs2
      "
    >
      <div class="flex flex-nowrap gap-6">
        <a
          href="https://about.projectdim.org/"
          target="_blank"
        >{{
          $t('footer.about')
        }}</a>
        <a
          href="https://dimblog.wixsite.com/project-dim"
          target="_blank"
        >{{
          $t('footer.blog')
        }}</a>
      </div>
      <a
        href="https://about.projectdim.org/"
        target="_blank"
      >❤ {{ $t('footer.support') }}</a>
    </div>
    <div
      class="mt-3 flex justify-between gap-2 text-h4 font-semibold text-gray-c-400 mobile:flex-col"
    >
      <p>{{ $t('footer.ngo') }}</p>
      <p>{{ $t('footer.code') }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Footer',
}
</script>

<style scoped>
a {
  @apply hover:text-blue-c-400;
}
</style>

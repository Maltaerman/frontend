<template>
  <div class="bg-gray-c-100 p-6 text-h3 tablet:text-h3 mobile:text-h4">
    <div class="font-semibold">
      {{ $t('userSideBar.gov-contacts') }}
    </div>
    <div class="mt-2 flex justify-between py-1 shadow-cs2 mobile:block">
      <p class="mobile:mb-1">
        {{ $t('userSideBar.sbu') }}
      </p>
      <p class="text-right font-semibold text-blue-c-500 mobile:text-left">
        <a href="tel: +380800501482"> 0 800 501 482 </a>
      </p>
    </div>
    <div class="flex justify-between py-1 mobile:block">
      <p class="mobile:mb-1">
        {{ $t('userSideBar.border-guard') }}
      </p>
      <p class="text-right font-semibold text-blue-c-500 mobile:text-left">
        <a href="tel: +380445276363"> +38 (044) 527-63-63 </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Contacts',
}
</script>

<style scoped></style>

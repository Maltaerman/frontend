<template>
  <div class="p-6 bg-gray-c-100 text-h3 mobile:text-h4 tablet:text-h3">
    <div class="font-semibold">{{ $t("userSideBar.gov-contacts") }}</div>
    <div class="mobile:block flex justify-between py-1 shadow-cs2 mt-2">
      <p class="mobile:mb-1">{{ $t("userSideBar.sbu") }}</p>
      <p class="mobile:text-left text-right font-semibold text-blue-c-500">
        <a href="tel: +380800501482"> 0 800 501 482 </a>
      </p>
    </div>
    <div class="mobile:block flex justify-between py-1">
      <p class="mobile:mb-1">{{ $t("userSideBar.border-guard") }}</p>
      <p class="mobile:text-left text-right font-semibold text-blue-c-500">
        <a href="tel: +380445276363"> +38 (044) 527-63-63 </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
};
</script>

<style scoped></style>

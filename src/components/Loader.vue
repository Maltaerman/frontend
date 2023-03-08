<template>
  <div
    class="absolute top-0 left-0 h-full w-full bg-white bg-opacity-50 grid place-items-center z-10"
  >
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="h-[80px] w-[80px] fill-blue-c-500 opacity-100 animate-spin"
    >
      <path
        d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style scoped></style>

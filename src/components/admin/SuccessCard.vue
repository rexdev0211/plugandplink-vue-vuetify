<template>
  <div
    class="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans w-80"
  >
    <div
      class="py-3 px-5 bg-green-100 text-green-900 text-sm rounded-md border border-green-200 flex items-center justify-between"
      role="alert"
    >
      <span>Successfully Created {{ val }}</span>
      <button
        class="w-4"
        type="button"
        data-dismiss="alert"
        aria-label="Close"
        onclick="this.parentElement.remove();"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["val"]
};
</script>

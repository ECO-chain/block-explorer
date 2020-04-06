<template>
  <div class="block-search p-3 rounded-lg d-flex">
    <b-form-select class="rounded-0 w-auto" v-model="selected" :options="options"></b-form-select>
    <b-form-input class="rounded-0" placeholder="Search for block, transaction or address"></b-form-input>
    <b-button variant="primary" class="rounded-0">Search</b-button>
  </div>
</template>

<script>
export default {
  name: "BlockSearchBox",
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "All Filters" },
        { value: "1", text: "Addresses" },
        { value: "2", text: "Tokens" },
      ]
    };
  }
};
</script>

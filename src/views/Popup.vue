<template>
  <div class="popup" @click="closePopup">
    <div class="popup-content small-popup" @click.stop>
      <slot></slot>
      <!-- <button @click="close">Close</button> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Add your popup styles here */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  max-width: 600px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.small-popup {
  max-width: 50%; 
  max-height: 80%; 
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="popup" @click="closePopup">
    <div class="popup-content small-popup" @click.stop>
      <slot></slot>
     
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
}

.small-popup {
  max-width: 50%; 
  max-height: 100%; 
  width: 100%;
  height: 100%;
}
</style>

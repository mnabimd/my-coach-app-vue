<template>
  <base-card>
    <base-dialog :show="!!response" title="An error occurred" @close="errorHandler">
      <p>{{ response }}</p>
    </base-dialog>

    <base-dialog :show="isLoading" title="Upading photo..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-input
      label="Upload a new image"
      type="file"
      accept="image/*"
      @change="getFile"
    ></base-input>
    <small>Note: Please upload a photo of 25 X 25</small>
    <p class="error" v-if="error">{{ error }}</p>
    <p class="success" v-if="success">{{ success }}</p>
    <div class="text-right">
      <base-button class="button" @click="updateProfile"
        >Save Changes</base-button
      >
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      response: null,
      blob: null,
      error: null,
      success: null
    };
  },
  methods: {
    getFile(e) {
      // Clear previous Error:-
      this.error = false;

      const file = e.target.files[0];

      if (!file) return false;

      // SIZE IS IN BYTES
      // 1048576 = 1 MB
      if (file.size >= 1048576 / 2) { 
        this.error = 'Please upload a file less than 500 KB!';
        return false;
      }

      const reader = new FileReader();

      reader.onload = () => {
        // Save the blob and probabaly emit the blob :)
        this.blob = reader.result.toString();
        // Emit the blob
        this.$emit('image-blob', this.blob);
      };

      reader.readAsDataURL(file);
    },
    async updateProfile() {
      if (!this.blob) {
        this.error = 'Please upload a photo first';
      }

      try {
        this.isLoading = true;
        await this.$store.dispatch('updatePhoto', this.blob);
      } catch (e) {
        this.response = e || 'Failed to upload photo, please try again!';
      }

      this.success = 'Profile photo has been updated successfully.'
      this.isLoading = false;
    },
    errorHandler() {
      this.response = null;
    }
  },
  emits: ['image-blob'],
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
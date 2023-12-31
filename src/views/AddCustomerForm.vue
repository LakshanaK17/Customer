<template>
  <div class="container ">
    <div class="add-customer-form ">
      <h2 class="mb-4 font-weight-bold">Add Customer</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <input
            type="text"
            id="name"
            v-model="customer.name"
            class="form-control-line"
            placeholder="Customer Name"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="text"
            id="company"
            v-model="customer.company"
            class="form-control-line"
            placeholder="Company"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="date"
            id="dateofbirth"
            v-model="customer.dateofbirth"
            class="form-control-line"
            placeholder="Date Of Birth"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="number"
            id="phone"
            v-model="customer.phone"
            @input="validatePhoneNumber"
            class="form-control-line"
            placeholder="Contact Phone"
            required
          />
          <span v-if="!isValidPhoneNumber" class="text-danger"
            >Enter a valid 10-digit phone number.</span
          >
        </div>

        <div class="mb-3">
          <input
            type="email"
            id="email"
            v-model="customer.email"
            class="form-control-line"
            placeholder="Email"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="text"
            id="country"
            v-model="customer.country"
            class="form-control-line"
            placeholder="Country"
            required
          />
        </div>

        <!-- <div class="mb-3">
          <select
            id="status"
            v-model="customer.status"
            class="form-select-line"
            placeholder="Status"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> -->
        <h5 class="mb-2 font-weight-bold">Add Address Details</h5>
        <div class="mb-3 address-group">
          <input
            type="text"
            id="number"
            v-model="customer.number"
            class="form-control-line"
            placeholder="Number"
            required
          />

          <input
            type="text"
            id="street"
            v-model="customer.street"
            class="form-control-line"
            placeholder="Street"
            required
          />
        </div>

        <div class="mb-3">
          <input
            type="text"
            id="city"
            v-model="customer.city"
            class="form-control-line"
            placeholder="City, State"
            required
          />
        </div>


       
        
        <div v-for="(address, index) in customer.addresses" :key="index" class="mb-3 address-group">
          <input
            type="text"
            v-model="address.number"
            class="form-control-line"
            placeholder="Number"
            required
          />
          <input
            type="text"
            v-model="address.street"
            class="form-control-line"
            placeholder="Street"
            required
          />
          <input
            type="text"
            id="city"
            v-model="customer.city"
            class="form-control-line"
            placeholder="City, State"
            required
          />
          <button
            type="button"
            @click="deleteAddress(index)"
            class="btn btn-outline-danger delete-button"
          >
            Delete
          </button>
        </div>

        <div class="mb-2">
          <button
            type="button"
            @click="addAddress"
            class="btn btn-outline-success"
          >
            ADD
          </button>
          <span v-if="customer.addresses.length === 0" class="text-danger">
            At least one address is required.
          </span>
        </div>

        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-primary btn-lg">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const customer = ref({
      name: "",
      company: "",
      phone: "",
      email: "",
      country: "",
      status: "Active",
      addresses: [],
    });

    const addAddress = () => {
      customer.value.addresses.push({
        street: "",
        city: "",
        state: "",
        zip: "",
      });
    };

    const deleteAddress = (index) => {
      customer.value.addresses.splice(index, 1);
    };

    const isValidPhoneNumber = ref(true);

    const validatePhoneNumber = () => {
      const phoneNumber = customer.value.phone;
      const isValid = /^\d{0,10}$/.test(phoneNumber);

      isValidPhoneNumber.value = isValid;
    };

    const submitForm = () => {
      if (customer.value.addresses.length === 0) {
        alert("At least one address is required.");
        return;
      }
      if (!isValidPhoneNumber.value) {
        alert("Enter a valid 10-digit phone number.");
        return;
      }
    };

    return {
      isValidPhoneNumber,
      validatePhoneNumber,
      customer,
      addAddress,
      deleteAddress,
      submitForm,
    };
  },
};
</script>

<style scoped>
.add-customer-form {
  max-width: 600px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
}

input:focus,
select:focus {
  border-color: #4caf50;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.address-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.address-group input {
  flex: 1;
}

.address-group .delete-button {
  background-color: #d9534f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.address-group .delete-button:hover {
  background-color: #c9302c;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
</style>

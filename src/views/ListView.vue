<template>
  <div class="list-view">
    <div class="list-view__header">
      <div class="list-view__header__title">All Customers</div>
      <button @click="showModal = true">Add Customer</button>
      <popup v-if="showModal" @close="showModal = false">
        <add-customer-form />
      </popup>
      <div class="list-view__header_search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="list-view__header__sort">
        <select>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
    <div class="list-view__body">
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in customers"
            :key="customer.id"
          >
            <td @click="toggleRow(customer.id)">
              {{ customer.name }}
            </td>
            <td @click="toggleRow(customer.id)">
              {{ customer.company }}
            </td>
            <td @click="toggleRow(customer.id)">
              {{ customer.phone }}
            </td>
            <td @click="toggleRow(customer.id)">
              {{ customer.email }}
            </td>
            <td @click="toggleRow(customer.id)">
              {{ customer.country }}
            </td>
            <td>
  <button
    :class="{ 'active-button': customer.status=='Active', 'inactive-button':customer.status=='Inactive' }"
    @click="toggleStatus(customer)"
  >
    {{ customer.status }}
  </button>
</td>
            <td>
              <button class="edit-button" @click="editCustomer(customer)">
                Edit
              </button>
              <button
                class="delete-button"
                @click="deleteCustomer(customer.id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="expandedRow !== null">
            <td colspan="7">
              <div v-if="expandedRow">
                <ul>
                  <li><strong>Name:</strong> {{ expandedRow.name }}</li>
                  <li><strong>Company:</strong> {{ expandedRow.company }}</li>
                  <li>
                    <strong>Phone Number:</strong> {{ expandedRow.phone }}
                  </li>
                  <li><strong>Email:</strong> {{ expandedRow.email }}</li>
                  <li><strong>Country:</strong> {{ expandedRow.country }}</li>
                  <li><strong>Status:</strong> {{ expandedRow.status }}</li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="list-view__footer">
      <div class="list-view__footer__pagination">
        <ul>
          <li v-for="page in pages" :key="page">
            <a
              @click="changePage(page)"
              :class="{ active: currentPage === page }"
            >{{ page }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AddCustomerForm from "./AddCustomerForm.vue";
import Popup from "./Popup.vue";
import customerData from "./customers.json";


export default {
  components: {
    Popup,
    AddCustomerForm,
  },
  data() {
    return {
      isAddCustomerFormVisible: false,
      currentPage: 1,
      entriesPerPage: 5,
    };
  },
  setup() {
    const customers = ref([]);
    const pages = ref([]);
    const expandedRow = ref(null);
    const showModal = ref(false);

    const mock = new MockAdapter(axios);


    mock.onGet("/customers").reply(200, customerData);

    const addCustomer = async (newCustomerData) => {
      try {
       
        mock.onPost("/customers").reply(201, newCustomerData);

        const response = await axios.post("/customers", newCustomerData);
        const addedCustomer = response.data;
        customers.value.push(addedCustomer);

        showModal.value = false;

        console.log("addCustomer function called:", newCustomerData);
      } catch (error) {
        console.error("Error adding customer:", error);
       
      }
    };

    axios.get("/customers").then((response) => {
      customers.value = response.data.customers;
      pages.value = response.data.pages;
    });

    const editCustomer = async (updatedCustomerData) => {
      try {
        mock
          .onPut(`/customers/${updatedCustomerData.id}`)
          .reply(200, updatedCustomerData);

        const index = customers.value.findIndex(
          (customer) => customer.id === updatedCustomerData.id
        );
        if (index !== -1) {
          customers.value[index] = updatedCustomerData;
        }

        showModal.value = false;
        console.log("editCustomer function called:", updatedCustomerData);
      } catch (error) {
        console.error("Error editing customer:", error);
      }
    };

    const deleteCustomer = async (customerId) => {
      try {
        mock.onDelete(`/customers/${customerId}`).reply(200);

        customers.value = customers.value.filter(
          (customer) => customer.id !== customerId
        );

        console.log("deleteCustomer function called:", customerId);
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    };

    const openAddCustomerForm = () => {
      this.isAddCustomerFormVisible = true;
     
    };

    const toggleRow = (customerId) => {
      if (expandedRow.value === customerId) {
        expandedRow.value = null;
      } else {
       
        const selectedCustomer = customers.value.find(
          (customer) => customer.id === customerId
        );

        expandedRow.value = selectedCustomer || null;
      }
    };

    
    const changePage = (page) => {
      this.currentPage = page;
      axios.get(`/customers?page=${this.currentPage}`).then((response) => {
        const startIndex = (this.currentPage - 1) * this.entriesPerPage;
        const endIndex = startIndex + this.entriesPerPage;
        customers.value = response.data.customers.slice(startIndex, endIndex);
        pages.value = response.data.pages;
      });
    };

    return {
      customers,
      pages,
      expandedRow,
      toggleRow,
      showModal,
      openAddCustomerForm,
      changePage,
      addCustomer,
      editCustomer,
      deleteCustomer,
    };
  },
};
</script>

<style scoped>
.list-view {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; 
}

.list-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #ddd;
  background-color: #3498db;  
  color: #0c0a0a; 
  border-radius: 8px 8px 0 0;
}

.list-view__header__title {
  font-size: 2rem;
  font-weight: bold;
}

.list-view__header button {
  padding: 1.2rem 2.4rem;
  margin-right: 1rem; 
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-view__header button:hover {
  background-color: #27ae60;
}

.list-view__header__search input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 1rem;
}

.list-view__header__sort select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.list-view__body {
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}

.list-view__body table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.list-view__body table th,
.list-view__body table td {
  padding: 1.2rem;
  border: 1px solid #ddd;
  text-align: center;
}

.list-view__body table th {
  background-color: #f2f2 f2;
}

.list-view__footer {
  padding: 1.5rem;
  border-top: 2px solid #ddd;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}

.list-view__footer__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-view__footer__pagination ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list-view__footer__pagination li {
  display: inline-block;
  margin-right: 1rem;
}

.list-view__footer__pagination a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.list-view__footer__pagination a:hover {
  background-color: #ddd;
}

.active-button {
  padding: 0.5rem 1rem;
  background-color: #a6e7d8;
  color: #51877b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.inactive-button {
  padding: 0.5rem 1rem;
  background-color: #fdc5c5;
  color:#df1502;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-view__body table td .edit-button {
  background-color: #3498db; 
  padding: 2px;
  margin-right: 0.5rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-view__body table td .edit-button:hover {
  background-color: #2980b9; 
}

.list-view__body table td .delete-button {
  background-color: #e74c3c; 
  padding: 2px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-view__body table td .delete-button:hover {
  background-color: #c0392b; 
}

</style>

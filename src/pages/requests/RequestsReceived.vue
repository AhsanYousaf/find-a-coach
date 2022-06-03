<template>
    <base-dialog :v-show="!!error" title="An error occured!" @close="handleError">
    <p>{{ error }}</p>
    </base-dialog>
    <section>
        <base-card>
        <header>
            <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
            <request-item v-for="req in requestsReceived" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>  
        </ul>
        <h3 v-else>You havn't received any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
    computed: {
        requestsReceived() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];  
        }
    },
    created() {
      this.loadRequests();
    },
    methods: {
      async loadRequests() {
        this.isLoading = true;
        try {
          await this.$store.dispatch('requests/fetchRequests');
        } catch (error) {
          this.error = error.message || 'Something Failed';
        }
        this.isLoading = false;
      },
      handleError() {
      this.error = null;
      }
    }
    
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
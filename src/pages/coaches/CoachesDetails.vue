<template>
    <section>
        <base-card>
          <h3>{{ fullName }}</h3>
          <h4>${{ rate }}/hour</h4>
        </base-card>
    </section>
    <section>
        <base-card>
          <header>
            <h2>Interested? Reach out now!</h2>
            <base-button link :to="contactLink">Contact</base-button>
          </header>
          <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
          <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
          <p>{{ description }}</p>
        </base-card>
    </section>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedCoach: null
        };
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find( (coach) => coach.id === this.id);
    },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        contactLink() {
            return this.$route.path + '/contact';
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
        },
    }
}
</script>
<template>
    <div>
        <h1>Home Component</h1>
        <router-link to="dashboard">
            <a>Dashboard</a>
        </router-link>
        {{ this.$store.getters.username }}
    </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>

</style>

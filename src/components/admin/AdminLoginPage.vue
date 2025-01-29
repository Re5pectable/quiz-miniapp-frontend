<template>
    <AdminPageWrapper class="login-form">
        <h2>Log in</h2>
        <input v-model="username" type="text">
        <input v-model="password" type="password">
        <button class="v" @click="login()">Login</button>
    </AdminPageWrapper>
</template>
<script>
import { tryAuth } from '@/api/admin/client';
import AdminPageWrapper from './_Wrapper.vue';
export default {
    data() {
        return {
            username: null,
            password: null,
        }
    },
    components: { AdminPageWrapper },
    methods: {
        async login() {
            const success = await tryAuth(this.username, this.password)
            if (success) {
                this.$router.push("/admin/quizes")
                return;
            }
            alert("Неверные данные.")
        }
    }
}
</script>
<style scoped>
h2 {
    margin-bottom: 15px;
}

input {
    margin-bottom: 10px;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-form>* {
    display: block;
    width: 280px;
}
</style>
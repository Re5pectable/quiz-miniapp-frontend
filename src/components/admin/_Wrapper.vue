<template>
    <div class="admin-page">
        <slot class="admin-content-wrapper"></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
body{
    color: black !important;
    background-color: #F6F6F6;
}
.admin-page{
    padding: 0 20px;
    margin-top: 40px;   
}
</style>
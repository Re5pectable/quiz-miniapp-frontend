<template>
    <div class="admin-page">
        <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
body{
    background-color: #F6F6F6;
    color: #000000 !important;
}
.admin-page{
    padding: 0 20px;
    margin-top: 40px;
}

h1,
h2,
h3,
h4,
p,
input{
    color: #000000 !important;
}
</style>
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
.admin-page{
    padding: 0 20px;
    margin-top: 40px;
    background-color: #F6F6F6;
    color: #000000 !important;
}

.admin-page > * > h1,
.admin-page > * > h2,
.admin-page > * > h3,
.admin-page > * > h4,
.admin-page > * > p,
.admin-page > * > input{
    color: #000000 !important;
}
</style>
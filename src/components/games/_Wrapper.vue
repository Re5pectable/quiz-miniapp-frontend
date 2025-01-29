<template>
  <div class="quiz-page-wrapper">
    <div class="quiz-page">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.quiz-page-wrapper {
  display: flex;
  justify-content: center;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  user-select: none;
}

.quiz-page {
  width: 600px;
}
</style>
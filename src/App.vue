<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
body {
  margin: 0;
  background-color: black;
}

h1,
h2,
h3,
h4 {
  font-size: 42px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: left;
  color: white;
  margin-block: 0;
  font-family: "StratosWeb", sans-serif;
  line-height: 120%;
}

h2 {
  line-height: 43.2px;
  font-size: 36px;
}

h3 {
  font-size: 32px;
}

h4 {
  font-size: 28px;
}

p {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-block: 0;
  color: white;
  text-align: left;
  line-height: 130%;
}
p > a{
  text-decoration: underline;
  color: #FFFFFF
}

button,
input,
select, textarea {
  border: none;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  box-sizing: border-box;
}

input, select, textarea {
  color: black;
  cursor: pointer;
}

button.v {
  background-color: #758BFD;
}

button.v:disabled {
  background-color: #353535;
  color: #797C84;
}
button.small{
  padding: 10px 15px;
  width: auto !important;
}

button.gr {
  background-color: #353535
}

button.g {
  background-color: #19D429;
}

button.g:disabled {
  background-color: #bcffc1;
}

#app {
  font-family: "CommonsPro", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.pad {
  padding: 0 20px;
}

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar-button {
  display: none;
}

body {
  -ms-overflow-style: none;
}
</style>

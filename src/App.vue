<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
import { apiInitSession } from './api/session';
export default {
  name: 'App',
  async mounted() {
    await apiInitSession({});
  }
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
  font-weight: 800;
}

h3 {
  font-size: 32px;
  font-weight: 800;
}

h4 {
  font-size: 28px;
  font-weight: 800;
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

button {
  border: none;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

button.v {
  background-color: #758BFD;
}

button.v:disabled {
  background-color: #D7DBEB;
  color: #BABFD1;
}
button.gr{
  background-color: #353535
}

button.g {
  background-color: #19D429;
}

#app {
  font-family: "CommonsPro", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

#content {
  max-width: 600px;
}
.pad{
  padding: 0 20px;
}
</style>

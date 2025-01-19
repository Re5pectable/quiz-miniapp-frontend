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
  background-color: #191919;
}

h1,
h2 {
  font-size: 42px;
  font-weight: 600;
  letter-spacing: -2%;
  line-height: 50.4px;
  text-align: left;
  color: white;
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
}

button {
  border: none;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  font-size: 16px;
  color: white;
  font-weight: 500;
  margin-top: 20px;
  cursor: pointer;
}

button.v {
  background-color: #758BFD;
}

button.v:disabled {
  background-color: #D7DBEB;
  color: #BABFD1;
}

button.g {
  background-color: #19D429;
}

#app {
  font-family: tt-commons-pro-thin, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
}

#content {
  width: 700px;
}
</style>

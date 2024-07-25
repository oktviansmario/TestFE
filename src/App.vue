<template>
  <div id="app">
    <header>
      <h1>Product Management</h1>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background: #42b983;
  padding: 20px;
  color: white;
}

nav a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}

main {
  padding: 20px;
}
</style>

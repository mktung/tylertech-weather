<template>
  <main id="app">
    <div class="weather-display">
        <span id="temperature">{{temperature}}</span>
        <span id="summary">{{summary}}</span>
    </div>
    <label for="location">Enter location to get weather:</label>
    <div class="super-bar">
        <input v-model="loc" type="text" name="location" id="location" placeholder="latitude, longitude"/>
        <button @click="getWeather()">Go</button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',
  data: () => {
      return {
        temperature: '',
        summary: '',
        loc: ''
      }
  },
  methods: {
    async getWeather() {
      let location = this.loc.split(/\s*,\s*/);
      const res = await fetch(`http://localhost:3000/forecast?lat=${location[0]}&lon=${location[1]}`);
      const json = await res.json();
      this.temperature = Math.floor(json.temp) + '°';
      this.summary = json.summary;
      console.log(json)
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
  background: #4477FF;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 50%;
  margin: auto;
}

.weather-display {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}

#temperature {
  font-size: 180px;
  line-height: 150px;
}

#summary {
  font-size: 28px;
}

.super-bar {
  display: flex;
}

.super-bar > * {
  line-height: 34px;
  height: 34px;
  padding: 0 15px;
  font-size: 20px;
}

.super-bar > *:first-child {
  flex: 1 0 auto;
  border-radius: 10px 0 0 10px;
}

.super-bar > *:last-child {
  border-radius: 0 10px 10px 0;
}

input, button {
  border: none;
  background: #FAFAFA;
}

button {
  border-left: #AFAFAF 1px solid;
}

button:hover {
  background: #AFAFAF;
}
</style>
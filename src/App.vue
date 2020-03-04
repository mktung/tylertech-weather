<template>
  <main id="app">
    <div class="weather-display">
        <span id="temperature">{{temperature}}</span>
        <span id="summary">{{summary}}</span>
    </div>
    <div class="form">
        <label for="location">Enter location to get weather:</label>
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
      this.temperature = json.temp;
      this.summary = json.summary;
      console.log(json)
    }
  }
}
</script>

<style>
</style>

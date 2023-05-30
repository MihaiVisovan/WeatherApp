<template>
  <div class="weather-tables">
    <div class="weather-table">
      Temperature:
      {{ weatherData[0]?.current_weather?.temperature }} C
    </div>
    <div class="weather-table">
      Wind speed:
      {{ weatherData[0]?.current_weather?.windspeed }}
    </div>
    <div class="weather-table">
      Wind direction :
      {{ weatherData[0]?.current_weather?.winddirection }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherTable',
  data() {
    return {
      weatherData: [],
      imagePath: '',
      lat: this.$route.query.lat,
      lon: this.$route.query.lon,
    };
  },
  async created() {
    await this.getWeatherData();
  },
  methods: {
    async getWeatherData() {
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      )
        .then(response => response.json())
        .then(data => this.weatherData.push(data));
      console.log(this.weatherData[0]);
    },
  },
};
</script>

<style scoped>
.weather-tables {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 50px;
  padding-bottom: 200px;
}

.weather-table {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  color: black;
  font-size: 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 8px 3px lightgrey;
}
</style>

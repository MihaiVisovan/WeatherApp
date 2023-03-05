<template>
  <table class="weather-table">
    <thead>
      <tr>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Temperature</th>
        <th>Wind</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in weatherData" :key="index">
        <th>
          {{ data.latitude }}
        </th>
        <th>
          {{ data.longitude }}
        </th>
        <th>
          {{ data.current_weather.temperature }}
        </th>
        <th>
          {{ data.current_weather.windspeed }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import cities from './../static/cities.json';

export default {
  name: 'WeatherTable',
  data() {
    return {
      weatherData: [],
      imagePath: '',
    };
  },
  async created() {
    await this.getWeatherData();
    this.imagePath = 'src/assets/images/new_york.jpg';
  },
  methods: {
    async getWeatherData() {
      cities.forEach(async location => {
        await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
        )
          .then(response => response.json())
          .then(data => this.weatherData.push(data));
      });

      document.getElementsByTagName(
        'body'
      )[0].style.backgroundImage = `src/assets/images/${this.imagePath}.jpg`;
    },
  },
};
</script>

<style scoped>
.weather-table {
  width: 100%;
}

th {
  background-color: hsla(204, 9%, 89%, 0.5);
  height: 100px;
  font-size: 50px;
}

tr {
  font-size: 50px;
  background-color: rgb(244, 244, 244, 0.5);
  text-align: center;
}
</style>

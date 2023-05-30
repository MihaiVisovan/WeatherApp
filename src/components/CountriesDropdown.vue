<template>
  <div class="countries-wrapper">
    <div class="countries-dropdown">
      <v-autocomplete
        label="Select a country"
        :items="countryNames"
        variant="underlined"
        style="color: white"
        v-model="selectedCountry"
      >
      </v-autocomplete>
      <v-progress-circular
        color="white"
        indeterminate
        model-value="20"
        v-if="selectedCountry && !cities.length"
      ></v-progress-circular>
      <v-autocomplete
        v-else-if="cities.length"
        label="Select a city"
        :items="cities"
        variant="underlined"
        style="color: white"
        v-model="selectedCity"
      >
      </v-autocomplete>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherTable',
  data() {
    return {
      countries: [],
      cities: [],
      imagePath: '',
      selectedCountry: '',
      selectedCity: '',
    };
  },
  async created() {
    await this.getCountries();
  },
  computed: {
    countryNames() {
      return this.countries.map(country => country.name);
    },
  },
  watch: {
    async selectedCountry(newVal) {
      this.cities = [];
      if (newVal) await this.getCities();
    },
    async selectedCity(newVal) {
      const { lat, lon } = await this.getCoordinates();
      if (newVal) this.$router.push({ name: 'WeatherTable', query: { lat, lon } });
    },
  },
  methods: {
    async getCountries() {
      await fetch('https://countriesnow.space/api/v0.1/countries/positions')
        .then(response => response.json())
        .then(data => (this.countries = data.data));
    },
    async getCities() {
      const data = {
        country: this.selectedCountry.toLowerCase(),
      };

      await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => (this.cities = data.data));
    },
    async getCoordinates() {
      let coordinates = '';
      await fetch(`https://geocode.maps.co/search?q={${this.selectedCity}}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            coordinates = data[0];
          } else {
            coordinates = data;
          }
        });

      return {
        lat: coordinates.lat,
        lon: coordinates.lon,
      };
    },
  },
};
</script>

<style>
.countries-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.countries-dropdown {
  height: 200px;
  width: 700px;
  font-size: 50px;
  border-radius: 50px;
  padding: 10px;
  margin-bottom: 200px;
}

.countries-autocomplete .v-autocomplete__slot {
  height: 200px;
}
</style>

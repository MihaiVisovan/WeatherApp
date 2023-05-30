import { createRouter, createWebHistory } from 'vue-router';

import WeatherTable from './../components/WeatherTable.vue';
import CountriesDropdown from './../components/CountriesDropdown.vue';

const routes = [
  { path: '/', name: 'CountriesDropdown', component: CountriesDropdown },
  { path: '/weather-table', name: 'WeatherTable', component: WeatherTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

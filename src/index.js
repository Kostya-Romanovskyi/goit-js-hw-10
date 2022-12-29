import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById('search-box');
inputField.addEventListener('input', debounce(onGetRequest, DEBOUNCE_DELAY));

const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

let name = '';

function onGetRequest() {
  name = inputField.value.trim();

  if (inputField.value === '') {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
    return;
  }

  fetchCountries(name).then(countries => {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';

    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if (countries.length >= 2 && countries.length <= 10) {
      const listCountriesMarkup = countries
        .map(country => {
          return `<li>
            <img src='${country.flags.svg}' alt='Flag' width="80" height="40" />
          <p>${country.name}</p>
          </li>`;
        })
        .join('');
      infoCountry.innerHTML = '';
      listCountry.insertAdjacentHTML('beforeend', listCountriesMarkup);
    }

    if (countries.length === 1) {
      const countryMarkup = countries.map(country => {
        return `<img src='${
          country.flags.svg
        }' alt='Flag' width="100" heigth"50" />
          <h2>${country.name}</h2>
          <p><span>Capital:</span>${country.capital}</p> 
          <p><span>Population:</span>${country.population}</p> 
          <p><span>Laguages:</span>${country.languages.map(
            name => name.name
          )}</p> `;
      });
      listCountry.innerHTML = '';
      infoCountry.insertAdjacentHTML('beforeend', countryMarkup);
    }
  });
}

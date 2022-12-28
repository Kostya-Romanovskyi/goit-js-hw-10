import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputField = document.getElementById('search-box');

export function fetchCountries(name) {
  const listCountry = document.querySelector('.country-list');
  //   let countryName = inputField.value.trim();
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => {
      if (response.ok === false) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      return countries;
    });
}

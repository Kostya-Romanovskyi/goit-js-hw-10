import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => {
      if (response.ok === false) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    });
}

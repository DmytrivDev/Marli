import axios from 'axios';
import NiceSelect from 'nice-select2';

function whiecleBegin() {
  const vhieclesArray = localStorage.getItem('vhiacles');

  if (vhieclesArray) {
    JSON.parse(vhieclesArray).forEach(el => {
      const chcd = el.checked;

      if (chcd) {
        const name = el.name;

        const currItem = document.querySelector(
          '.whiavleInput[value="' + name + '"]'
        );

        console.log(name, currItem);

        if (currItem) {
          currItem.checked = true;
        }
      }
    });
  }
}

whiecleBegin();

function dateBegin() {
  const loadingDate = localStorage.getItem('loadingDate');

  if (loadingDate) {
    const isPast = isDateInThePast(loadingDate);

    if (!isPast) {
      const dateInput = document.querySelector(
        '.timeInputs[value="' + loadingDate + '"]'
      );

      if (dateInput) {
        dateInput.checked = true;
      } else {
        const diffDateInput = document.getElementById('choose-date');

        diffDateInput.value = loadingDate;
      }
    } else {
      const today = document.querySelector('.timeInputs').value;
      localStorage.setItem('loadingDate', today);
    }
  }
}

dateBegin();

function isDateInThePast(loadingDate) {
  const [day, month, year] = loadingDate.split('.').map(Number);

  const date = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
}

function addressChoicesFunc() {
  const addressChoices = document.querySelectorAll('.calc-address__choice');

  if (addressChoices) {
    addressChoices.forEach(el => {
      const input = el.querySelector('.chosecity');
      const list = el.querySelector('.calc-address__choice-list');

      input.addEventListener('focus', () => {
        input.classList.add('is-opened');
        el.querySelector('label').classList.remove('error-input');
        if (list.classList.contains('is-field')) {
          list.classList.add('is-opened');
        }
      });

      input.addEventListener('blur', () => {
        setTimeout(() => {
          input.classList.remove('is-opened');
          list.classList.remove('is-opened');
          list.classList.remove('is-loading');

          if (!el.querySelector('label').classList.contains('check-input')) {
            el.querySelector('label').classList.add('error-input');
          }
        }, 100);
      });
    });
  }
}

const countrySelects = document.querySelectorAll('.country__select');

countrySelects?.forEach(el => {
  new NiceSelect(el, {
    searchable: false,
  });

  el.classList.add('niceSelected');
});

function countrySelect() {
  const countrySelects = document.querySelectorAll('.country__select');

  countrySelects?.forEach(el => {
    el.closest('.calc-address')
      .querySelector('select')
      .addEventListener('change', changeCountry);
  });
}

function citySearch() {
  const calcAddresses = document.querySelectorAll('.calc-address');

  calcAddresses?.forEach(function (calcAddress) {
    const cityInput = calcAddress.querySelector('.chosecity');
    const countrySelect = calcAddress.querySelector('.country__select');

    async function sendRequest(city, country) {
      openCiryList(calcAddress, false, '');

      const url = '/wp-admin/admin-ajax.php';
      const params = new URLSearchParams();
      params.append('action', 'get_postalcodes');
      params.append('city', city);
      params.append('country', country);

      try {
        const response = await axios.post(url, params);

        openCiryList(calcAddress, true, response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    function debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }

    const handleInput = debounce(function () {
      const city = cityInput.value;
      const country = countrySelect.value;

      calcAddress.querySelector('label').classList.remove('check-input');

      if (city.length > 0) {
        sendRequest(city, country);
      } else {
        removeCities(calcAddress);
      }
    }, 600);

    cityInput.addEventListener('input', handleInput);
  });
}

countrySelect();
addressChoicesFunc();
citySearch();

function openCiryList(calcAddress, isReady, resp) {
  const list = calcAddress.querySelector('.calc-address__choice-list');
  const noFound = list.dataset.nothing;

  const responsive = makeResp(resp, noFound);

  list.classList.add('is-field');

  if (!isReady) {
    list.classList.add('is-opened');
    list.classList.add('is-loading');
  } else {
    list.classList.remove('is-loading');
    list.innerHTML = responsive;

    const cityItems = list.querySelectorAll('.cityitem');

    cityItems?.forEach(el => {
      el.addEventListener('click', checlCity);
    });
  }
}

function makeResp(resp, noFound) {
  let htmlOutput = '';

  if (resp.total_count > 1) {
    resp.results.forEach(item => {
      const lat = item.coordinates.lat;
      const lon = item.coordinates.lon;
      const coords = lat + ',' + lon;
      htmlOutput += `
        <li data-coords="${coords}" class="cityitem">
          <span>${item.postal_code} ${item.place_name}</span>
        </li>
      `;
    });
  } else {
    htmlOutput += `
    <li class="nodounditem">
      <span>${noFound}</span>
    </li>
  `;
  }

  return htmlOutput;
}

function removeCities(calcAddress) {
  const list = calcAddress.querySelector('.calc-address__choice-list');

  list.classList.remove('is-opened');
  list.classList.remove('is-loading');
  list.classList.remove('is-field');
  list.classList.remove('is-field');
  list.innerHTML = '';
}

function checlCity(evt) {
  evt.preventDefault();

  const citytext = evt.target.innerText;
  const cords = evt.currentTarget.dataset.coords;
  const cityLabel = evt.target
    .closest('.calc-address__choice')
    .querySelector('label');
  const cityItem = cityLabel.querySelector('input');
  const cityIList = evt.target
    .closest('.calc-address__choice')
    .querySelector('ul');

  cityItem.value = citytext;
  cityItem.dataset.coords = cords;
  cityLabel.classList.add('check-input');
  cityLabel.classList.remove('error-input');
  cityIList.classList.remove('is-opened');
  cityIList.innerHTML = '';
  setAddresses();

  selectedCity();
}

function changeCountry(evt) {
  const cont = evt.target.closest('.calc-address');
  const input = cont.querySelector('input');
  const label = cont.querySelector('label');
  const list = cont.querySelector('.calc-address__choice-list');

  input.value = '';
  label.classList.remove('check-input');
  list.innerHTML = '';
}

function selectedCity() {
  const inputs = document.querySelectorAll('.chosecity');
  const lngth = inputs.length;

  let allCoords = [];

  inputs.forEach(el => {
    const coords = el.dataset.coords;

    if (coords) {
      allCoords.push(coords);
    }
  });

  if (allCoords.length === lngth) {
    const joinedCoords = allCoords.join('|');

    getDistance(joinedCoords);
  }
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
function setAddresses() {
  const loadingAfresses = document.querySelectorAll('.loadingAddress');
  const loadingArray = [];
  const unloadingAfresses = document.querySelectorAll('.unloadingAddress');
  const unloadingArray = [];

  loadingAfresses?.forEach(el => {
    const country = el.querySelector('select').value;
    const city = el.querySelector('.chosecity').value;
    const coords = el.querySelector('.chosecity').dataset.coords;

    if (country && city && coords) {
      loadingArray.push({
        country,
        city,
        coords,
      });
    }
  });

  unloadingAfresses?.forEach(el => {
    const country = el.querySelector('select').value;
    const city = el.querySelector('.chosecity').value;
    const coords = el.querySelector('.chosecity').dataset.coords;

    if (country && city && coords) {
      unloadingArray.push({
        country,
        city,
        coords,
      });
    }
  });

  localStorage.setItem('loadingAddresses', JSON.stringify(loadingArray));
  localStorage.setItem('unloadingAddresses', JSON.stringify(unloadingArray));
}

const addressesCont = document.querySelector('.praci-cl__address-box');

if (addressesCont) {
  const loadAdd = localStorage.getItem('loadingAddresses');
  const unloadAdd = localStorage.getItem('unloadingAddresses');
  const loadAddParsed = JSON.parse(loadAdd);
  const unloadAddParsed = JSON.parse(unloadAdd);
  let ready = false;

  if (
    (!loadAddParsed || loadAddParsed.length === 0) &&
    (!unloadAddParsed || unloadAddParsed.length === 0)
  ) {
    addressesCont.classList.remove('loading');
  } else {
    if (loadAddParsed || loadAddParsed.length > 0) {
      const loadCont = addressesCont.querySelector('.loadingAddresses');

      if (!unloadAddParsed || unloadAddParsed.length === 0) {
        ready = true;
      }

      addressAssynkGen(loadAddParsed, loadCont, ready);
    }

    if (unloadAddParsed || unloadAddParsed.length > 0) {
      const unloadCont = addressesCont.querySelector('.unloadingAddresses');

      addressAssynkGen(unloadAddParsed, unloadCont, true);
    }
  }
}

async function addressAssynkGen(loadAddParsed, addCont, ready) {
  await addAddresses(loadAddParsed, addCont);

  if (ready) {
    addressesCont.classList.remove('loading');

    countrySelect();
    addressChoicesFunc();
    citySearch();
  }
}

async function addAddresses(address, addCont) {
  const url = '/wp-admin/admin-ajax.php';
  const formData = new FormData();
  formData.append('action', 'add__addresses');
  formData.append('array', JSON.stringify(address));
  if (addCont.classList.contains('unloadingAddresses')) {
    formData.append('type', 'un');
  } else {
    formData.append('type', '');
  }

  try {
    const response = await axios.post(url, formData);

    const html = response.data.data;

    if (html) {
      addCont.innerHTML = html;
    }

    const selectors = addCont.querySelectorAll('select');

    selectors.forEach(el => {
      if (!el.classList.contains('niceSelected')) {
        new NiceSelect(el, {
          searchable: false,
        });

        el.classList.add('niceSelected');
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

async function getDistance(coords) {
  const url = '/wp-admin/admin-ajax.php';
  const params = new URLSearchParams();
  params.append('action', 'get_distance');
  params.append('coordinates', coords);

  startLoading();

  try {
    const response = await axios.post(url, params);

    const meters = response.data.data.features[0].properties.distance;
    const time = response.data.data.features[0].properties.time;
    const kilometers = meters / 1000;
    const roundedKilometers = Math.ceil(kilometers);
    const hours = convertSecondsToHoursAndMinutes(time);

    localStorage.setItem('distance', roundedKilometers);
    localStorage.setItem('time', hours);
    await whiaclePrices();
    await finalePrice();
    await setLoadingDate();
    await dateFuncRequest();
    endLoading();
  } catch (error) {
    console.error('Error:', error);
  }
}

function convertSecondsToHoursAndMinutes(seconds) {
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

async function whiaclePrices() {
  const roundedKilometers = localStorage.getItem('distance');

  if (roundedKilometers) {
    const vhiacles = document.querySelectorAll('.vehicle__item');
    const pricesArray = [];

    const url = '/wp-admin/admin-ajax.php';
    const params = new URLSearchParams();
    params.append('action', 'get_whiacles_prices');

    try {
      const response = await axios.post(url, params);
      const respArr = response.data.data;

      vhiacles?.forEach((el, i) => {
        const price = respArr[i].price_per_km;
        const name = respArr[i].name;
        const priceBase = parseInt(respArr[i].based_price);
        const priceCont = el.querySelector('.carprice');
        const vhiacleInput = el.querySelector('.whiavleInput');
        const prePrice = price * roundedKilometers;
        const thePrice = prePrice + priceBase;

        const euroNumberFormatter = new Intl.NumberFormat('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        const pastedPrice = euroNumberFormatter.format(thePrice);

        const vhiacleObj = {
          price: thePrice,
          checked: vhiacleInput.checked,
          name: name,
        };

        pricesArray.push(vhiacleObj);
        priceCont.innerHTML = pastedPrice;
      });

      localStorage.setItem('vhiacles', JSON.stringify(pricesArray));

      return true;
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    return false;
  }
}

async function startWhiacles() {
  const sectionWh = document.querySelector('.section__vehicle');

  const resp = await whiaclePrices();

  if (resp) {
    sectionWh.classList.add('showed');
  }

  sectionWh.classList.remove('loading');
  finalePrice();
}

startWhiacles();

async function finalePrice() {
  const whiacleObjs = localStorage.getItem('vhiacles');
  const pricesConts = document.querySelectorAll('.totalprice');
  addedServiceRevers();
  addedServices();
  let addetPriceFin = 0;

  const addedSerObj = localStorage.getItem('addedServices');

  if (addedSerObj) {
    const addedParse = JSON.parse(addedSerObj);

    addetPriceFin += addedParse.generalprice;
  }

  if (whiacleObjs) {
    JSON.parse(whiacleObjs).forEach(el => {
      const chcd = el.checked;

      if (chcd) {
        const price = el.price;
        const generalPrice = price + addetPriceFin;

        const euroNumberFormatter = new Intl.NumberFormat('de-DE', {
          minimumFractionDigits: 2, // Мінімум 2 десяткових знаки
          maximumFractionDigits: 2, // Максимум 2 десяткових знаки
        });
        const pastedPrice = euroNumberFormatter.format(generalPrice);

        localStorage.setItem('generalPrice', generalPrice.toFixed(2));

        pricesConts?.forEach(el => {
          el.innerHTML = pastedPrice;
        });
        return;
      }
    });
  }
}

function addedServices() {
  const addInputs = document.querySelectorAll(
    '.adding__services input[name="vehicle-checkbox"]'
  );

  const addArray = [];
  let addGenPrice = 0;

  addInputs?.forEach(el => {
    if (el.checked) {
      const val = el.value;
      const addPrice = parseInt(el.dataset.price);
      const addObj = {
        value: val,
        price: addPrice,
      };

      addArray.push(addObj);
      addGenPrice += addPrice;
    }

    const addServicesPbject = {
      added: addArray,
      generalprice: addGenPrice,
    };

    localStorage.setItem('addedServices', JSON.stringify(addServicesPbject));
  });
}

function addedServiceRevers() {
  const addSR = localStorage.getItem('addedServices');
  const addSRParsed = JSON.parse(addSR);
  const addInputsCont = document.querySelector('.adding__services');

  addSRParsed?.added?.forEach(el => {
    const val = el.value;

    const currInput = addInputsCont.querySelector('[value="' + val + '"]');
    currInput.checked = true;

    const id = currInput.getAttribute('id');
    const tarLabels = document.querySelectorAll('label[for="' + id + '"]');

    tarLabels?.forEach(el => {
      if (currInput.checked) {
        el.classList.add('checked');
      } else {
        el.classList.remove('checked');
      }
    });
  });
}

function startLoading() {
  const sectionsFL = document.querySelectorAll('.section__forload');

  sectionsFL?.forEach(el => {
    el.classList.add('loading');
  });
}

function endLoading() {
  const sectionsFL = document.querySelectorAll('.section__forload');

  sectionsFL?.forEach(el => {
    el.classList.remove('loading');
    el.classList.add('showed');
  });
}

async function whiecleStart() {
  const vhiacleInputs = document.querySelectorAll('.whiavleInput');

  vhiacleInputs?.forEach(el => {
    el.addEventListener('change', evt => {
      vhiacleChange();
    });
  });
}

whiecleStart();

async function vhiacleChange() {
  await whiaclePrices();
  finalePrice();
}

const addInputs = document.querySelectorAll(
  '.adding__services input[name="vehicle-checkbox"]'
);

addInputs?.forEach(el => {
  el.addEventListener('change', evt => {
    const target = evt.target;
    const id = target.getAttribute('id');
    const tarLabels = document.querySelectorAll('label[for="' + id + '"]');

    tarLabels?.forEach(el => {
      if (target.checked) {
        el.classList.add('checked');
      } else {
        el.classList.remove('checked');
      }
    });

    addedServices();
    finalePrice();
  });
});

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const timeInputs = document.querySelectorAll('.timeInputs');

const dateFunc = async () => {
  timeInputs?.forEach(el => {
    el.addEventListener('change', evt => {
      const date = evt.target.value;

      localStorage.setItem('loadingDate', date);
      dateFuncRequest();
    });
  });
};

dateFunc();

async function setLoadingDate() {
  let date = '';

  timeInputs?.forEach(el => {
    if (el.checked) {
      date = el.value;
      return;
    }
  });

  if (!date) {
    date = document.getElementById('choose-date').value;
  }

  // localStorage.setItem('loadingDate', date);
}

const dateFuncRequest = async () => {
  const date = localStorage.getItem('loadingDate');
  const time = localStorage.getItem('time');

  if (date && time) {
    const url = '/wp-admin/admin-ajax.php';
    const params = new URLSearchParams();
    const datesCont = document.querySelector('.praci-cl__info-date');
    params.append('action', 'set_date');
    params.append('date', date);
    params.append('time', time);

    datesCont.classList.add('loading');

    try {
      const response = await axios.post(url, params);
      const html = response.data.data;

      datesCont.innerHTML = html;
      datesCont.classList.remove('loading');
    } catch (error) {
      console.error('Error:', error);
    }
    return true;
  } else {
    return false;
  }
};

const dateFuncGen = async () => {
  try {
    await setLoadingDate();
    const req = await dateFuncRequest();
    const timeCont = document.querySelector('.section__time');

    if (req) {
      timeCont.classList.remove('loading');
      timeCont.classList.add('showed');
    } else {
      timeCont.classList.remove('loading');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

dateFuncGen();

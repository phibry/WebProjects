const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const clearBtn = document.getElementById('clear-users');

let data = [];

// FETCH RANDOM USER AND ADD MONEY
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// ADD NEW OBJ TO DATA AERR
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// DOUBLE THE MONEY OF THE USERS
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });

  updateDOM();
}

// SORT BY WEALTH
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// SHOW ONLY MILLIONAIRES
function showMillionares() {
  data = data.filter((item) => item.money > 1000000);

  updateDOM();
}

// CALCULATE ENTIRE WEALTH
function calculateWealth() {
  const wealth = data.reduce((acc, item) => (acc += item.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

// UPDATE DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((person) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong>${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// CLEAR DOM
function clearDOM() {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  data = [];
}

// FORMAT NUMBER AS MONEY
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// EVENTLISTENERS
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaresBtn.addEventListener('click', showMillionares);
calculateWealthBtn.addEventListener('click', calculateWealth);
clearBtn.addEventListener('click', clearDOM);

'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, 25000, -130, 70, 1300],
  interestRate: 1.2,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
    '2024-06-27T18:09:22.589Z',
  ],
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
  ],
};
const account5 = {
  owner: 'Abdelrahman Elrayes',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1.7,
  pin: 5555,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
  ],
  transferMoney,
};
const accounts = [account1, account2, account3, account4, account5];

let inputUser = document.querySelector('.input-user');
let inputPin = document.querySelector('.input-pin');
let loginBtn = document.querySelector('.login-btn');
let content = document.querySelector('.content');
let welcomeWord = document.querySelector('.welcome-word');
let movements = document.querySelector('.movements');
let inMoney = document.querySelector('.in-money');
let outMoney = document.querySelector('.out-money');
let interest = document.querySelector('.interest');
let currentBalance = document.querySelector('.current-balance');
let sortBtn = document.querySelector('.sort');
let transferTo = document.querySelector('.transfer-to-input');
let transferAmount = document.querySelector('.transfer-amount');
let transferBtn = document.querySelector('.transfer-btn');
let loanAmount = document.querySelector('.loan-amount');
let loanBtn = document.querySelector('.loan-btn');
let closeUser = document.querySelector('.close-user');
let closePin = document.querySelector('.close-pin');
let closeBtn = document.querySelector('.close-account-btn');
let dateToday = document.querySelector('.today-date');
// let movementsContent = ``;
let depositCounter = 0,
  withdrawCounter = 0;
let totalIncome = 0,
  totalOutcome = 0;
let counter = 0;
let currentUser;

function createUsername(accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .split(' ')
      .map(element => element[0].toLowerCase())
      .join('');
  });
}

createUsername(accounts);
function viewEachMovement(customerMovements) {
  movements.innerHTML = '';
  totalIncome = customerMovements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => movement + acc, 0);
  totalOutcome = customerMovements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => movement + acc, 0);
  customerMovements.forEach((movement, ind) => {
    counter = movement > 0 ? ++depositCounter : ++withdrawCounter;
    let str = movement > 0 ? 'DEPOSIT' : 'WITHDRAWAL';
    let movDate = new Date(currentUser.movementsDates[ind]);
    let fDate =
      `${movDate.getDate()}`.padStart(2, '0') +
      '/' +
      `${movDate.getMonth() + 1}`.padStart(2, '0') +
      '/' +
      movDate.getFullYear();
    let dayDate =
      `${new Date().getDate()}`.padStart(2, '0') +
      '/' +
      `${new Date().getMonth() + 1}`.padStart(2, '0') +
      '/' +
      new Date().getFullYear();
    console.log(fDate, dayDate);
    fDate = fDate === dayDate ? 'TODAY' : fDate;
    let movementsContent = `<div class="movement">
    <div class="type-date">
    <p class="${str.toLocaleLowerCase()}">
    ${counter} ${str}
    </p>
    <p class="movement-date">${fDate}</p>
    </div>
    <p class="movement-amount">${movement.toFixed(2)} $</p>
    </div>`;

    movements.insertAdjacentHTML('afterbegin', movementsContent);
    /*  if (movement > 0) {
      depositCounter++;
      counter = depositCounter;
      totalIncome += movement;
    } else {
      withdrawCounter++;
      counter = withdrawCounter;
      totalOutcome += movement;
      } */
    // movementsContent =
    //   `<div class="movement">
    //           <div class="type-date">
    //             <p class="${str.toLocaleLowerCase()}">
    //               ${counter} ${str}
    //             </p>
    //             <p class="movement-date">TODAY</p>
    //           </div>
    //           <p class="movement-amount">${movement} $</p>
    //         </div>` + movementsContent;
  });
}
function viewMovements(customerMovements) {
  // movementsContent = ``;
  depositCounter = 0;
  withdrawCounter = 0;
  totalIncome = 0;
  totalOutcome = 0;
  counter = 0;
  viewEachMovement(customerMovements);
  // movements.innerHTML = movementsContent;
  let todayDate = new Date();
  dateToday.textContent =
    'As of ' +
    `${todayDate.getDate()}`.padStart('0', 2) +
    '/' +
    `${todayDate.getMonth() + 1}`.padStart(2, '0') +
    '/' +
    todayDate.getFullYear() +
    ',' +
    `${todayDate.getHours() + 1}`.padStart(2, '0') +
    ':' +
    `${todayDate.getMinutes() + 1}`.padStart(2, '0');
  inMoney.textContent = totalIncome.toFixed(2) + ' $';
  outMoney.textContent = Math.abs(totalOutcome).toFixed(2) + ' $';
  interest.textContent =
    customerMovements
      .filter(mov => mov > 0)
      .map(mov => (mov * currentUser['interestRate']) / 100)
      .reduce((acc, mov) => acc + mov, 0)
      .toFixed(2) + ' $';
  currentBalance.textContent =
    customerMovements.reduce((acc, movement) => acc + movement, 0).toFixed(2) +
    ' $';
}
loginBtn.addEventListener('click', () => {
  if (inputPin.value !== '' && inputUser.value !== '') {
    let loginCustomer = accounts.find(
      acc =>
        acc.username === inputUser.value && acc.pin === Number(inputPin.value)
    );
    if (loginCustomer?.owner) {
      let [firstName] = [...loginCustomer['owner'].split(' ')];
      currentUser = loginCustomer;
      welcomeWord.textContent = `Good Afternoon, ${firstName}!`;
      viewMovements(loginCustomer['movements']);
      content.classList.remove('hidden');
      inputPin.value = '';
      inputUser.value = '';
    }
    // accounts.forEach(customer => {
    //   let [firstName] = [...customer['owner'].split(' ')];
    //   if (
    //     customer['pin'] === Number(inputPin.value) &&
    //     customer.username === inputUser.value
    //   ) {
    //     currentUser = customer;
    //     welcomeWord.textContent = `Good Afternoon, ${firstName}!`;
    //     viewMovements(customer['movements']);
    //     content.classList.remove('hidden');
    //     inputPin.value = '';
    //     inputUser.value = '';
    //   }
    // });
  }
});
sortBtn.addEventListener('click', () => {
  let movementsCopy = currentUser['movements'].concat([]);
  movementsCopy.sort((a, b) => b - a);
  movementsCopy.reverse();
  if (sortBtn.classList.contains('sorted')) {
    viewMovements(currentUser['movements']);
    sortBtn.classList.remove('sorted');
  } else {
    viewMovements(movementsCopy);
    sortBtn.classList.add('sorted');
  }
});
function transferMoney() {
  if (
    transferTo.value !== '' &&
    transferAmount.value !== '' &&
    currentUser.movements.reduce((acc, movement) => acc + movement, 0) >=
      Number(transferAmount.value)
  ) {
    let toCustomer = accounts.find(acc => acc.username === transferTo.value);
    if (toCustomer?.movements && Number(transferAmount.value) > 0) {
      toCustomer['movements'].push(Number(transferAmount.value));
      currentUser['movements'].push(Number(-1 * transferAmount.value));
      toCustomer.movementsDates.push(new Date().toISOString());
      currentUser.movementsDates.push(new Date().toISOString());
      viewMovements(currentUser['movements']);
      transferTo.value = '';
      transferAmount.value = '';
    }
    // accounts.forEach(customer => {
    //   if (customer.username === transferTo.value) {
    //     customer['movements'].push(Number(transferAmount.value));
    //     currentUser['movements'].push(Number(-1 * transferAmount.value));
    //     viewMovements(currentUser['movements']);
    //     transferTo.value = '';
    //     transferAmount.value = '';
    //   }`${todayDate.getMonth() + 1}`.padStart(2, '0')
    // });
  }
}
transferBtn.addEventListener('click', transferMoney);
function loanMoney() {
  if (loanAmount.value !== '') {
    if (
      currentUser.movements.some(movement => movement >= loanAmount.value * 0.1)
    ) {
      currentUser['movements'].push(Number(loanAmount.value));
      currentUser.movementsDates.push(new Date().toISOString());
      viewMovements(currentUser['movements']);
      loanAmount.value = '';
    }
    // for (let movement of currentUser['movements']) {
    //   if (movement > 0) {
    //     if (loanAmount.value * 0.1 <= movement) {
    //       currentUser['movements'].push(Number(loanAmount.value));
    //       viewMovements(currentUser['movements']);
    //       loanAmount.value = '';
    //       break;
    //     }
    //   }
    // }
  }
}
loanBtn.addEventListener('click', loanMoney);
function closeAccount() {
  if (closeUser.value !== '' && closePin.value !== '') {
    // let index = accounts.indexOf(currentUser);
    let index = accounts.findIndex(acc => acc?.username === closeUser.value);
    if (
      currentUser.username === closeUser.value &&
      Number(closePin.value) === currentUser['pin']
    ) {
      accounts.splice(index, 1);
      closeUser.value = '';
      closePin.value = '';
      welcomeWord.textContent = 'Log in to get started';
      content.classList.add('hidden');
    }
  }
}
closeBtn.addEventListener('click', closeAccount);

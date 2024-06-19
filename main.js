'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, 25000, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Abdelrahman Elrayes',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1.7,
  pin: 5555,
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

let movementsContent = ``;
let depositCounter = 0,
  withdrawCounter = 0;
let totalIncome = 0,
  totalOutcome = 0;
let counter = 0;
let currentUser;
function viewEachMovement(customerMovements) {
  customerMovements.forEach(movement => {
    let str = movement > 0 ? 'DEPOSIT' : 'WITHDRAWAL';
    if (movement > 0) {
      depositCounter++;
      counter = depositCounter;
      totalIncome += movement;
    } else {
      withdrawCounter++;
      counter = withdrawCounter;
      totalOutcome += movement;
    }
    movementsContent =
      `<div class="movement">
              <div class="type-date">
                <p class="${str.toLocaleLowerCase()}">
                  ${counter} ${str}
                </p>
                <p class="movement-date">TODAY</p>
              </div>
              <p class="movement-amount">${movement} $</p>
            </div>` + movementsContent;
  });
}
function viewMovements(customerMovements) {
  movementsContent = ``;
  depositCounter = 0;
  withdrawCounter = 0;
  totalIncome = 0;
  totalOutcome = 0;
  counter = 0;
  viewEachMovement(customerMovements);
  movements.innerHTML = movementsContent;
  inMoney.textContent = totalIncome + ' $';
  outMoney.textContent = totalOutcome * -1 + ' $';
  interest.textContent =
    totalIncome * currentUser['interestRate'] - totalIncome + ' $';
  currentBalance.textContent = totalIncome - totalOutcome + ' $';
}
loginBtn.addEventListener('click', () => {
  if (inputPin.value !== '' && inputUser.value !== '') {
    accounts.forEach(customer => {
      let [firstName, secondName, thirdName] = customer['owner'].split(' ');
      thirdName !== '';
      let username = (firstName[0] + secondName[0]).toLowerCase();
      if (
        customer['pin'] === Number(inputPin.value) &&
        username === inputUser.value
      ) {
        currentUser = customer;
        welcomeWord.textContent = `Good Afternoon, ${firstName}!`;
        viewMovements(customer['movements']);
        content.classList.remove('hidden');
        inputPin.value = '';
        inputUser.value = '';
      }
    });
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
  if (transferTo.value !== '' && transferAmount.value !== '') {
    accounts.forEach(customer => {
      let [firstName, secondName] = customer['owner'].split(' ');
      let username = (firstName[0] + secondName[0]).toLowerCase();
      if (username === transferTo.value) {
        customer['movements'].push(Number(transferAmount.value));
        currentUser['movements'].push(Number(transferAmount.value * -1));
        viewMovements(currentUser['movements']);
        transferTo.value = '';
        transferAmount.value = '';
      }
    });
  }
}
transferBtn.addEventListener('click', transferMoney);
function loanMoney() {
  if (loanAmount.value !== '') {
    for (let movement of currentUser['movements']) {
      if (movement > 0) {
        if (loanAmount.value <= 0.1 * movement) {
          currentUser['movements'].push(Number(loanAmount.value));
          viewMovements(currentUser['movements']);
          loanAmount.value = '';
          break;
        }
      }
    }
  }
}
loanBtn.addEventListener('click', loanMoney);
function closeAccount() {
  if (closeUser.value !== '' && closePin.value !== '') {
    accounts.forEach(customer => {
      let [firstName, secondName] = customer['owner'].split(' ');
      let username = (firstName[0] + secondName[0]).toLowerCase(); // logic error
      if (username === closeUser.value && closePin.value === customer['pin']) {
        // accounts.remove(customer);
        accounts = accounts.filter(account => account !== customer);
        console.log(accounts);
        transferTo.value = '';
        transferAmount.value = '';
        // if (currentUser['owner'] === firstName + secondName) {
        content.classList.add('hidden');
        // }
      }
    });
  }
}
closeBtn.addEventListener('click', closeAccount);

// ==== Get elements from DOM ====
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

const futureText = document.getElementById('future-text');
const futureAmount = document.getElementById('future-amount');
const futureDate = document.getElementById('future-date');
const futureList = document.getElementById('future-list');

// ==== State ====
let transactions = [];
let futureTransactions = [];

// ==== Add current transaction ====
function addTransaction() {
  const textValue = text.value.trim();
  const amountValue = +amount.value;

  if (textValue === '' || isNaN(amountValue)) {
    alert('Please enter both a description and a valid amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textValue,
    amount: amountValue
  };

  transactions.push(transaction);
  updateUI();

  text.value = '';
  amount.value = '';
}

// ==== Add future transaction ====
function addFutureTransaction() {
  const textValue = futureText.value.trim();
  const amountValue = +futureAmount.value;
  const dateValue = futureDate.value;

  if (textValue === '' || isNaN(amountValue) || !dateValue) {
    alert('Please enter a description, amount, and a date');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textValue,
    amount: amountValue,
    date: dateValue
  };

  futureTransactions.push(transaction);
  updateFutureUI();

  futureText.value = '';
  futureAmount.value = '';
  futureDate.value = '';
}

// ==== Update UI for current transactions ====
function updateUI() {
  list.innerHTML = '';
  let total = 0, inc = 0, exp = 0;

  transactions.forEach(tx => {
    const sign = tx.amount < 0 ? '-' : '+';
    const li = document.createElement('li');
    li.textContent = `${tx.text} ${sign}£${Math.abs(tx.amount).toFixed(2)}`;
    list.appendChild(li);

    total += tx.amount;
    if (tx.amount > 0) inc += tx.amount;
    else exp += tx.amount;
  });

  balance.textContent = `£${total.toFixed(2)}`;
  income.textContent = `+£${inc.toFixed(2)}`;
  expense.textContent = `-£${Math.abs(exp).toFixed(2)}`;
}

// ==== Update UI for future transactions ====
function updateFutureUI() {
  futureList.innerHTML = '';

  futureTransactions.forEach(tx => {
    const li = document.createElement('li');
    li.textContent = `${tx.text} (£${Math.abs(tx.amount).toFixed(2)}) on ${tx.date}`;
    futureList.appendChild(li);
  });
}

// ==== Register Service Worker ====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker error:', err));
  });
}



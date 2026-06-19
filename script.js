// ---- Dark Mode Toggle ----
const darkModeBtn = document.getElementById('darkModeBtn');

function applyDarkModePreference() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkModeBtn.textContent = '☀️ Light Mode';
  }
}

darkModeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  darkModeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('darkMode', isDark);
});

applyDarkModePreference();

// ---- Transaction Logic ----
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('transactionList');

function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function render() {
  listEl.innerHTML = '';
  let income = 0, expense = 0;

  transactions.forEach((tx, index) => {
    if (tx.type === 'income') income += tx.amount;
    else expense += tx.amount;

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="tx-info">
        <span>${tx.name}</span>
        <span class="tx-amount ${tx.type}">
          ${tx.type === 'income' ? '+' : '-'}₹${tx.amount}
        </span>
      </div>
      <button class="delete-btn" data-index="${index}">✕</button>
    `;
    listEl.appendChild(li);
  });

  document.getElementById('income').textContent = income;
  document.getElementById('expense').textContent = expense;
  document.getElementById('balance').textContent = income - expense;
}

addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid transaction name and amount.');
    return;
  }

  transactions.push({ name, amount, type });
  saveTransactions();
  render();

  nameInput.value = '';
  amountInput.value = '';
});

listEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    transactions.splice(index, 1);
    saveTransactions();
    render();
  }
});

render();
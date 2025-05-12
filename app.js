document.getElementById('hitung').addEventListener('click', function() {
  const kg = document.getElementById('kg').value;
  const jenis = document.getElementById('jenis').value;
  let hargaPerKg;

  if (jenis === 'kering') {
    hargaPerKg = 5000; // 5rb/kg
  } else if (jenis === 'setrika') {
    hargaPerKg = 10000; // 10rb/kg
  }

  const totalHarga = kg * hargaPerKg;
  document.getElementById('total').textContent = totalHarga;

  // Menyimpan riwayat transaksi
  saveHistory(kg, jenis, totalHarga);
});

function saveHistory(kg, jenis, total) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const transaction = {
    kg,
    jenis,
    total,
    date: new Date().toLocaleString()  // Menambahkan tanggal dan waktu transaksi
  };

  history.push(transaction);
  localStorage.setItem('history', JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const historyList = document.getElementById('history-list');
  const history = JSON.parse(localStorage.getItem('history')) || [];
  
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.kg} Kg - ${item.jenis === 'kering' ? 'Cuci Kering' : 'Cuci Setrika'} - ${item.total} IDR - Tanggal: ${item.date}`;
    
    // Create delete button for each transaction
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => deleteTransaction(index));

    li.appendChild(deleteButton);
    historyList.appendChild(li);
  });
}

// Delete a specific transaction
function deleteTransaction(index) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  history.splice(index, 1); // Remove the item at the given index
  localStorage.setItem('history', JSON.stringify(history));
  displayHistory(); // Refresh the displayed history
}

// Delete all transactions
function deleteAllTransactions() {
  localStorage.removeItem('history');
  displayHistory(); // Refresh the displayed history
}

// Add event listener for deleting all transactions
document.getElementById('delete-all').addEventListener('click', deleteAllTransactions);

// Menampilkan riwayat transaksi saat aplikasi dimuat
displayHistory();

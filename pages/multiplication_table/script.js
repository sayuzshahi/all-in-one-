function generateTable() {
    let number = document.getElementById('number').value;
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear previous table
 
    if (number === '') {
      alert('Please enter a number');
      return;
    }
 
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    let headerCell1 = document.createElement('th');
    headerCell1.textContent = 'Multiplication';
    let headerCell2 = document.createElement('th');
    headerCell2.textContent = 'Result';
 
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    table.appendChild(headerRow);
 
    for (let i = 1; i <= 10; i++) {
      let row = document.createElement('tr');
      let cell1 = document.createElement('td');
      cell1.textContent = `${number} × ${i}`;
      let cell2 = document.createElement('td');
      cell2.textContent = number * i;
 
      row.appendChild(cell1);
      row.appendChild(cell2);
      table.appendChild(row);
    }
 
    tableContainer.appendChild(table);
  }
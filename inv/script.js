// script.js

// Function to load products from local storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    productTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = productTableBody.insertRow();
        row.insertCell(0).innerText = product.name;
        row.insertCell(1).innerText = product.description;
        row.insertCell(2).innerText = product.category;
        row.insertCell(3).innerText = product.size;
        row.insertCell(4).innerText = product.color;
        row.insertCell(5).innerText = product.price;
        row.insertCell(6).innerText = product.quantity;

        const actionsCell = row.insertCell(7);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => editProduct(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteProduct(index);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to add a new product
function addProduct(event) {
    event.preventDefault();

    const newProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        size: document.getElementById('size').value,
        color: document.getElementById('color').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value),
    };

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById('productForm').reset();
}
// Function to load inventory data
function loadInventory() {
    fetch('php/load_inventory.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('inventory-table');
            table.innerHTML = ''; // Clear existing rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.stock}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewItemHistory(${item.id})">View History</button>
                    </td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to search items
function searchItem() {
    const query = document.getElementById('search-bar').value;
    fetch(`php/search_item.php?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('inventory-table');
            table.innerHTML = ''; // Clear existing rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.stock}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="viewItemHistory(${item.id})">View History</button>
                    </td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to view item history
function viewItemHistory(itemId) {
    fetch(`php/item_history.php?item_id=${itemId}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('item-history-content').innerHTML = data;
            const historyModal = new bootstrap.Modal(document.getElementById('itemHistoryModal'));
            historyModal.show();
        })
        .catch(error => console.error('Error:', error));
}

// Load inventory data on page load
document.addEventListener('DOMContentLoaded', loadInventory);


// Function to add a new item to the inventory
function addItem() {
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const stock = document.getElementById('item-stock').value;
    const price = document.getElementById('item-price').value;

    fetch('php/add_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            stock: stock,
            price: price,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response data:", data);  // Log the response for debugging
        if (data.success) {
            alert('Item added successfully!');
            document.getElementById('add-item-form').reset();
            loadInventory(); // Refresh the inventory table
        } else {
            alert('Error adding item: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding item: ' + error.message);  // Show more detailed error message
    });
}



let availableItems = []; // Store available items fetched from database

// Fetch items from the database when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetch('php/get_items.php')
        .then(response => response.json())
        .then(data => {
            availableItems = data;
        });
});

function addOrderItemRow() {
    const container = document.getElementById('order-items-container');
    const itemRow = document.createElement('div');
    itemRow.classList.add('row', 'mb-3', 'order-item-row');
    
    itemRow.innerHTML = `
        <div class="col-md-6">
            <label for="order-item-id" class="form-label">Item</label>
            <select class="form-control order-item-id" required>
                ${availableItems.map(item => `<option value="${item.id}">${item.name} - ${item.stock} in stock</option>`).join('')}
            </select>
        </div>
        <div class="col-md-4">
            <label for="order-quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control order-quantity" required min="1">
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <button type="button" class="btn btn-danger" onclick="removeOrderItemRow(this)">Remove</button>
        </div>
    `;
    container.appendChild(itemRow);
}

function removeOrderItemRow(button) {
    button.closest('.order-item-row').remove();
}

function placeOrder() {
    const customerName = document.getElementById('order-customer-name').value;
    const items = [];

    document.querySelectorAll('.order-item-row').forEach(row => {
        const itemId = row.querySelector('.order-item-id').value;
        const quantity = row.querySelector('.order-quantity').value;
        items.push({ item_id: itemId, quantity: parseInt(quantity) });
    });

    fetch('php/place_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_name: customerName, items: items })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully!');
            document.getElementById('place-order-form').reset();
            document.getElementById('order-items-container').innerHTML = '';
        } else {
            alert('Error placing order: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}





// // Fetch items and populate dropdown when the order modal is shown
// function loadItemsForOrder() {
//     fetch('get_items.php')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok " + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log("Fetched items:", data); // Debug log to verify data
//             document.getElementById('order-items-container').innerHTML = ''; // Clear existing items
//             if (data.length === 0) {
//                 alert("No items available in stock.");
//             } else {
//                 // Add an initial item row with fetched items
//                 addOrderItemRow(data);
//             }
//         })
//         .catch(error => console.error('Error fetching items:', error));
// }

// // Add a new item row in the order form
// function addOrderItemRow(items = []) {
//     const container = document.getElementById('order-items-container');

//     // Create a new row for selecting an item and quantity
//     const itemRow = document.createElement('div');
//     itemRow.className = 'd-flex mb-2 align-items-center';

//     // Item select dropdown
//     const itemSelect = document.createElement('select');
//     itemSelect.className = 'form-select me-2';
//     itemSelect.name = 'item_id';
//     itemSelect.required = true;

//     // Populate the dropdown with available items
//     items.forEach(item => {
//         const option = document.createElement('option');
//         option.value = item.id;
//         option.textContent = `${item.name} (Stock: ${item.stock})`;
//         itemSelect.appendChild(option);
//     });

//     // Quantity input
//     const quantityInput = document.createElement('input');
//     quantityInput.type = 'number';
//     quantityInput.className = 'form-control me-2';
//     quantityInput.name = 'quantity';
//     quantityInput.placeholder = 'Quantity';
//     quantityInput.min = 1;
//     quantityInput.required = true;

//     // Remove button for the row
//     const removeButton = document.createElement('button');
//     removeButton.className = 'btn btn-danger';
//     removeButton.textContent = 'Remove';
//     removeButton.onclick = () => container.removeChild(itemRow);

//     // Append elements to the row and row to the container
//     itemRow.appendChild(itemSelect);
//     itemRow.appendChild(quantityInput);
//     itemRow.appendChild(removeButton);
//     container.appendChild(itemRow);
// }
function addOrderItemRow() {
    const container = document.getElementById('order-items-container');

    // Create a new row for selecting an item and quantity
    const itemRow = document.createElement('div');
    itemRow.className = 'd-flex mb-2 align-items-center';

    // Item select dropdown
    const itemSelect = document.createElement('select');
    itemSelect.className = 'form-select me-2';
    itemSelect.name = 'item_id';
    itemSelect.required = true;

    // Populate the dropdown with available items
    availableItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} (Stock: ${item.stock})`;
        itemSelect.appendChild(option);
    });

    // Quantity input
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'form-control me-2';
    quantityInput.name = 'quantity';
    quantityInput.placeholder = 'Quantity';
    quantityInput.min = 1;
    quantityInput.required = true;

    // Remove button for the row
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger';
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => container.removeChild(itemRow);

    // Append elements to the row and row to the container
    itemRow.appendChild(itemSelect);
    itemRow.appendChild(quantityInput);
    itemRow.appendChild(removeButton);
    container.appendChild(itemRow);
}


function placeOrder() {
    const customerName = document.getElementById('order-customer-name').value;
    const items = []; // This should contain the item ID and quantity for each item in the order

    // Collect item data from the form (assuming the order items are in dynamic rows)
    const itemRows = document.querySelectorAll('#order-items-container .d-flex');
    itemRows.forEach(row => {
        const itemId = row.querySelector('select[name="item_id"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        items.push({ item_id: itemId, quantity: parseInt(quantity) });
    });

    // Send the order data to the server
    fetch('php/place_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_name: customerName, items: items })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully!');
            document.getElementById('place-order-form').reset();
            document.getElementById('order-items-container').innerHTML = '';
            loadInventory(); // Refresh inventory to show updated stock
        } else {
            alert('Error placing order: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while placing the order.');
    });
}



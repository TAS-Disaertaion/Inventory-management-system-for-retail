let availableItems = []; 

// Fetch available items from the server
function loadAvailableItems() {
    fetch('php/get_items.php')  // Adjust this path if needed
        .then(response => response.json())
        .then(data => {
            availableItems = data; // Store the fetched items in the global availableItems variable
            console.log("Available items loaded:", availableItems); // For debugging
        })
        .catch(error => console.error('Error fetching items:', error));
}

// Call this function when d Modal is opened 2 load available items
document.getElementById('orderModal').addEventListener('show.bs.modal', function() {
    loadAvailableItems(); // Ensure available items are loaded when the modal opens
});

// Add a new row for item selection
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

    // Check if availableItems is populated
    if (availableItems.length === 0) {
        alert("No items available.");
        return;
    }

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

// Function to place an order and deduct stock
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
        console.log('Server Response:', data); // Log server response for debugging
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






// Load inventory data (this is used elsewhere in your system)
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
// function viewItemHistory(itemId) {
//     fetch(`php/item_history.php?item_id=${itemId}`)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('item-history-content').innerHTML = data;
//             const historyModal = new bootstrap.Modal(document.getElementById('itemHistoryModal'));
//             historyModal.show();
//         })
//         .catch(error => console.error('Error:', error));
// }

// Load inventory data on page load
document.addEventListener('DOMContentLoaded', loadInventory);






// Function to add a new item row in the restock form
function addRestockItemRow() {
    const container = document.getElementById('restock-items-container');

    const itemRow = document.createElement('div');
    itemRow.className = 'd-flex mb-2 align-items-center';

    // Item select dropdown
    const itemSelect = document.createElement('select');
    itemSelect.className = 'form-select me-2';
    itemSelect.name = 'item_id';
    itemSelect.required = true;

    // Check if availableItems is populated
    if (availableItems.length === 0) {
        alert("No items available for restocking.");
        return;
    }

    // Populate the dropdown with available items
    availableItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} (Stock: ${item.stock})`;
        itemSelect.appendChild(option);
    });

    // Quantity input for restock
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

    itemRow.appendChild(itemSelect);
    itemRow.appendChild(quantityInput);
    itemRow.appendChild(removeButton);
    container.appendChild(itemRow);
}

// Function to submit the restock to the server
function placeRestock() {
    const items = [];

    // Collect item data from the restock form
    document.querySelectorAll('#restock-items-container .d-flex').forEach(row => {
        const itemId = row.querySelector('select[name="item_id"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        items.push({ item_id: itemId, quantity: parseInt(quantity) });
    });

    // Send restock data to the server
    fetch('php/restock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: items })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Restock completed successfully!');
            document.getElementById('restock-form').reset();
            document.getElementById('restock-items-container').innerHTML = '';
            loadInventory(); // Refresh inventory to show updated stock
        } else {
            alert('Error during restock: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while restocking.');
    });
}

// Ensure `availableItems` is loaded when the modal is opened
document.getElementById('restockModal').addEventListener('show.bs.modal', function() {
    loadAvailableItems();
});



// Function to view item history
function viewItemHistory(itemId) {
    // Fetch transaction history for the selected item
    fetch(`php/get_item_history.php?item_id=${itemId}`)
        .then(response => response.json())
        .then(data => {
            const historyContainer = document.getElementById('item-history-content');
            historyContainer.innerHTML = ''; // Clear any previous history

            // Check if history data was returned
            if (data.length > 0) {
                // Create a table to display the transaction history
                const table = document.createElement('table');
                table.className = 'table table-striped';
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(entry => `
                            <tr>
                                <td>${entry.change_type}</td>
                                <td>${entry.quantity}</td>
                                <td>${new Date(entry.change_date).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;

                historyContainer.appendChild(table);
            } else {
                historyContainer.innerHTML = '<p>No transaction history available for this item.</p>';
            }

            // Show the modal
            const historyModal = new bootstrap.Modal(document.getElementById('itemHistoryModal'));
            historyModal.show();
        })
        .catch(error => console.error('Error fetching item history:', error));
}


// // Function to generate report based on selected criteria
// function generateReport() {
//     const type = document.getElementById('report-type').value;
//     const startDate = document.getElementById('report-date-start').value;
//     const endDate = document.getElementById('report-date-end').value;

//     const url = new URL('php/generate_report.php', window.location.origin);
//     url.searchParams.append('type', type);
//     if (startDate) url.searchParams.append('start_date', startDate);
//     if (endDate) url.searchParams.append('end_date', endDate);

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const reportContainer = document.getElementById('report-content');
//             reportContainer.innerHTML = ''; // Clear any existing report content

//             if (data.length > 0) {
//                 const table = document.createElement('table');
//                 table.className = 'table table-bordered';
//                 table.innerHTML = `
//                     <thead>
//                         <tr>
//                             <th>Item ID</th>
//                             <th>Type</th>
//                             <th>Quantity</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.map(row => `
//                             <tr>
//                                 <td>${row.item_id}</td>
//                                 <td>${row.change_type}</td>
//                                 <td>${row.quantity}</td>
//                                 <td>${new Date(row.change_date).toLocaleString()}</td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 `;
//                 reportContainer.appendChild(table);
//             } else {
//                 reportContainer.innerHTML = '<p>No data available for the selected criteria.</p>';
//             }
//         })
//         .catch(error => console.error('Error generating report:', error));
// }

// // Function to download the report as an image
// function downloadReport() {
//     const reportContainer = document.getElementById('report-content');

//     // Use html2canvas to capture the report content as an image
//     html2canvas(reportContainer)
//         .then(canvas => {
//             const link = document.createElement('a');
//             link.href = canvas.toDataURL('image/png');
//             link.download = 'report.png';
//             link.click();
//         })
//         .catch(error => console.error('Error downloading report:', error));
// }



function generateReport() {
    const type = document.getElementById('report-type').value;
    const startDate = document.getElementById('report-date-start').value;
    const endDate = document.getElementById('report-date-end').value;

    const url = new URL('php/generate_report.php', window.location.origin);
    url.searchParams.append('type', type);
    if (startDate) url.searchParams.append('start_date', startDate);
    if (endDate) url.searchParams.append('end_date', endDate);

    console.log('Generated Report URL:', url.href); // Debugging line

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Report Data:', data); // Debugging line
            const reportContainer = document.getElementById('report-content');
            reportContainer.innerHTML = '';

            if (data.length > 0) {
                const table = document.createElement('table');
                table.className = 'table table-bordered';
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(row => `
                            <tr>
                                <td>${row.item_id}</td>
                                <td>${row.change_type}</td>
                                <td>${row.quantity}</td>
                                <td>${new Date(row.change_date).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;
                reportContainer.appendChild(table);
            } else {
                reportContainer.innerHTML = '<p>No data available for the selected criteria.</p>';
            }
        })
        .catch(error => console.error('Error generating report:', error));
}

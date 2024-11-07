<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$username = $_SESSION['username'] ?? 'User'; // Default to 'User' if session username is not set

// Function to get initials from the username
function getInitials($name) {
    $words = explode(" ", $name);
    $initials = "";
    foreach ($words as $word) {
        $initials .= strtoupper($word[0]);
    }
    return $initials;
}

$initials = getInitials($username);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventory Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-4">
<div class="d-flex justify-content-between align-items-center">
        <h1>Inventory Management System</h1>
        
        <!-- Username Display -->
        <div class="text-end">
            <span class="fw-bold"><?= $username ?></span> 
            <span class="badge bg-secondary rounded-circle ms-2"><?= $initials ?></span>
        </div>
    </div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Inventory</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button class="btn btn-light nav-link" onclick="window.location.href='php/logout.php'">Logout</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-light nav-link" data-bs-toggle="modal" data-bs-target="#addItemModal">Add Item</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-light nav-link" data-bs-toggle="modal" data-bs-target="#orderModal">Record Order</button>
                    </li>
                    
                    <li class="nav-item">
                        <button class="btn btn-light nav-link" data-bs-toggle="modal" data-bs-target="#restockModal">Restock</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-light nav-link" data-bs-toggle="modal" data-bs-target="#reportModal">Reports</button>                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- Search Bar -->
    <div class="input-group mb-3">
        <input type="text" class="form-control" id="search-bar" placeholder="Search for items...">
        <button class="btn btn-primary" onclick="searchItem()">Search</button>
    </div>
    
    <!-- Inventory Table -->
    <div class="table-responsive mb-4">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="inventory-table">
                <!-- Rows will be dynamically generated here using JavaScript -->
            </tbody>
        </table>
    </div>
    
    <!-- Modal for Add Item Form -->
    <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="add-item-form">
                        <div class="mb-3">
                            <label for="item-name" class="form-label">Item Name</label>
                            <input type="text" class="form-control" id="item-name" required>
                        </div>
                        <div class="mb-3">
                            <label for="item-description" class="form-label">Description</label>
                            <textarea class="form-control" id="item-description" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="item-stock" class="form-label">Stock Quantity</label>
                            <input type="number" class="form-control" id="item-stock" required>
                        </div>
                        <div class="mb-3">
                            <label for="item-price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="item-price" step="0.01" required>
                        </div>
                        <button type="button" class="btn btn-success" onclick="addItem()">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
<!-- Modal for Item History -->
<div class="modal fade" id="itemHistoryModal" tabindex="-1" aria-labelledby="itemHistoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="itemHistoryModalLabel">Item History</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="item-history-content">
                    <!-- History data will be dynamically injected here -->
                </div>
            </div>
        </div>
    </div>
</div>


  <!-- Modal for Place Order Form -->
<div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderModalLabel">Place New Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="place-order-form">
                    <div class="mb-3">
                        <label for="order-customer-name" class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="order-customer-name" required>
                    </div>

                    <!-- This is where the dynamic item rows will be inserted -->
                    <div id="order-items-container">
                        <!-- Order items will be dynamically added here -->
                    </div>

                    
                    <button type="button" class="btn btn-secondary" onclick="addOrderItemRow()">Add Item</button>

                    <button type="button" class="btn btn-primary mt-3" onclick="placeOrder()">Submit Order</button>
                </form>
            </div>
        </div>
    </div>
</div>



<!-- Modal for Restock Form -->
<div class="modal fade" id="restockModal" tabindex="-1" aria-labelledby="restockModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="restockModalLabel">Restock Inventory</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="restock-form">
                    <div id="restock-items-container">
                        <!-- Restok items will b dynamically added here -->
                    </div>
                    <button type="button" class="btn btn-secondary" onclick="addRestockItemRow()">Add Item</button>
                    <button type="button" class="btn btn-primary mt-3" onclick="placeRestock()">Submit Restock</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal for Report Generation -->
<div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="reportModalLabel">Generate Report</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
                <form id="report-form">
                    <div class="mb-3">
                        <label for="report-type" class="form-label">Transaction Type</label>
                        <select id="report-type" class="form-select">
                            <option value="all">All Transactions</option>
                            <option value="order">Orders</option>
                            <option value="restock">Restocks</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="report-date-start" class="form-label">Start Date</label>
                        <input type="date" id="report-date-start" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="report-date-end" class="form-label">End Date</label>
                        <input type="date" id="report-date-end" class="form-control">
                    </div>
                    <button type="button" class="btn btn-primary" onclick="generateReport()">Generate Report</button>
                    <button type="button" class="btn btn-secondary" onclick="downloadReport()">Download as Image</button>
                </form>

           
                <div id="report-content" class="mt-4">
                    <!-- Report data will be dynamically displayed here @TODO !!!!THIS IS NOT WORKING AT D MOMENT!!!!!...  -->
                </div>
            </div>
        </div>
    </div>
</div>


</div>

<footer class="bg-light py-3 mt-5">
    <div class="container text-center">
        <p class="mb-0">Dissertation Project Done By Turay, Timbo & Jalloh 2024</p>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<script src="js/inventory.js"></script>
</body>
</html>

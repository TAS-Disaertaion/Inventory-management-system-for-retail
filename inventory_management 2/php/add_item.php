<?php
include 'database.php';

// Get JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is valid
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Prepare data
$name = $data['name'];
$description = $data['description'];
$stock = $data['stock'];
$price = $data['price'];

// Check for missing fields
if (empty($name) || empty($description) || empty($stock) || empty($price)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

// Insert item into the database
$query = "INSERT INTO items (name, description, stock, price) VALUES ('$name', '$description', $stock, $price)";
if ($conn->query($query) === TRUE) {
    // Success
    echo json_encode(['success' => true]);
} else {
    // Error: send back the database error
    echo json_encode(['success' => false, 'message' => 'Database Error: ' . $conn->error]);
}

$conn->close();
?>

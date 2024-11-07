<?php
include 'database.php';

$response = [];

// Fetch items frm d items table
$query = "SELECT id, name, stock FROM items WHERE stock > 0";
$result = $conn->query($query);

// Check if query was successful
if ($result) {
    // Check if we have any rows in d result
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } else {
        // No items found with stock > 0
        $response['message'] = 'No available items in stock.';
    }
} else {
    // If query fails
    $response['error'] = 'Failed to fetch items from the database.';
}

$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>

<?php
include 'database.php';

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Get d item id from d query parameter
$item_id = isset($_GET['item_id']) ? intval($_GET['item_id']) : 0;
$response = [];

// If item_id is provided, retrieve its history
if ($item_id > 0) {
    $query = "SELECT change_type, quantity, change_date FROM item_history WHERE item_id = ? ORDER BY change_date DESC";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $item_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch all rows and store them in an array
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    
    $stmt->close();
} else {
    $response['error'] = "Invalid item ID.";
}

$conn->close();

// Set the response header to JSON and return the response to the client
header('Content-Type: application/json');
echo json_encode($response);
?>

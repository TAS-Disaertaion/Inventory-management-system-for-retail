<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


include 'database.php';

// Get the JSON data from the request body (sent from the client-side JavaScript)
$data = json_decode(file_get_contents("php://input"), true);
$customer_name = $data['customer_name'];
$items = $data['items']; // Array of items in the order, each containing item_id and quantity

$response = [];

// Begin a database transaction to ensure all operations are atomic
$conn->begin_transaction();

try {
    // Insert a new order into the 'orders' table
    $stmt = $conn->prepare("INSERT INTO orders (customer_name, order_date) VALUES (?, NOW())");
    $stmt->bind_param("s", $customer_name);
    $stmt->execute();
    $order_id = $stmt->insert_id; // Get the ID of the newly created order
    $stmt->close();

    // Loop through each item in the order
    foreach ($items as $item) {
        $item_id = $item['item_id'];
        $quantity = $item['quantity'];

        //  Check if there is sufficient stock available for this item
        $checkStock = $conn->prepare("SELECT stock FROM items WHERE id = ?");
        $checkStock->bind_param("i", $item_id);
        $checkStock->execute();
        $checkStock->store_result();
        $checkStock->bind_result($stock);
        $checkStock->fetch();
        $checkStock->close();

        // If stock is insufficient, throw an exception nd rollback the transaction
        if ($stock < $quantity) {
            throw new Exception("Insufficient stock for item ID $item_id. Available stock: $stock.");
        }

        //  Update d stock in d 'items' table by subtracting d ordered quantity
        $updateStock = $conn->prepare("UPDATE items SET stock = stock - ? WHERE id = ?");
        $updateStock->bind_param("ii", $quantity, $item_id);
        $updateStock->execute();
        $updateStock->close();

        //  Insert the item details into the 'order_items' table (linking the order and items)
        $stmt = $conn->prepare("INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $order_id, $item_id, $quantity);
        $stmt->execute();
        $stmt->close();

        //  Log the order in d 'item_history' table for tracking stock changes
        $stmt = $conn->prepare("INSERT INTO item_history (item_id, change_type, quantity, change_date) VALUES (?, 'order', ?, NOW())");
        $stmt->bind_param("ii", $item_id, $quantity);
        $stmt->execute();
        $stmt->close();
    }

    // If all steps succeed, commit d transaction
    $conn->commit();
    $response['success'] = true;

} catch (Exception $e) {
    // If any error occurs, rollback the transaction
    $conn->rollback();
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

// Close d database connection
$conn->close();

// Set the response header to JSON and return the response to the client
header('Content-Type: application/json');
echo json_encode($response);
?>

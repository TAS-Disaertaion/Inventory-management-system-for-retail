<?php
include 'database.php';

$query = "SELECT id, name, stock FROM items";
$result = $conn->query($query);

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

header('Content-Type: application/json');
echo json_encode($items);

$conn->close();
?>

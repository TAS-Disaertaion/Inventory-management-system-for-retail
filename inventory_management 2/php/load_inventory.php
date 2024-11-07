<?php
include 'database.php';

$result = $conn->query("SELECT * FROM items");
$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}
echo json_encode($items);
?>

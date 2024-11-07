<?php
include 'database.php';

$item_id = $_GET['item_id'];
$result = $conn->query("
    SELECT * FROM transactions WHERE item_id = $item_id ORDER BY transaction_date DESC
");

$history = "<ul>";
while ($row = $result->fetch_assoc()) {
    $history .= "<li>{$row['transaction_type']} of {$row['quantity']} on {$row['transaction_date']}</li>";
}
$history .= "</ul>";

echo $history;
?>

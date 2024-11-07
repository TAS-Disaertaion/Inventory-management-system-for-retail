<?php
header('Content-Type: application/json');
echo json_encode(['status' => 'File accessed successfully']);
exit;


include 'database.php';

// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Retrieve criteria from GET parameters
$transaction_type = isset($_GET['type']) ? $_GET['type'] : 'all';
$start_date = isset($_GET['start_date']) ? $_GET['start_date'] : null;
$end_date = isset($_GET['end_date']) ? $_GET['end_date'] : null;

$query = "SELECT item_id, change_type, quantity, change_date FROM item_history WHERE 1=1";

// Add filters based on criteria
if ($transaction_type !== 'all') {
    $query .= " AND change_type = ?";
}
if ($start_date) {
    $query .= " AND change_date >= ?";
}
if ($end_date) {
    $query .= " AND change_date <= ?";
}

$stmt = $conn->prepare($query);

// Bind parameters dynamically based on selected criteria
$bindParams = [];
if ($transaction_type !== 'all') $bindParams[] = &$transaction_type;
if ($start_date) $bindParams[] = &$start_date;
if ($end_date) $bindParams[] = &$end_date;
if ($bindParams) {
    $stmt->bind_param(str_repeat("s", count($bindParams)), ...$bindParams);
}

$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>

<?php
session_start();
include 'database.php';

// Check if any users are registered
$result = $conn->query("SELECT COUNT(*) as user_count FROM users");
$row = $result->fetch_assoc();
if ($row['user_count'] == 0) {
    // Redirect to registration page if no users exist
    header("Location: ../register.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Prepare and execute the query to get the hashed password
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($userId, $hashedPassword);
    $stmt->fetch();

    // Verify the password
    if ($stmt->num_rows > 0 && password_verify($password, $hashedPassword)) {
        // Set session variables
        $_SESSION['user_id'] = $userId;
        $_SESSION['username'] = $username;
        header("Location: ../index.php"); // Redirect to the main page
        exit();
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
    $conn->close();
}
?>

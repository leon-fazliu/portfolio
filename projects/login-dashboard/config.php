<?php
session_start();

$host = "localhost";
$database = "portfolio_login";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error) {
    die("Lidhja me databazen deshtoi: " . $error->getMessage());
}
?>

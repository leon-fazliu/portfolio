<?php
require_once "config.php";

if (!isset($_SESSION["user_id"])) {
    header("Location: index.php");
    exit;
}

$stmt = $pdo->prepare("SELECT name, email, created_at FROM users WHERE id = ?");
$stmt->execute([$_SESSION["user_id"]]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | ClientFlow Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="dashboard-page">
    <section class="dashboard-panel">
      <div class="dashboard-top">
        <div>
          <p class="eyebrow">Dashboard</p>
          <h1>Welcome, <?php echo htmlspecialchars($user["name"] ?? "User"); ?></h1>
        </div>
        <a class="logout" href="logout.php">Logout</a>
      </div>

      <div class="stats-grid">
        <article>
          <span>Project</span>
          <strong>Login System</strong>
        </article>
        <article>
          <span>Backend</span>
          <strong>PHP</strong>
        </article>
        <article>
          <span>Database</span>
          <strong>MySQL</strong>
        </article>
      </div>

      <div class="profile-box">
        <h2>User details</h2>
        <p><strong>Name:</strong> <?php echo htmlspecialchars($user["name"] ?? ""); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($user["email"] ?? ""); ?></p>
        <p><strong>Registered at:</strong> <?php echo htmlspecialchars($user["created_at"] ?? ""); ?></p>
      </div>
    </section>
  </main>
</body>
</html>

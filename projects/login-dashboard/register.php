<?php
require_once "config.php";

if (isset($_SESSION["user_id"])) {
    header("Location: dashboard.php");
    exit;
}

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($name === "" || $email === "" || $password === "") {
        $error = "Ploteso te gjitha fushat.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Email nuk eshte valid.";
    } elseif (strlen($password) < 6) {
        $error = "Fjalekalimi duhet te kete te pakten 6 karaktere.";
    } else {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            $error = "Ky email eshte regjistruar me pare.";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $insert = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $insert->execute([$name, $email, $hashedPassword]);
            $success = "Llogaria u krijua me sukses. Tani mund te kycesh.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="sq">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register | Leon Fazliu</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="auth-page">
    <section class="auth-card">
      <a class="back-link" href="../../index.html">Kthehu te portfolio</a>
      <p class="eyebrow">PHP + MySQL Project</p>
      <h1>Register</h1>
      <p class="lead">Krijo llogari dhe ruaj perdoruesin ne databaze MySQL.</p>

      <?php if ($error): ?>
        <p class="message error"><?php echo htmlspecialchars($error); ?></p>
      <?php endif; ?>

      <?php if ($success): ?>
        <p class="message success"><?php echo htmlspecialchars($success); ?></p>
      <?php endif; ?>

      <form method="POST" action="">
        <label for="name">Emri</label>
        <input id="name" name="name" type="text" placeholder="Leon Fazliu" required>

        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="email@example.com" required>

        <label for="password">Fjalekalimi</label>
        <input id="password" name="password" type="password" placeholder="Minimum 6 karaktere" required>

        <button type="submit">Regjistrohu</button>
      </form>

      <p class="auth-footer">Ke llogari? <a href="index.php">Kycu</a></p>
    </section>
  </main>
</body>
</html>

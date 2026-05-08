<?php
require_once "config.php";

if (isset($_SESSION["user_id"])) {
    header("Location: dashboard.php");
    exit;
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($email === "" || $password === "") {
        $error = "Ploteso email dhe fjalekalimin.";
    } else {
        $stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["name"];
            header("Location: dashboard.php");
            exit;
        }

        $error = "Email ose fjalekalim i pasakte.";
    }
}
?>
<!DOCTYPE html>
<html lang="sq">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Leon Fazliu</title>
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
      <h1>Login</h1>
      <p class="lead">Ky projekt perdor PHP sessions, password hashing dhe databaze MySQL.</p>

      <?php if ($error): ?>
        <p class="message error"><?php echo htmlspecialchars($error); ?></p>
      <?php endif; ?>

      <form method="POST" action="">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="email@example.com" required>

        <label for="password">Fjalekalimi</label>
        <input id="password" name="password" type="password" placeholder="Shkruaj fjalekalimin" required>

        <button type="submit">Kycu</button>
      </form>

      <p class="auth-footer">Nuk ke llogari? <a href="register.php">Regjistrohu</a></p>
    </section>
  </main>
</body>
</html>

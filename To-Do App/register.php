<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    // Perform validation (e.g., check if the passwords match)
    if ($password !== $confirmPassword) {
        echo "Error: Passwords do not match.";
        return;
    }

    // TODO: Perform additional validation and sanitization of the form data

    // TODO: Implement code to insert the user data into your database or user management system

    // Registration successful
    echo "Registration successful. Welcome, $username!";
} else {
    // Display the registration form
?>
<!DOCTYPE html>
<html>
<head>
  <title>User Registration Form</title>
</head>
<body>
  <h3>Sign up!</h3>
  <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br><br>

    <label for="confirm_password">Confirm Password:</label>
    <input type="password" id="confirm_password" name="confirm_password" required><br><br>

    <input type="submit" value="Register">
  </form>
</body>
</html>
<?php
}
?>


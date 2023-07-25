<?php
$servername = "localhost";
$username = "wozbqqjm_db";
$password = "ZQ(D4;x+jkjo";
$dbname = "wozbqqjm_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST)){

    $name = $_POST["name"];
    $email = $_POST["email"];
    
    $sql = "INSERT INTO Guests (fullname, email)
    VALUES ('{$name}', '{$email}')";
    
    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

}


$conn->close();
?>
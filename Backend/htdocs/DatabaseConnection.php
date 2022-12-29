<?php

# Setup SQL connection ... 

$ServerName = "sql206.epizy.com";

$username = "epiz_32934333";

$password = "4xTyIkkkOfQJ";

$Database = "epiz_32934333_Shaktigold" ; 

// Create Database connection ... 

$conn = new mysqli($ServerName, $username, $password , $Database);

// Check Database connection ... 

if ($conn->connect_error) {

  die("Connection failed: " . $conn->connect_error);

}

?>
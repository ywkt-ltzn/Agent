
<?php
    session_start(); 
		if (isset($_SESSION["email"])){
			$email = $_SESSION["email"];
		}
		else{
			$email = $_GET["email"];
			
			$_SESSION["email"] = $email;
		}

        $sessions = array();

        $sessions['email'] = $_SESSION["email"];

        header('Content-Type: application/json');
        echo json_encode($sessions);

	
?>
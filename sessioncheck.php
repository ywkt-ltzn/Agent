
<?php
header('Content-Type: application/json');
    session_start(); 
		if (isset($_SESSION["email"])){
			$email = $_SESSION["email"];
			
			echo json_encode(array("status"=>"success",
			"uemail"=>$email));
		}
		else{
			echo json_encode(array("status"=>"fail"));
		}

?>

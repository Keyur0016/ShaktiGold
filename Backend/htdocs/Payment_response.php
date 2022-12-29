<?php

$Status = $_GET['Status'] ; 
$Userid_value = $_GET['User_id'] ; 
$Mobile_number_value = $_GET['Mobile_number'] ; 
$Order_id_value = $_GET['Order_id'] ; 

require './DatabaseConnection.php' ; 

if ($Status == "Payment_fail"){
    $Order_id = $Order_id_value  ; 
    $User_id = $Userid_value ; 
    $Mobile_number = $Mobile_number_value ; 

    mysqli_autocommit($conn, false) ; 

    // Response array 
    $Response = array()  ; 
    
    function UpdateData($data){
        global $Response; 
        array_push($Response, $data) ; 
    }

    try{

        // Update Payment fail information in user table 

        $Payment_fail_information_useTable = "UPDATE `$User_id` SET `Data2` = 'Online payment failed', `Data3` = 'Payment failed' WHERE `Data1` =                  '$Order_id' " ;
        $Payment_fail_information_useTable = mysqli_query($conn, $Payment_fail_information_useTable) ; 
        
        // Delete payment fail information from order data table
        $Delete_order_data_from_OrderTable = "DELETE FROM `Order_data` WHERE `Order_id` = '$Order_id' "; 
        $Delete_order_data_from_OrderTable = mysqli_query($conn, $Delete_order_data_from_OrderTable) ; 

        // Fetch Product data from Order_product_data 
        $Fetch_order_product_data_query = "SELECT `Product_id`, `Category_id` FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
        $Fetch_order_product_data_query = mysqli_query($conn, $Fetch_order_product_data_query) ; 
        $Fetch_order_product_data_query_result = mysqli_fetch_all($Fetch_order_product_data_query, MYSQLI_ASSOC) ; 
    
        for($i = 0 ; $i<count($Fetch_order_product_data_query_result); $i++){
            $Product_id = $Fetch_order_product_data_query_result[$i]['Product_id']; 
            $Category_id = $Fetch_order_product_data_query_result[$i]['Category_id'] ; 

            $Update_product_status_query = "UPDATE `$Category_id` SET `Product_sold_status` = 'Yes' WHERE `Product_id` = '$Product_id' ";
            $Update_product_status_query = mysqli_query($conn, $Update_product_status_query) ;  
        }

        // Order Payment failed information message 

        $Information_message = "Your order payment failed on Shree Shakti Gold order"; 

        $fields = array(
        "sender_id" => "TXTIND",
        "message" => $Information_message,
        "route" => "v3",
        "numbers" => $Mobile_number,
        );

        $curl = curl_init();
        
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($fields),
        CURLOPT_HTTPHEADER => array(
            "authorization: WFVyc8vmqoHP1g7K9wOM2istjNbQ3hXaDeJIlZR4n0zGdA5Lrpr1wJlFfgXj0Y6tvZTGqUzCs4kemxD2",
            "accept: */*",
            "cache-control: no-cache",
            "content-type: application/json"
        ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        mysqli_commit($conn) ;
        $Response = array("Status" => "Payment_fail" ); 
        UpdateData($Response) ; 
        

    }catch(Exception $e){

        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed"); 
        UpdateData($Response) ; 
    }
} else{

    $Payment_id = $_GET['Payment_id']; 

    // Response array 
    $Response = array()  ; 
    
    function UpdateData($data){
        global $Response; 
        array_push($Response, $data) ; 
    }
    
    mysqli_autocommit($conn, false) ; 

    try{

        // Update Payment status in user table 
        $Update_payment_id_userTable = "UPDATE `$Userid_value` SET `Data2` = 'Online payment', `Data3` = 'Payment success', `Data4` = '$Payment_id' WHERE          `Data1` = '$Order_id_value' " ; 
        // echo $Update_payment_id_userTable ; 
        $Update_payment_id_userTable = mysqli_query($conn, $Update_payment_id_userTable) ; 

        // Update Payment status in order table 
        $Update_payment_id_orderTable = "UPDATE `Order_data` SET `Order_status` = 'Online payment', `Payment_method` = 'Payment success', `Payment_id` =           '$Payment_id' WHERE `Order_id` = '$Order_id_value' "; 
        $Update_payment_id_orderTable = mysqli_query($conn, $Update_payment_id_orderTable); 
        
        mysqli_commit($conn) ; 

        // Place order information message 
        $Information_message = "Your order place successfully on Shree Shakti Gold.For query contact us on +919824113124"; 

        $fields = array(
        "sender_id" => "TXTIND",
        "message" => $Information_message,
        "route" => "v3",
        "numbers" => $Mobile_number_value,
        );

        $curl = curl_init();
        
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($fields),
        CURLOPT_HTTPHEADER => array(
            "authorization: WFVyc8vmqoHP1g7K9wOM2istjNbQ3hXaDeJIlZR4n0zGdA5Lrpr1wJlFfgXj0Y6tvZTGqUzCs4kemxD2",
            "accept: */*",
            "cache-control: no-cache",
            "content-type: application/json"
        ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);

        $Response = array("Status" => "Payment success"); 
        UpdateData($Response) ; 

    }catch(Exception $e){
        
        mysqli_rollback($conn) ; 

        $Response = array("Status" => "Network request failed") ; 
        UpdateData($Response) ; 
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="Payment_response.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Mukta:wght@500&family=Ubuntu:wght@400;500&display=swap" rel="stylesheet">
    <style>
        *{
            padding: 0%;
            margin: 0%;
        }

        #Loading_layout{
            height: 100vh;
            width: 100vw;
            background-color: rgba(71, 71, 71, 0.772);
            display: flex;
            text-align: center;
            justify-content: center;
        }

        #Loading_information{
            margin: auto;
            background-color: white;
            font-family: 'Ubuntu', sans-serif;
            font-size: 18px;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div id="Loading_layout">
        <div id="Loading_information">
            Processing
        </div>
        
    </div>
    <script>
      
        var response  ;
  
        response = '<?= json_encode($Response[0]) ?>' ; 
        window.ReactNativeWebView.postMessage(response) ;  
        
    </script>
</body>
</html>
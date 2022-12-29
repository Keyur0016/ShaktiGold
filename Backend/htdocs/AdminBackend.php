<?php

require "./DatabaseConnection.php" ; 

session_start() ; 

$Option = $_POST['Option'] ; 

if ($Option == "Check_password"){

    $Admin_password = $_POST['Admin_password'] ; 
    
    try{

        $Fetch_password_query = "SELECT * FROM `admin` WHERE  `admin_name` = 'Shaktigold' ";
        $Fetch_password_query = mysqli_query($conn, $Fetch_password_query); 
           
        $Fetch_password_query_data = mysqli_fetch_all($Fetch_password_query, MYSQLI_ASSOC); 
            
        $AdminPassword = $Fetch_password_query_data[0]['admin_password']; 

        if ($Admin_password != $AdminPassword){
            
            echo "InvalidPassword" ; 
        }
        else{
             
            $cookie_name = "admin";
            $cookie_value = "Yes";
            setcookie($cookie_name, $cookie_value, time() + (86400 * 7), "/");
            echo "ValidPassword" ; 
        }

    }catch(Exception $e){
        echo "Error" ;   
    }
    
}
else if ($Option == "Pending_order"){

    try{
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Pending' OR `Order_status` = 'Online payment' " ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }
        
        $_SESSION['Order_status'] = "Pending" ; 

        if(isset($_SESSION['Order_information'])){
            unset($_SESSION['Order_information']) ; 
            $_SESSION['Order_information'] = $Order_id ; 
        }
        else{
            $_SESSION['Order_information'] = $Order_id ; 
        }

        echo "FetchData" ; 
        
    }catch(Exception $e){
        echo "Error" ; 
    }
}
else if ($Option == "Server_cancel_order_fetch"){
    try{
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'Server-cancel' " ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;
        
        // Order id array
        $Order_id = array() ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }
        
        $_SESSION['Order_status'] = "Server-cancel" ; 

        if(isset($_SESSION['Order_information'])){
            unset($_SESSION['Order_information']) ; 
            $_SESSION['Order_information'] = $Order_id ; 
        }
        else{
            $_SESSION['Order_information'] = $Order_id ; 
        }

        echo "FetchData" ; 
        
    }catch(Exception $e){
        echo "Error" ; 
    }   
}
else if ($Option == "Load_user"){

    try{

        $Load_user_data = "SELECT * FROM `userdata` "; 
        $Load_user_data = mysqli_query($conn, $Load_user_data ); 
        $Load_user_data_result = mysqli_fetch_all($Load_user_data, MYSQLI_ASSOC) ;

        if (isset($_SESSION['userdata'])){
            unset($_SESSION['userdata']) ; 
        }

        $_SESSION['userdata'] = $Load_user_data_result ; 

        echo "Fetch" ; 
    }
    catch (Exception $e){
        echo "Error"; 
    }
} 
else if ($Option == "Search_user"){
    try{
        $Username = $_POST['Username'] ; 
        $Search_word = "%".$Username."%" ; 
        
        $Search_user_query = "SELECT * FROM `userdata` WHERE `Username` LIKE '$Search_word' OR `Mobilenumber` LIKE '$Search_word' " ; 
        $Search_user_query = mysqli_query($conn, $Search_user_query) ; 
        $Search_user_query_result = mysqli_fetch_all($Search_user_query, MYSQLI_ASSOC) ;  

        if (isset($_SESSION['userdata'])){
            unset($_SESSION['userdata']) ; 
        }

        if (count($Search_user_query_result) == 0){
            echo 'NotFound'; 
        }
        else{
            $_SESSION['userdata'] = $Search_user_query_result ; 
            echo "Fetch"; 
        }
    }
    catch(Exception $e){
        echo "Error"; 
    }
}
else if ($Option == "User-cancel-order"){
    try{
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_status` = 'User-cancel' " ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ; 
        
        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }
        
        $_SESSION['Order_status'] = "User-cancel"; 

        if(isset($_SESSION['Order_information'])){
            unset($_SESSION['Order_information']) ; 
            $_SESSION['Order_information'] = $Order_id ; 
        }
        else{
            $_SESSION['Order_information'] = $Order_id ; 
        }

        echo "FetchData" ; 
        
    }catch(Exception $e){
        echo "Error" ; 
    }
}
else if ($Option == "Server-cancel-order"){
    
    $User_id = $_POST['Userid'] ; 
    $Mobile_number = $_POST['Mobile_number'] ; 
    $Order_id = $_POST['Order_id'] ; 
    $Cancel_date = $_POST['Cancel_date'] ; 
    $Cancel_reason = $_POST['Cancel_reason'] ; 
    
    mysqli_autocommit($conn, false) ; 
    
    try{
    
        $User_table_update = "UPDATE `$User_id` SET `Data2` = 'Server-cancel', `Data6` = '$Cancel_date', `Data7` = '$Cancel_reason' WHERE `Data1` = '$Order_id'  " ; 
        $User_table_update = mysqli_query($conn, $User_table_update) ; 
        
        $Server_cancel_update = "UPDATE `Order_data` SET `Order_status` = 'Server-cancel', `Order_deliver_date` = '$Cancel_date', `Order_cancel_reason` = '$Cancel_reason' WHERE `Order_id` = '$Order_id'" ; 
        $Server_cancel_update = mysqli_query($conn, $Server_cancel_update) ; 
        
        // Information message 1 

        $Information_message1 = "You order on Shree Shakti Gold canceled "; 

        $fields = array(
        "sender_id" => "TXTIND",
        "message" => $Information_message1,
        "route" => "v3",
        "numbers" => $Mobile_number
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

        // Information message 2
        
        $Information_message2 = "Order cancel reason ".$Cancel_reason; 

        $fields = array(
        "sender_id" => "TXTIND",
        "message" => $Information_message2,
        "route" => "v3",
        "numbers" => $Mobile_number
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
        
        echo "Cancel" ; 
        mysqli_commit($conn) ; 

    }catch(Exception $e){

        mysqli_rollback($conn) ; 
                  
        echo "Error" ; 
    }
}
else if ($Option == "Total_weight"){
    try{
        
        $Fetch_category_id_query = "SELECT * FROM `category` " ; 
        $Fetch_category_id_query = mysqli_query($conn, $Fetch_category_id_query); 
        $Fetch_category_id_query_row_result = mysqli_fetch_all($Fetch_category_id_query, MYSQLI_ASSOC) ; 

        $Gold_product_array = array() ; 
        $Gold_total_weight = 0 ; 
        $Gold_order_weight = 0 ; 

        $Silver_product_array = array() ; 
        $Silver_total_weight = 0 ; 
        $Silver_order_weight = 0 ; 

        for($i = 0 ; $i<count($Fetch_category_id_query_row_result); $i++){
             
            $Category_table = $Fetch_category_id_query_row_result[$i]['Category_table'] ; 
            $Category_option = $Fetch_category_id_query_row_result[$i]['Category_option'] ; 
            $Category_name = $Fetch_category_id_query_row_result[$i]['Category_name'] ; 
            $Category_image = $Fetch_category_id_query_row_result[$i]['Category_image'] ; 

            // Fetch application view product weight 

            $Count_category_weight_query = "SELECT SUM(`Product_weight`) AS `Count` FROM `$Category_table` WHERE `Product_sold_status` = 'Yes' " ; 
            $Count_category_weight_query = mysqli_query($conn, $Count_category_weight_query) ; 
            $Count_category_weight_query_result = mysqli_fetch_all($Count_category_weight_query, MYSQLI_ASSOC) ;

            if ($Category_option == "Gold"){

                $Gold_total_weight = $Gold_total_weight + $Count_category_weight_query_result[0]['Count'] ; 
            }
            else{
                $Silver_total_weight = $Silver_total_weight + $Count_category_weight_query_result[0]['Count'] ; 
            }
            

            // Fetch application order product weight 

            $Count_category_product_order_weight = "SELECT SUM(`Product_weight`) AS `Count` FROM `$Category_table` WHERE `Product_sold_status` = 'No' "; 
            $Count_category_product_order_weight = mysqli_query($conn, $Count_category_product_order_weight) ; 
            $Count_category_product_order_weight_result = mysqli_fetch_all($Count_category_product_order_weight, MYSQLI_ASSOC) ; 

            if ($Category_option == "Gold"){
                $Gold_order_weight = $Gold_order_weight + $Count_category_product_order_weight_result[0]['Count'] ; 
            }
            else{
                $Silver_order_weight = $Silver_order_weight + $Count_category_product_order_weight_result[0]['Count'] ; 
            }

            if ($Category_option == "Gold"){
                array_push($Gold_product_array, array($Category_name, $Category_image ,($Count_category_weight_query_result[0]['Count']+$Count_category_product_order_weight_result[0]['Count']))) ; 
            }
            else{
                array_push($Silver_product_array, array($Category_name,$Category_image ,($Count_category_weight_query_result[0]['Count']+$Count_category_product_order_weight_result[0]['Count']))) ; 
            }

        }
        
        if (isset($_SESSION['Gold_total_weight'])){
            unset($_SESSION['Gold_total_weight']) ; 
            unset($_SESSION['Silver_total_weight']) ; 
            unset($_SESSION['Gold_order_weight']) ; 
            unset($_SESSION['Silver_order_weight']) ; 
            unset($_SESSION['Gold_product_data']) ; 
            unset($_SESSION['Silver_product_data']) ; 
        }

        $_SESSION['Gold_total_weight'] = $Gold_total_weight ;
        $_SESSION['Silver_total_weight'] = $Silver_total_weight ; 
        $_SESSION['Gold_order_weight'] = $Gold_order_weight ; 
        $_SESSION['Silver_order_weight'] = $Silver_order_weight ; 
        $_SESSION['Gold_product_data'] = $Gold_product_array ; 
        $_SESSION['Silver_product_data'] = $Silver_product_array ; 
        
        echo "Fetch" ; 

    }catch(Exception $e){
        echo "Error"; 
    }
}
else if ($Option == "Today_order"){

    $OrderDate = $_POST['Date'] ; 

    try{

        // Order id store
        $Order_id_array = array() ; 

        $Today_order_query = "SELECT * FROM `Order_data` WHERE `Order_place_date` = '$OrderDate' " ; 
        $Today_order_query = mysqli_query($conn, $Today_order_query) ; 
        $Today_order_query_result = mysqli_fetch_all($Today_order_query, MYSQLI_ASSOC) ;
        
        for ($i = 0 ; $i<count($Today_order_query_result); $i++){
            $Temp_order_id = $Today_order_query_result[$i]['Order_id'];
            array_push($Order_id_array, $Temp_order_id);  
        }

        $Gold_weight_found = "SELECT SUM(`Product_weight`) AS `Count`, SUM(`Product_discount_price`) AS `Discount_price` FROM `Order_product_data` WHERE `Product_type` = 'Gold' AND `Order_id` IN ( '" . implode( "', '", $Order_id_array ) . "' ) " ; 
        $Gold_weight_found = mysqli_query($conn, $Gold_weight_found) ; 
        $Gold_weight_found_result = mysqli_fetch_all($Gold_weight_found, MYSQLI_ASSOC); 
        
        $Silver_weight_found = "SELECT SUM(`Product_weight`) AS `Count`, SUM(`Product_discount_price`) AS `Discount_price` FROM `Order_product_data` WHERE `Product_type` = 'Silver' AND `Order_id` IN ( '" . implode( "', '", $Order_id_array ) . "' ) " ; 
        $Silver_weight_found = mysqli_query($conn, $Silver_weight_found) ; 
        $Silver_weight_found_result = mysqli_fetch_all($Silver_weight_found, MYSQLI_ASSOC);

        if (isset($_SESSION['Today_order'])){
            unset($_SESSION['Today_order']) ; 
        }

        $_SESSION['Today_order'] = $Today_order_query_result ; 
        $_SESSION['Today_order_gold_weight'] = $Gold_weight_found_result[0]['Count']; 
        $_SESSION['Today_order_gold_discount_price'] = $Gold_weight_found_result[0]['Discount_price']; 
        $_SESSION['Today_order_silver_weight'] = $Silver_weight_found_result[0]['Count'] ; 
        $_SESSION['Today_order_silver_discount_price'] = $Silver_weight_found_result[0]['Discount_price'] ; 
        
        echo "FetchData" ;

    }catch(Exception $e){
        echo "Error" ; 
    }
}
else if ($Option == "Week_order"){

    $Week_order_date = array() ; 

    // Week Day1 Date
    $t = strtotime("-1 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day2 Date
    $t = strtotime("-2 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day3 Date
    $t = strtotime("-3 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day4 Date
    $t = strtotime("-4 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day5 Date
    $t = strtotime("-5 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day6 Date
    $t = strtotime("-6 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 

    // Week Day7 Date
    $t = strtotime("-7 days");
    $t = date("j-m-Y", $t);
    array_push($Week_order_date, $t); 
    
    try{

        // Order id store
        $Order_id_array = array() ; 

        $Today_order_query = "SELECT * FROM `Order_data` WHERE `Order_place_date` IN ( '" . implode( "', '", $Week_order_date ) . "' ) " ; 
        $Today_order_query = mysqli_query($conn, $Today_order_query) ; 
        $Today_order_query_result = mysqli_fetch_all($Today_order_query, MYSQLI_ASSOC) ;
        
        for ($i = 0 ; $i<count($Today_order_query_result); $i++){
            $Temp_order_id = $Today_order_query_result[$i]['Order_id'];
            array_push($Order_id_array, $Temp_order_id);  
        }

        $Gold_weight_found = "SELECT SUM(`Product_weight`) AS `Count`, SUM(`Product_discount_price`) AS `Discount_price`, SUM(`Product_retail_price`) AS `Retail_price` FROM `Order_product_data` WHERE `Product_type` = 'Gold' AND `Order_id` IN ( '" . implode( "', '", $Order_id_array ) . "' ) " ; 
        $Gold_weight_found = mysqli_query($conn, $Gold_weight_found) ; 
        $Gold_weight_found_result = mysqli_fetch_all($Gold_weight_found, MYSQLI_ASSOC); 
        
        $Silver_weight_found = "SELECT SUM(`Product_weight`) AS `Count`, SUM(`Product_discount_price`) AS `Discount_price`, SUM(`Product_retail_price`) AS `Retail_price` FROM `Order_product_data` WHERE `Product_type` = 'Silver' AND `Order_id` IN ( '" . implode( "', '", $Order_id_array ) . "' ) " ; 
        $Silver_weight_found = mysqli_query($conn, $Silver_weight_found) ; 
        $Silver_weight_found_result = mysqli_fetch_all($Silver_weight_found, MYSQLI_ASSOC);

        if (isset($_SESSION['Today_order'])){
            unset($_SESSION['Today_order']) ; 
        }

        $_SESSION['Today_order'] = $Today_order_query_result ; 
        $_SESSION['Today_order_gold_weight'] = $Gold_weight_found_result[0]['Count']; 
        $_SESSION['Today_order_gold_retail_price'] = $Gold_weight_found_result[0]['Retail_price']; 
        $_SESSION['Today_order_gold_discount_price'] = $Gold_weight_found_result[0]['Discount_price']; 
        $_SESSION['Today_order_silver_weight'] = $Silver_weight_found_result[0]['Count'] ; 
        $_SESSION['Today_order_silver_retail_price'] = $Silver_weight_found_result[0]['Retail_price'] ; 
        $_SESSION['Today_order_silver_discount_price'] = $Silver_weight_found_result[0]['Discount_price'] ; 

        echo "FetchData" ;

    }catch(Exception $e){
        echo "Error"; 
    }
} 
else if ($Option == "Search_by_order_id"){

    $Order_id_value = $_POST['Order_id'] ; 

    try{
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_id` = '$Order_id_value' " ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;

        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }
        
        if(isset($_SESSION['Order_information'])){
            unset($_SESSION['Order_information']) ; 
            $_SESSION['Order_information'] = $Order_id ; 
        }
        else{
            $_SESSION['Order_information'] = $Order_id ; 
        }

        echo "FetchData" ; 
        
    }catch(Exception $e){
        echo "Error" ; 
    }
} 
else if ($Option == "Search_by_order_date"){

    $Order_date = $_POST["Order_date"] ; 


    try{
        $Pending_order_query = "SELECT * FROM `Order_data` WHERE `Order_place_date` = '$Order_date' " ; 
        $Pending_order_query = mysqli_query($conn, $Pending_order_query) ; 
        $Pending_order_query_result = mysqli_fetch_all($Pending_order_query, MYSQLI_ASSOC) ;

        // Order id array
        $Order_id ; 
        
        for($i = 0 ; $i<count($Pending_order_query_result); $i++){
            $Order_id[$i] = [$Pending_order_query_result[$i]] ; 
        
            // Temp order id 
            $Temp_order_id = $Pending_order_query_result[$i]['Order_id'];
        
            // Select Product data from `Order_product_data` table 
            $Select_order_product_data_query = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Temp_order_id'" ; 
            $Select_order_product_data_query = mysqli_query($conn, $Select_order_product_data_query) ; 
            $Select_order_product_data_query_result = mysqli_fetch_all($Select_order_product_data_query, MYSQLI_ASSOC) ; 
        
            array_push($Order_id[$i], $Select_order_product_data_query_result) ; 
        }
        
        if(isset($_SESSION['Order_information'])){
            unset($_SESSION['Order_information']) ; 
            $_SESSION['Order_information'] = $Order_id ; 
        }
        else{
            $_SESSION['Order_information'] = $Order_id ; 
        }

        echo "FetchData" ; 
        
    }catch(Exception $e){
        echo "Error" ; 
    }
} 
else if ($Option == "Fetch_refund_id"){
    try{

        $Fetch_refund_payment_id_query = "SELECT * FROM `refund_payment_data` WHERE `Refund_status` = 'Pending' " ; 
        $Fetch_refund_payment_id_query = mysqli_query($conn, $Fetch_refund_payment_id_query) ; 
        $Fetch_refund_payment_id_query_data = mysqli_fetch_all($Fetch_refund_payment_id_query, MYSQLI_ASSOC) ; 

        if (isset($_SESSION['Refund_payment_data'])){
            unset($_SESSION['Refund_payment_data']) ; 
        }

        $_SESSION['Refund_payment_data'] = $Fetch_refund_payment_id_query_data ; 
        echo "Fetch" ; 

    }catch(Exception $e){
        echo "Error"; 
    }
}
else if ($Option == "Fetch_refunded_id"){
    try{

        $Fetch_refund_payment_id_query = "SELECT * FROM `refund_payment_data` WHERE `Refund_status` = 'Refund' " ; 
        $Fetch_refund_payment_id_query = mysqli_query($conn, $Fetch_refund_payment_id_query) ; 
        $Fetch_refund_payment_id_query_data = mysqli_fetch_all($Fetch_refund_payment_id_query, MYSQLI_ASSOC) ; 

        if (isset($_SESSION['Refund_payment_data'])){
            unset($_SESSION['Refund_payment_data']) ; 
        }

        $_SESSION['Refund_payment_data'] = $Fetch_refund_payment_id_query_data ; 
        echo "Fetch" ; 

    }catch(Exception $e){
        echo "Error"; 
    }
}
else if ($Option == "Update_refund_id"){

    $Refund_payment_order_id = $_POST['order_id'] ; 
    $Refund_payment_user_id = $_POST['user_id'] ; 
    $Refund_payment_mobile_number = $_POST['number'] ; 

    try{

        // Update Refund data table
        $Update_refund_order_id_query = "UPDATE `refund_payment_data` SET `Refund_status` = 'Refund' WHERE `Order_id` = '$Refund_payment_order_id' ";
        $Update_refund_order_id_query = mysqli_query($conn, $Update_refund_order_id_query); 

        // Update Refund status in order data table 
        $Update_order_status_in_order_table = "UPDATE `Order_data` SET `Refund_status` = 'Yes' WHERE `Order_id` = '$Refund_payment_order_id' "; 
        $Update_order_status_in_order_table = mysqli_query($conn, $Update_order_status_in_order_table); 

        // Update Refund status in user data table 
        $Update_order_status_in_user_table = "UPDATE `$Refund_payment_user_id` SET `Data15` = 'Yes' WHERE `Option` = 'Order' AND `Data1` =                         '$Refund_payment_order_id' "; 
        $Update_order_status_in_user_table = mysqli_query($conn, $Update_order_status_in_user_table); 

        // Information message 1 

        $Information_message1 = "Your order payment refund successfully by Shree Shakti Gold Jewellers"; 

        $fields = array(
        "sender_id" => "TXTIND",
        "message" => $Information_message1,
        "route" => "v3",
        "numbers" => $Refund_payment_mobile_number
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

        echo "Update" ;  

    }catch(Exception $e){
        echo "Error" ; 
    }
}
else if ($Option == "Unrefund_payment_id"){

    $Refund_payment_order_id = $_POST['order_id'] ; 
    $Refund_payment_user_id = $_POST['user_id'] ; 
    $Refund_payment_mobile_number = $_POST['number'] ; 


    try{

        // Update Refund data table
        $Update_refund_order_id_query = "UPDATE `refund_payment_data` SET `Refund_status` = 'Pending' WHERE `Order_id` = '$Refund_payment_order_id' ";
        $Update_refund_order_id_query = mysqli_query($conn, $Update_refund_order_id_query); 

        // Update Refund status in order data table 
        $Update_order_status_in_order_table = "UPDATE `Order_data` SET `Refund_status` = 'No' WHERE `Order_id` = '$Refund_payment_order_id' "; 
        $Update_order_status_in_order_table = mysqli_query($conn, $Update_order_status_in_order_table); 

        // Update Refund status in user data table 
        $Update_order_status_in_user_table = "UPDATE `$Refund_payment_user_id` SET `Data15` = 'No' WHERE `Option` = 'Order' AND `Data1` =                         '$Refund_payment_order_id' "; 
        $Update_order_status_in_user_table = mysqli_query($conn, $Update_order_status_in_user_table); 

    }catch(Exception $e){
        echo "Error"; 
    }
}
?>
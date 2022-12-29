
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<?php

    $InputData = (array)json_decode($_GET["data"]) ;
    require './DatabaseConnection.php' ;
    
    // Response array 
    $Response = array()  ; 
    
    function UpdateData($data){
        global $Response; 
        array_push($Response, $data) ; 
    }

    // OTP send Authentication key 
    $AuthenticationKey = "WFVyc8vmqoHP1g7K9wOM2istjNbQ3hXaDeJIlZR4n0zGdA5Lrpr1wJlFfgXj0Y6tvZTGqUzCs4kemxD2"; 
    
    if ($InputData['Check_status'] == "Signup_check"){

        // Functionality check Mobile number register or not and send otp to register Mobile number 

        $MobileNumber = $InputData['Mobilenumber'];
        
        try{
        
            // 1. Execute Query 
            $Check_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' " ; 
            $Check_mobile_number_query = mysqli_query($conn, $Check_mobile_number_query); 
        
            // 2. Row count 
            $Check_mobile_number_query_row_count = mysqli_num_rows($Check_mobile_number_query); 
        
            if ($Check_mobile_number_query_row_count > 0){
                
                $Temp_data = array("Status" => "Mobile number already register") ;
                UpdateData($Temp_data) ; 
            }
            else{

                // 3. Create Verification code 
                $Verification_code_data = "1234567890";
                $Verification_code_data = str_shuffle($Verification_code_data);
                $Verification_code = substr($Verification_code_data, 0, 4);

                // 4. Send Verification code to Mobile number 
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2?authorization=".$AuthenticationKey."&variables_values=$Verification_code&route=otp&        numbers=" . urlencode($MobileNumber),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_SSL_VERIFYHOST => 0,
                    CURLOPT_SSL_VERIFYPEER => 0,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                    CURLOPT_HTTPHEADER => array(
                        "cache-control: no-cache"
                    ),
                ));


                $Temp_data = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                $curl_Temp_data = json_decode($Temp_data, true);

                if ($curl_Temp_data['return'] == true){
                    
                    // 5. Send Temp_data
                    $Temp_data = array("Status" => "OTP send", "OTP" =>  $Verification_code); 
                    UpdateData($Temp_data) ; 
                }
                else{

                    // 6. Send Temp_data 
                    $Temp_data = array("Status" => "OTP send failed"); 
                    UpdateData($Temp_data) ;  
                }
            }

        
        }catch (Exception $e){

            // 1. Temp_data 
            $Temp_data = array("Status" => "Network request failed"); 
            UpdateData($Temp_data) ; 
        }
    
    } else if ($InputData['Check_status'] == "Signup"){
   
        // Functionality which create user entry in Userdata table and
        // Create User particular table 

        $Username = $InputData['Username']; 
        $MobileNumber = $InputData['Mobilenumber']; 
        $Password = $InputData['Password'] ; 
        $Notification_id = $InputData['Notification_id'] ; 
        
        mysqli_autocommit($conn, false); 
        
        try{

            // Create hash password 
            $HashPassword = password_hash($Password, PASSWORD_DEFAULT); 

            // Create user table id
            $Data = "abcdefghijklmnopqrstuvwxyz";
            $Data = str_shuffle($Data); 
            $Tablename = substr($Data, 0, 15);  

            // Create Table query 
            
            $Create_table_query = "CREATE TABLE `$Tablename` (
                `User_key` int NOT NULL AUTO_INCREMENT  ,
                `Option` varchar(100), 
                `Data1` varchar(200),
                `Data2` varchar(200),
                `Data3` varchar(200),
                `Data4` varchar(200),
                `Data5` varchar(200),
                `Data6` varchar(200),
                `Data7` varchar(200),
                `Data8` varchar(200),
                `Data9` varchar(200),
                `Data10` varchar(100), 
                `Data11` varchar(100), 
                `Data12` varchar(100), 
                `Data13` varchar(100), 
                `Data14` varchar(100),
                `Data15` varchar(100),
                PRIMARY KEY(User_key)
            )"; 

            $Create_table_query = mysqli_query($conn, $Create_table_query); 

            // Insert required data into user table 

            $Insert_user_required_data = "INSERT INTO `$Tablename` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`)
            VALUES (NULL, 'cart-id', '0', '', '', '', '', '', ''), (NULL, 'address', '0', '', '', '', '', '', '') ";
            
            $Insert_user_required_data = mysqli_query($conn, $Insert_user_required_data); 

            // Insert userdata query 
            $Insert_userdata_query = "INSERT INTO `userdata` (`Userid`, `Username`, `Mobilenumber`, `Password`, `Tablename`, `Account_create_time`,                   `Notification_id`) 
            VALUES (NULL, '$Username', '$MobileNumber', '$HashPassword', '$Tablename', current_timestamp(), '$Notification_id') "; 

            $Insert_userdata_query = mysqli_query($conn , $Insert_userdata_query); 

            mysqli_commit($conn) ; 

            $Temp_data = array("Status" => "Insert data", "Table" => $Tablename); 
            UpdateData($Temp_data) ; 

        }catch(Exception $e){
            
            mysqli_rollback($conn); 

            // Send Response 
            $Temp_data = array("Status" => "Network request failed"); 
            UpdateData($Temp_data) ; 

        }
    } else if ($InputData['Check_status'] == "Signin"){

        // Functionality check user signin process 
        $MobileNumber = $InputData['Mobilenumber']; 
        $UserPassword = $InputData['Password'] ; 

        mysqli_autocommit($conn, false) ; 

        try{

            // Fetch user hash password 

            $User_password_fetch_query = "SELECT `Password`, `Tablename`, `Username` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' "; 
            $User_password_fetch_query = mysqli_query($conn, $User_password_fetch_query); 
            $User_password_fetch_query_data = mysqli_fetch_all($User_password_fetch_query, MYSQLI_ASSOC); 

            if (count($User_password_fetch_query_data) == 0){

                $Temp_data = array("Status" => "Mobile number not register"); 
                UpdateData($Temp_data) ; 
            }
            else{

                $HashPassword = $User_password_fetch_query_data[0]['Password'];
                $UserTable = $User_password_fetch_query_data[0]['Tablename'] ;  
                $Username = $User_password_fetch_query_data[0]['Username'] ; 
                
                if (password_verify($UserPassword, $HashPassword)){

                    $Temp_data = array("Status" => "Signin", "Tablename" => $UserTable, "Username" => $Username ); 
                    UpdateData($Temp_data) ;  
                }
                else{

                    $Temp_data = array("Status" => "Invalid Password"); 
                    UpdateData($Temp_data) ; 
                }
            }

        }catch (Exception $e){

            mysqli_rollback($conn); 

            $Temp_data = array("Status" => "Network request failed"); 
            UpdateData($Temp_data) ;  
        }
    } else if ($InputData['Check_status'] == "Send_otp"){

        // Functionality which send OTP to register mobile number when 
        // User click on Forget Password 
        $MobileNumber = $InputData['Mobilenumber'] ; 
        
        try{

            $Fetch_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' ";
            $Fetch_mobile_number_query = mysqli_query($conn, $Fetch_mobile_number_query); 
            $Fetch_mobile_number_query_row_count = mysqli_num_rows($Fetch_mobile_number_query); 

            if ($Fetch_mobile_number_query_row_count == 0){

                $Response = array("Status" => "Mobile number not register"); 
                UpdateData($Response) ; 
            }
            else{

                $Verification_code_data = "1234567890";
                $Verification_code_data = str_shuffle($Verification_code_data);
                $Verification_code = substr($Verification_code_data, 0, 4);

                // 4. Send Verification code to Mobile number 
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2?authorization=".$AuthenticationKey."&variables_values=$Verification_code&route=otp&numbers=" . urlencode($MobileNumber),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_SSL_VERIFYHOST => 0,
                    CURLOPT_SSL_VERIFYPEER => 0,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                    CURLOPT_HTTPHEADER => array(
                        "cache-control: no-cache"
                    ),
                ));


                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                $curl_response = json_decode($response, true);

                if ($curl_response['return'] == true){

                    $Response = array("Status" => "OTP send", "OTP" => $Verification_code); 
                    UpdateData($Response) ; 
                }
                else{

                    $Response = array("Status" => "OTP send failed"); 
                    UpdateData($Response) ;  
                }
            }
        }catch (Exception $e){

            $Response = array("Status" => "Network request failed");
            UpdateData($Response) ; 
        }
    
    } else if ($InputData['Check_status'] == "Update_notification_id"){
        // Notification id 
        $Notification_id = $InputData['notification_id']; 
        $Mobile_number = $InputData['number'] ; 

        try{

           $Update_notification_id_query = "UPDATE `userdata` SET `Notification_id` = '$Notification_id' WHERE `Mobilenumber` = '$Mobile_number' "; 
           $Update_notification_id_query = mysqli_query($conn, $Update_notification_id_query); 

           $Response = array("Status" => "Update"); 
           UpdateData($Response); 

        } catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;
        }
        
    }else if ($InputData['Check_status'] == "Update_password"){
        // Functionality which Update password of user account 

        $MobileNumber = $InputData['Mobilenumber']; 
        $Password = $InputData['Password'] ; 

        try{

            $HashPassword = password_hash($Password, PASSWORD_DEFAULT); 

            $Update_password_query = "UPDATE `userdata` SET `Password` = '$HashPassword' WHERE `Mobilenumber` = '$MobileNumber' "; 
            $Update_password_query = mysqli_query($conn, $Update_password_query); 

            $Response = array("Status" => "Update password"); 
            UpdateData($Response) ;  

        }catch (Exception $e){

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;  
        }
    } else if ($InputData['Check_status'] == "Fetch_address") {
    
        $Table_name = $InputData['Table_name'] ; 

        mysqli_autocommit($conn, false); 

        try{

            $Fetch_address_query = "SELECT * FROM `$Table_name` WHERE `Option` LIKE 'address-%' "; 
            $Fetch_address_query = mysqli_query($conn, $Fetch_address_query); 
            $Fetch_address_query_result = mysqli_fetch_all($Fetch_address_query, MYSQLI_ASSOC); 

            mysqli_commit($conn) ;

            $Response = array("Status" => "Fetch", "Address" => $Fetch_address_query_result) ; 
            UpdateData($Response) ; 

        }catch(Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }

    } else if ($InputData['Check_status'] == "Insert_address"){
    
        $Table_name = $InputData['Table_name']; 
        $Username = $InputData['Username']; 
        $Street_address = $InputData['Street_address'];
        $Area = $InputData['Area']; 
        $Landmark = $InputData['Landmark']; 
        $Pincode = $InputData['Pincode']; 

        mysqli_autocommit($conn, false); 

        try{

            // Fetch address id 

            $Fetch_address_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'address'"; 
            $Fetch_address_id = mysqli_query($conn, $Fetch_address_id); 
            $Fetch_address_id_result = mysqli_fetch_all($Fetch_address_id, MYSQLI_ASSOC);

            $Address_id_count = $Fetch_address_id_result[0]['Data1']; 
            $Address_id = "address-".$Address_id_count; 
        
            // Insert address data

            $Insert_address_query = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`) 
            VALUES (NULL, '$Address_id', '$Username', '$Street_address', '$Area', '$Landmark', '$Pincode', NULL, NULL) " ; 
            
            $Insert_address_query = mysqli_query($conn, $Insert_address_query); 
            
            // Update address id 

            $Update_address_id_count = (int)$Address_id_count; 
            $Update_address_id_count = $Update_address_id_count + 1; 

            $Update_address_id_query = "UPDATE `$Table_name` SET `Data1` = '$Update_address_id_count' WHERE `Option` = 'address' "; 
            $Update_address_id_query = mysqli_query($conn, $Update_address_id_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Insert"); 
            UpdateData($Response) ; 

        }catch (Exception $e){
            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Delete_address"){

        $Table_name = $InputData['Table_name']; 
        $Delete_address_id = $InputData['Delete_address_id'];

        mysqli_autocommit($conn, false); 

        try{

            // Delete address query

            $Delete_address_query = "DELETE FROM `$Table_name` WHERE `Option` = '$Delete_address_id' ";
            $Delete_address_query = mysqli_query($conn, $Delete_address_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Delete"); 
            UpdateData($Response) ;  


        }catch(Exception $e){
            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;
        }

    } else if ($InputData['Check_status'] == "Update_address"){
    
        // Update values .... 

        $Table_name = $InputData['Table_name'] ; 
        $Street_address = $InputData['Street_address'] ; 
        $Area = $InputData['Area'] ; 
        $Pincode = $InputData['Pincode'] ;  
        $Landmark = $InputData['Landmark'] ;
        $Username = $InputData['Username'] ; 
        $Address_id = $InputData['address_id']; 

        try{
            
            $Update_address_query = "UPDATE `$Table_name` SET `Data1` = '$Username', `Data2` = '$Street_address', 
            `Data3` = '$Area', `Data4` = '$Landmark', `Data5` = '$Pincode' WHERE `Option` = '$Address_id' " ;
            
            $Update_address_query = mysqli_query($conn, $Update_address_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Update"); 
            UpdateData($Response) ; 

        }catch(Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Status_image_insert"){
    
        $Image = $InputData['Status_image'] ; 

        try{

            $Insert_status_image_query = "INSERT INTO `banner` (`Banner_id`, `Option`, `Image`) VALUES (NULL, 'Status', '$Image') " ; 
            $Insert_status_image_query = mysqli_query($conn, $Insert_status_image_query) ; 

            $Response = array("Status" => "Insert_status") ; 
            UpdateData($Response) ;  
            
        }catch(Exception $e){

            $Response = array("Status" => "Network request failed") ; 
            UpdateData($Response) ;  
        }
    } else if ($InputData['Check_status'] == "Status_image_delete"){

        try{

            $Delete_previous_image_query = "DELETE FROM `banner` WHERE `Option` = 'Status' "; 
            $Delete_previous_image_query = mysqli_query($conn, $Delete_previous_image_query) ; 

            $Response = array("Status" => "Delete_status") ; 
            UpdateData($Response) ; 

        }catch(Exception $e){

            $Response = array("Status" => "Network request failed") ; 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Update_admin_password"){

        $Update_password = $InputData['Update_password'] ; 

        try{

            $Admin_password_query = "UPDATE `admin` SET `admin_password` = '$Update_password' WHERE `admin_name` = 'Shaktigold' " ; 
            $Admin_password_query = mysqli_query($conn, $Admin_password_query) ; 

            $Response = array("Status" => "Update_password") ; 
            UpdateData($Response) ;  

        }catch(Exception $e){

            $Response = array("Status" => "Network request failed") ;
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Create_category"){

        $CategoryName = $InputData['CategoryName']; 
        $CategoryOption = $InputData['CategoryOption'];
        $CategoryImage = $InputData['CategoryImage'] ; 
        $Option = $InputData['Update'] ; 
        $Last_name = $InputData['last_name'] ; 
        
        mysqli_autocommit($conn, false); 
        
        try{
                
            $Check_category_query = "SELECT `Category_name` FROM `category` WHERE `Category_name` = '$CategoryName' AND `Category_option` =                             '$CategoryOption' "; 
             
            $Check_category_query = mysqli_query($conn, $Check_category_query); 
            $Check_category_query_row_count = mysqli_num_rows($Check_category_query); 
             
            if ($Option == "0"){

                if ($Check_category_query_row_count == 0){
     
                    $Data = "abcdefghijklmnopqrstuvwxyz"; 
                    $Data = str_shuffle($Data); 

                    $Category_table_name = substr($Data, 0, 10); 

                    $Create_category_table_query = "CREATE TABLE `$Category_table_name` (
                        `Product_key` int NOT NULL AUTO_INCREMENT  , 
                        `Product_id` varchar(40),
                        `Product_information` varchar(500),
                        `Product_image1` varchar(1000),
                        `Product_image2` varchar(1000),
                        `Product_image3` varchar(1000), 
                        `Product_weight` varchar(100),
                        `Product_type` varchar(30),
                        `Product_size` varchar(30),
                        `Product_discount_price` varchar(100),
                        `Product_retail_price` varchar(100),
                        `Product_tag_number` varchar(100),
                        `Product_sold_status` varchar(100),
                        PRIMARY KEY(Product_key)
                    )"; 

                    $Create_category_table_query = mysqli_query($conn, $Create_category_table_query); 

                    $Insert_category_information_query = "INSERT INTO `category` (`Category_id`, `Category_name`, `Category_option`, `Category_image`,                         `Category_table`) 
                    VALUES (NULL, '$CategoryName', '$CategoryOption', '$CategoryImage', '$Category_table_name') "; 
                
                    $Insert_category_information_query = mysqli_query($conn, $Insert_category_information_query) ; 

                    mysqli_commit($conn) ; 

                    $Response = array("Status" => "Create successfully"); 
                    UpdateData($Response) ; 

                }
                else{

                    $Response = array("Status" => "Already create this category"); 
                    UpdateData($Response) ; 
                }
            }
            else{
                                
                $Update_category_query = "UPDATE `category` SET `Category_name` = '$CategoryName', `Category_image` = '$CategoryImage'
                WHERE `Category_name` = '$Last_name' AND `Category_option` = '$CategoryOption' " ; 
            
                $Update_category_query = mysqli_query($conn, $Update_category_query) ;                  
                mysqli_commit($conn) ; 

                $Response = array("Status" => "Update"); 
                UpdateData($Response) ; 

            }
        }catch(Exception $e){
            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Check_category"){

        $CategoryName = $InputData['CategoryName']; 
        $CategoryOption = $InputData['CategoryOption'] ; 

        try{

            $Check_category_query = "SELECT `Category_name` FROM `category` WHERE `Category_name` = '$CategoryName' AND `Category_option` = '$CategoryOption' " ;
            $Check_category_query = mysqli_query($conn, $Check_category_query) ; 
            $Check_category_query_row_count = mysqli_num_rows($Check_category_query); 

            if ($Check_category_query_row_count > 0){
                
                $Response = array("Status" => "Already create category"); 
                UpdateData($Response) ; 

            }
            else{

                $Response = array("Status" => "Not create"); 
                UpdateData($Response) ; 

            }
        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
            
        }
    } else if ($InputData['Check_status'] == "Get_gold_category"){

        try{

            $Fetch_category_information_query = "SELECT * from `category` WHERE `Category_option` = 'Gold' "; 
            $Fetch_category_information_query = mysqli_query($conn, $Fetch_category_information_query); 
            $Fetch_category_information_query_data = mysqli_fetch_all($Fetch_category_information_query, MYSQLI_ASSOC); 

            $Response = array("Status" => "Fetch" , "Data" => (array)$Fetch_category_information_query_data); 
            UpdateData($Response) ; 

        }catch (Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Get_silver_category") {

        try{
            
            $Fetch_category_information_query = "SELECT * FROM `category` WHERE `Category_option` = 'Silver' "; 
            $Fetch_category_information_query = mysqli_query($conn, $Fetch_category_information_query); 
            $Fetch_category_information_query_data = mysqli_fetch_all($Fetch_category_information_query, MYSQLI_ASSOC);

            $Response = array("Status" => "Fetch", "Data" => $Fetch_category_information_query_data);
            UpdateData($Response) ; 

        }catch( Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Delete_category"){
  
        $Category_id = $InputData['Category_id'] ; 

        try{
            
            $Delete_category_query = "DELETE FROM `category` WHERE `Category_table` = '$Category_id' " ; 
            $Delete_category_query = mysqli_query($conn, $Delete_category_query) ; 

            $Response = array("Status" => "Delete") ; 
            UpdateData($Response) ; 

        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Insert_gold_price"){
        $Date = $InputData['Date'] ; 
        
        // 22k Price
        $Price1 = $InputData['22K_price']; 

        // 18K Price
        $Price2 = $InputData['18K_price'] ; 

        // 916 Price
        $Price3 = $InputData['916_price'] ; 

        // Silver Price 
        $Price4 = $InputData['Silver_price'] ; 

        $Price5 = $InputData['24K_price'] ; 

        mysqli_autocommit($conn, false) ;

        try{

            // First Check today price insert or not 

            $Check_today_price_query = "SELECT `Price_date` FROM `goldprice` WHERE `Price_date` = '$Date' "; 
            $Check_today_price_query = mysqli_query($conn, $Check_today_price_query); 
            $Check_today_price_query_row_count = mysqli_num_rows($Check_today_price_query); 

            if ($Check_today_price_query_row_count > 0){

                $Update_price_query = "UPDATE `goldprice` SET `22K_price` = '$Price1', `18K_price` = '$Price2', 
                `916_price` = '$Price3', `Silver_price` = '$Price4', `24K_price` = '$Price5' WHERE `Price_date` = '$Date' "; 

                $Update_price_query = mysqli_query($conn, $Update_price_query) ; 

                $Response = array("Status" => "Update price"); 
                UpdateData($Response) ; 

            }
            else{

                $Insert_price_query = "INSERT INTO `goldprice` (`Price_id`, `Price_date`, `22K_price`, `18K_price`, `916_price`, `Silver_price`,                           `24K_price`) 
                VALUES (NULL, '$Date', '$Price1', '$Price2', '$Price3', '$Price4', '$Price5') " ;
                
                $Insert_price_query = mysqli_query($conn, $Insert_price_query) ; 
            
                $Response = array("Status" => "Insert price"); 
                UpdateData($Response) ; 

            }

            mysqli_commit($conn); 

        }catch( Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Get_gold_price"){

        $Date = $InputData['Date'] ; 

        try{

            $Get_price_data = "SELECT * FROM `goldprice` WHERE `Price_date` = '$Date' " ; 
            $Get_price_data = mysqli_query($conn, $Get_price_data) ; 
            $Get_price_data_row_count = mysqli_num_rows($Get_price_data) ; 

            if ($Get_price_data_row_count > 0){

                $Get_price = mysqli_fetch_all($Get_price_data, MYSQLI_ASSOC); 

                $Response = array("Status" => "Fetch", "Price" => $Get_price); 
                UpdateData($Response) ; 
            }
            else{

                $Response = array("Status" => "Not set price"); 
                UpdateData($Response) ; 
            }

        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Insert_product"){
    
        // Insert Product data request 

        $CategoryId = $InputData['CategoryId']; 
        $CategoryOption = $InputData['CategoryOption'] ; 
        $CategoryName = $InputData['CategoryName'] ; 
        $View1 = $InputData['View1'] ;
        $View2 = $InputData['View2'] ; 
        $View3 = $InputData['View3'] ;
        $ProductInformation = $InputData['Product_information'] ;
        $ProductWeight = $InputData['Product_weight'] ;
        $ProductSize = $InputData['Product_size'] ; 
        $ProductTag = $InputData['Product_tag'] ; 
        $Product_discount_price = $InputData['Product_discount_price'] ;
        $Product_retail_price = $InputData['Product_retail_price'] ; 
        $Product_type = $InputData['Product_type'] ; 
        
        mysqli_autocommit($conn, false) ;
        
        try{

            $Data = "abcdefghijklmnopqrstuvwxyz" ;
            $Data = str_shuffle($Data) ; 
            
            $Product_id = substr($Data, 0, 15); 

            $Insert_product_data_query = "INSERT INTO `$CategoryId` (`Product_key`, `Product_id`, `Product_information`, `Product_image1`, 
            `Product_image2`, `Product_image3`, `Product_weight`, `Product_type`, `Product_size`, `Product_discount_price`, `Product_retail_price`, 
            `Product_tag_number`, `Product_sold_status`)  VALUES (NULL, '$Product_id', '$ProductInformation', '$View1', '$View2', '$View3', '$ProductWeight', 
            '$CategoryOption', '$ProductSize', '$Product_discount_price', '$Product_retail_price', '$ProductTag', 'Yes')" ; 

            $Insert_product_data_query = mysqli_query($conn, $Insert_product_data_query); 

            $Insert_product_category_information_query = "INSERT INTO `product_category` (`Product_key`, `Product_id`, `Category_id`, `Category_name`) 
            VALUES (NULL, '$Product_id', '$CategoryId', '$CategoryName') ";
            
            $Insert_product_category_information_query = mysqli_query($conn, $Insert_product_category_information_query) ; 

            mysqli_commit($conn) ; 

            $Response = array("Status" => "Insert product"); 
            UpdateData($Response) ; 
        
        }catch(Exception $e){
            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Get_category_product") {

        $CategoryId = $InputData['CategoryId']; 

        try{

            $Fetch_category_product = "SELECT * FROM `$CategoryId` WHERE `Product_sold_status` = 'Yes' ";
            $Fetch_category_product = mysqli_query($conn, $Fetch_category_product); 
            $Fetch_category_product_result = mysqli_fetch_all($Fetch_category_product, MYSQLI_ASSOC); 

            $Response = array("Status" => "Fetch", "Product" => $Fetch_category_product_result); 
            UpdateData($Response) ; 

        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Delete_product"){

        $ProductId = $InputData['ProductId']; 
        $CategoryId = $InputData['CategoryId'] ; 

        mysqli_autocommit($conn, false); 

        try{
            
            $Delete_product_query = "DELETE FROM `$CategoryId` WHERE `Product_id` = '$ProductId' " ; 
            $Delete_product_query = mysqli_query($conn, $Delete_product_query) ; 

            $Delete_product_category_query = "DELETE FROM `product_category` WHERE `Product_id` = '$ProductId' " ; 
            $Delete_product_category_query = mysqli_query($conn, $Delete_product_category_query) ; 

            $Response = array("Status" => "Delete Product") ; 
            UpdateData($Response) ; 
            
            mysqli_commit($conn) ; 

        }catch (Exception $e){
            
            mysqli_rollback($conn) ; 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Update_product"){
    
        $Category_id = $InputData['CategoryId'] ; 
        $Product_id = $InputData['Product_id'] ; 
        $View1 = $InputData['View1']; 
        $View2 = $InputData['View2']; 
        $View3 = $InputData['View3']; 
        $ProductInformation = $InputData['ProductInformation']; 
        $ProductWeight = $InputData['ProductWeight']; 
        $ProductSize = $InputData['ProductSize'] ; 
        $ProductTag = $InputData['ProductTag'] ; 
        $Product_discount_price = $InputData['Product_discount_price']; 
        $Product_retail_price = $InputData['Product_retail_price'] ; 

        mysqli_autocommit($conn, false) ; 

        try{

            $Update_product_data_query = "UPDATE `$Category_id` SET `Product_information` = '$ProductInformation',`Product_image1`= '$View1',
            `Product_image2`= '$View2',`Product_image3`= '$View3', `Product_weight`= '$ProductWeight',`Product_size`='$ProductSize',`Product_discount_price`= '$Product_discount_price',
            `Product_retail_price`='$Product_retail_price',`Product_tag_number`='$ProductTag' WHERE `Product_id` = '$Product_id' " ;

            $Update_product_data_query = mysqli_query($conn, $Update_product_data_query); 

            $Response = array("Status" => "Update Product");
            UpdateData($Response) ; 

            mysqli_commit($conn); 
            
        }catch(Exception $e){

            mysqli_rollback($conn) ; 
            
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }

    } else if ($InputData['Check_status'] == "Fetch_banner"){

        // Functionality which fetch Banner or Status image 
        $BannerOption = $InputData['Option']; 
        
        if ($BannerOption == "Banner"){

            try{
                
                $Banner_image_fetch_query = "SELECT `Image` FROM `banner` WHERE `Option` = 'Banner' "; 
                $Banner_image_fetch_query = mysqli_query($conn, $Banner_image_fetch_query); 
                $Banner_image_fetch_query_data = mysqli_fetch_all($Banner_image_fetch_query, MYSQLI_ASSOC); 

                $Image_array = array() ; 

                for($i = 0 ; $i<count($Banner_image_fetch_query_data); $i++){

                    array_push($Image_array, array("image" => $Banner_image_fetch_query_data[$i]["Image"], "image_id" => strval($i)  )); 
                    
                }

                $Response = array("Status" => "Fetch", "Data" => $Image_array); 
                UpdateData($Response) ;  

            }catch (Exception $e){

                $Response = array("Status" => "Network request failed"); 
                UpdateData($Response) ; 
            }
        }
        else{

            try{

                $Status_image_fetch_query = "SELECT `Banner_id`, `Image` FROM `banner` WHERE `Option` = 'Status' "; 
                $Status_image_fetch_query = mysqli_query($conn, $Status_image_fetch_query); 
                $Status_image_fetch_query_data = mysqli_fetch_all($Status_image_fetch_query, MYSQLI_ASSOC); 

                $Image_array = array() ; 

                for($i = 0 ; $i<count($Status_image_fetch_query_data); $i++){

                    array_push($Image_array, array("image" => $Status_image_fetch_query_data[$i]["Image"], "image_id" => strval($i)  )); 
                    
                }

                $Response = array("Status" => "Fetch", "Data" => $Image_array); 
                UpdateData($Response) ; 

            }catch (Exception $e){

                $Response = array("Status" => "Network request failed"); 
                UpdateData($Response) ;  
            }
        }
    } else if ($InputData['Check_status'] == "Get_category"){
    
        try{

            $Fetch_category_data_query = "SELECT * FROM `category` ";
            $Fetch_category_data_query = mysqli_query($conn, $Fetch_category_data_query); 
            $Fetch_category_data_query_result = mysqli_fetch_all($Fetch_category_data_query, MYSQLI_ASSOC) ;
        
            $Gold_category = array() ; 
            $Silver_category = array() ; 

            for($i=0 ; $i<count($Fetch_category_data_query_result); $i++){

                if ($Fetch_category_data_query_result[$i]["Category_option"] == "Gold"){
                    array_push($Gold_category, $Fetch_category_data_query_result[$i]); 
                }
                else{
                    array_push($Silver_category, $Fetch_category_data_query_result[$i]) ;
                }
            }

            $Response = array("Status" => "Fetch", "Gold_category" => $Gold_category, "Silver_category" => $Silver_category) ;
            UpdateData($Response) ; 


        }catch (Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Fetch_watchlist_product"){

        $Table_name = $InputData['Table_name']; 
    
        try{

            $Fetch_order_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' " ; 
            $Fetch_order_id = mysqli_query($conn, $Fetch_order_id); 
            $Fetch_order_id_result = mysqli_fetch_all($Fetch_order_id, MYSQLI_ASSOC) ; 
            
            $Current_cart_item_id = "cart-item-".$Fetch_order_id_result[0]['Data1']; 

            $Fetch_watchlist_product = "SELECT `Data1`, `Option` FROM `$Table_name` WHERE `Option` = 'watchlist' OR `Option` = '$Current_cart_item_id' "; 
            $Fetch_watchlist_product = mysqli_query($conn, $Fetch_watchlist_product); 
            $Fetch_watchlist_product_result = mysqli_fetch_all($Fetch_watchlist_product, MYSQLI_ASSOC); 
            
            $Watchlist_product_id = array(); 
            $Cart_product_id = array() ; 
            
            for($i = 0; $i<count($Fetch_watchlist_product_result); $i++){
                
                if ($Fetch_watchlist_product_result[$i]['Option'] == "watchlist"){

                    array_push($Watchlist_product_id, $Fetch_watchlist_product_result[$i]['Data1'] ); 
                }
                else{

                    array_push($Cart_product_id, $Fetch_watchlist_product_result[$i]['Data1']) ; 
                }
            }
            
            $Response = array("Status" => "Fetch", "Watchlist" => $Watchlist_product_id, "Cart_item" => $Cart_product_id); 
            UpdateData($Response) ; 

        }catch (Exception $e){

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Insert_watchlist_product"){

        $ProductId = $InputData['Product_id']; 
        $CategoryId = $InputData['Category_id']; 
        $Table_name = $InputData['Table_name'] ; 

        mysqli_autocommit($conn, false);
        
        try{

            // Option transaction diagram 
            // 1. Option = Watchlist
            // 2. Data1 = Product_id
            // 3. Data2 = Category_id

            $Insert_watchlist_item_query = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`) 
            VALUES (NULL, 'watchlist', '$ProductId', '$CategoryId', NULL, NULL, NULL, NULL, NULL) " ;
            
            $Insert_watchlist_item_query = mysqli_query($conn, $Insert_watchlist_item_query); 
        
            $Response = array("Status" => "Insert");
            UpdateData($Response) ; 

            mysqli_commit($conn); 

        }catch(Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Delete_watchlist_product"){
    
        $Table_name = $InputData['Table_name']; 
        $Product_id = $InputData['Product_id']; 

        // Transaction stage
        // WHERE Option = watchlist AND Data1 = Product_id

        mysqli_autocommit($conn, false) ; 

        try{

            $Delete_watchlist_item = "DELETE FROM `$Table_name` WHERE `Option` = 'watchlist' AND `Data1` = '$Product_id' "; 
            $Delete_watchlist_item = mysqli_query($conn, $Delete_watchlist_item); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Delete"); 
            UpdateData($Response) ;  

        }catch(Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Insert_cart_item"){

        $Table_name = $InputData['Table_name']; 
        $Product_id = $InputData['Product_id']; 
        $Category_id = $InputData['Category_id']; 

        // Transaction stage
        // 1. Fetch cart_id value
        // 2. Insert => Option = cart_item_[cart_id_value] AND Data1 = Product_id AND Data2 = Category_id

        mysqli_autocommit($conn, false); 

        try{

            $Fetch_cart_id_query = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' "; 
            $Fetch_cart_id_query = mysqli_query($conn, $Fetch_cart_id_query); 
            $Fetch_cart_id_query_data = mysqli_fetch_all($Fetch_cart_id_query, MYSQLI_ASSOC); 

            // Cart id
            $Cart_id = $Fetch_cart_id_query_data[0]['Data1']; 

            $Cart_id = 'cart-item-'.$Cart_id; 
            
            // Insert Cart product data 
            
            $Insert_cart_product_query = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`) VALUES 
            (NULL, '$Cart_id', '$Product_id', '$Category_id', NULL, NULL, NULL, NULL, NULL) "; 
        
            $Insert_cart_product_query = mysqli_query($conn, $Insert_cart_product_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Insert"); 
            UpdateData($Response) ;  

        }catch( Exception $e){
            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Delete_cart_item"){

        $Table_name = $InputData['Table_name'];
        $Product_id = $InputData['Product_id']; 

        mysqli_autocommit($conn, false); 

        try{

            $Fetch_cart_id_query = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' "; 
            $Fetch_cart_id_query = mysqli_query($conn, $Fetch_cart_id_query); 
            $Fetch_cart_id_query_data = mysqli_fetch_all($Fetch_cart_id_query, MYSQLI_ASSOC); 

            // Cart id
            $Cart_id = $Fetch_cart_id_query_data[0]['Data1']; 

            $Cart_id = 'cart-item-'.$Cart_id; 
            
            $Delete_product_query = "DELETE FROM `$Table_name` WHERE `Option` = '$Cart_id' AND `Data1` = '$Product_id' "; 
            $Delete_product_query = mysqli_query($conn, $Delete_product_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Delete"); 
            UpdateData($Response) ; 

        }catch (Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Fetch_watchlist_product_data") {

        $Table_name = $InputData['Table_name']; 

        mysqli_autocommit($conn, false); 

        try{

            $Fetch_watchlist_product_data = "SELECT `Data1`, `Data2` FROM `$Table_name` WHERE `Option` = 'watchlist' "; 
            $Fetch_watchlist_product_data = mysqli_query($conn, $Fetch_watchlist_product_data); 
            $Fetch_watchlist_product_data_result = mysqli_fetch_all($Fetch_watchlist_product_data, MYSQLI_ASSOC); 
            
            $Category_table_wise_product_id  ; 
            $Category_id = array() ; 
            $Category_wise_product_data = array() ; 

            for($i = 0 ; $i<count($Fetch_watchlist_product_data_result); $i++){
            
                if (isset($Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']])){
                
                array_push($Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']], $Fetch_watchlist_product_data_result[$i]                     ['Data1']) ; 
                }
                else{
                    array_push($Category_id, $Fetch_watchlist_product_data_result[$i]['Data2']) ; 
                    $Category_table_wise_product_id[$Fetch_watchlist_product_data_result[$i]['Data2']] = array($Fetch_watchlist_product_data_result[$i]                     ['Data1']) ; 
                }
            }

            for($i = 0 ; $i<count($Category_id); $i++){
                
                if (count($Category_table_wise_product_id[$Category_id[$i]])){
                    
                    $ids = implode(', ', $Category_table_wise_product_id[$Category_id[$i]]);

                    $Select_product_data_query = "SELECT * FROM `$Category_id[$i]` WHERE `Product_id` IN ( '" . implode( "', '",                                               $Category_table_wise_product_id[$Category_id[$i]] ) . "' ) " ;
                    $Select_product_data_query = mysqli_query($conn , $Select_product_data_query) ; 
            
                    $Select_product_data_query_result = mysqli_fetch_all($Select_product_data_query, MYSQLI_ASSOC); 
                    
                    for($j = 0 ; $j<count($Select_product_data_query_result); $j++){
                        $Select_product_data_query_result[$j]["Category_id"] = $Category_id[$i]; 
                        array_push($Category_wise_product_data, $Select_product_data_query_result[$j]); 
                    }

                }
            }


            unset($Category_id); 
            unset($Category_table_wise_product_id); 
            
            $Response = array("Status" => "Fetch", "Data" => $Category_wise_product_data); 
            UpdateData($Response) ; 
            
            unset($Category_wise_product_data) ; 

            mysqli_commit($conn); 

        }catch(Exception $e){

            mysqli_rollback($conn); 
            
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 

        }

    } else if ($InputData['Check_status'] == "Fetch_cart_item") {
   
        $Table_name = $InputData['Table_name'] ; 
        
        mysqli_autocommit($conn, false) ; 

        try{

            $Fetch_cart_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' ";
            $Fetch_cart_id = mysqli_query($conn, $Fetch_cart_id); 
            $Fetch_cart_id_result = mysqli_fetch_all($Fetch_cart_id, MYSQLI_ASSOC) ; 
            
            $Cart_id = $Fetch_cart_id_result[0]['Data1'] ; 
            $Cart_item_id = "cart-item-".$Cart_id ; 

            $Fetch_cart_data_query = "SELECT `Data1`, `Data2` FROM `$Table_name` WHERE `Option` = '$Cart_item_id'" ; 
            $Fetch_cart_data_query = mysqli_query($conn, $Fetch_cart_data_query) ; 
            $Fetch_cart_data_query_result = mysqli_fetch_all($Fetch_cart_data_query, MYSQLI_ASSOC); 
    
            $Category_table_wise_product_id  ; 
            $Category_id = array() ; 
            $Category_wise_product_data = array() ; 

            for($i = 0; $i<count($Fetch_cart_data_query_result); $i++){

                if (isset($Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']])){
                    
                    array_push($Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']], $Fetch_cart_data_query_result[$i]['Data1']) ; 
                }
                else{

                    array_push($Category_id, $Fetch_cart_data_query_result[$i]['Data2']) ; 
                    $Category_table_wise_product_id[$Fetch_cart_data_query_result[$i]['Data2']] = array($Fetch_cart_data_query_result[$i]['Data1']) ; 
                }
            }

            $Subtotal = 0 ;


            for($i = 0 ; $i<count($Category_id); $i++){

                if (count($Category_table_wise_product_id[$Category_id[$i]]) > 0 ){

                    $ids = implode(', ', $Category_table_wise_product_id[$Category_id[$i]]);

                    $Select_product_data_query = "SELECT * FROM `$Category_id[$i]` WHERE `Product_id` IN ( '" . implode( "', '",                                               $Category_table_wise_product_id[$Category_id[$i]] ) . "' ) " ;
                    $Select_product_data_query = mysqli_query($conn , $Select_product_data_query) ; 
            
                    $Select_product_data_query_result = mysqli_fetch_all($Select_product_data_query, MYSQLI_ASSOC); 
                    
                    for($j = 0 ; $j<count($Select_product_data_query_result); $j++){
                        $Subtotal = $Subtotal + intval($Select_product_data_query_result[$j]["Product_discount_price"]) ;
                        $Select_product_data_query_result[$j]["Category_id"] = $Category_id[$i]; 
                        array_push($Category_wise_product_data, $Select_product_data_query_result[$j]); 
                    }
                }
            }

            mysqli_commit($conn) ; 

            unset($Category_id); 
            unset($Category_table_wise_product_id);

            $Response = array("Status" => "Fetch", "Data" => $Category_wise_product_data, "Subtotal" => $Subtotal) ; 
            UpdateData($Response) ;

            unset($Category_wise_product_data) ; 


        }catch(Exception $e){

            mysqli_rollback($conn) ; 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }

    } else if ($InputData['Check_status'] == "Delete_cart_item"){

        $Table_name = $InputData['Table_name'];
        $Product_id = $InputData['Product_id']; 

        mysqli_autocommit($conn, false); 

        try{

            $Fetch_cart_id_query = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' "; 
            $Fetch_cart_id_query = mysqli_query($conn, $Fetch_cart_id_query); 
            $Fetch_cart_id_query_data = mysqli_fetch_all($Fetch_cart_id_query, MYSQLI_ASSOC); 

            // Cart id
            $Cart_id = $Fetch_cart_id_query_data[0]['Data1']; 

            $Cart_id = 'cart-item-'.$Cart_id; 
            
            $Delete_product_query = "DELETE FROM `$Table_name` WHERE `Option` = '$Cart_id' AND `Data1` = '$Product_id' "; 
            $Delete_product_query = mysqli_query($conn, $Delete_product_query); 

            mysqli_commit($conn); 

            $Response = array("Status" => "Delete"); 
            UpdateData($Response) ; 

        }catch (Exception $e){

            mysqli_rollback($conn); 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Place_order"){
        
        // Order total value 
        $Order_total = $InputData['Order_total'] ;

        // Order product data 
        $Order_product_data =  json_decode(json_encode($InputData['Order_product_data']), true) ; 

        // Order addresss data     
        $Order_address = json_decode(json_encode($InputData['Order_address']), true); 
        $Order_payment = $InputData['Order_payment_method'] ; 
        $Table_name = $InputData['Table_name'] ;
        $Order_date = $InputData['Order_date'] ; 
        $MobileNumber = $InputData['Mobile_number'] ; 

        $Username = $Order_address['Username'] ; 
        $Street_address = $Order_address['Street_address'] ; 
        $Area = $Order_address['Area'] ; 
        $Landmark = $Order_address['Landmark'] ; 
        $Pincode = $Order_address['Pincode'] ; 

        // == Payment id 
        $Payment_id = "None" ;

        // Order status
        $Order_status ;  

        if ($Order_payment == "Payment pending"){
            $Order_status = "Online payment pending" ; 
        }
        else{
            $Order_status = "Pending" ; 
        }

        mysqli_autocommit($conn, false) ; 

        try{

            // == Fetch current cart id 

            $Fetch_cart_id = "SELECT `Data1` FROM `$Table_name` WHERE `Option` = 'cart-id' "; 
            $Fetch_cart_id = mysqli_query($conn, $Fetch_cart_id) ; 
            $Fetch_cart_id_result = mysqli_fetch_all($Fetch_cart_id, MYSQLI_ASSOC) ; 
            
            $Current_cart_id = "cart-item-".$Fetch_cart_id_result[0]['Data1'] ; 
            $Order_item_id = "order-item-".$Fetch_cart_id_result[0]['Data1'] ;  

            // == Update cart-item to order-item

            $Update_cart_item_query = "UPDATE `$Table_name` SET `Option` = '$Order_item_id' WHERE `Option` = '$Current_cart_id' " ; 
            $Update_cart_item_query = mysqli_query($conn, $Update_cart_item_query); 
            
            // == Update cart-id to +1

            $Update_cart_id = strval(intval($Fetch_cart_id_result[0]['Data1'])+1) ; 
            $Update_cart_id_query = "UPDATE `$Table_name` SET `Data1` = '$Update_cart_id'  WHERE `Option`= 'cart-id' " ;  
            $Update_cart_id_query = mysqli_query($conn, $Update_cart_id_query) ; 
        
            // == Create Order id 
            $Order_id_data = "1234567890" ; 
            $Order_id_data = str_shuffle($Order_id_data); 
            $Order_id = substr($Order_id_data, 0 , 8); 

            // == Insert Order Information Query 

            $Insert_user_order_data = "INSERT INTO `$Table_name` (`User_key`, `Option`, `Data1`, `Data2`, `Data3`, `Data4`, `Data5`, `Data6`, `Data7`, `Data8`, `Data9`, `Data10`, `Data11`, `Data12`, `Data13`, `Data14`, `Data15`)
            VALUES (NULL, 'Order', '$Order_id', '$Order_status', '$Order_payment', '$Payment_id', '$Order_date', '-', '-', '$Order_total', '$Username', '$MobileNumber', '$Street_address', '$Area', '$Landmark', '$Pincode', 'No') " ; 
            
            $Insert_user_order_data = mysqli_query($conn, $Insert_user_order_data) ; 

            // == Insert Order information in Order table 
            $Insert_order_information_into_OrderData = "INSERT INTO `Order_data` (`Order_key`, `Order_id`, `Order_total`, `Order_username`, `Street_address`,          `Area`, `Landmark`, `Pincode`, `Mobile_number`, `Order_place_date`, `Order_deliver_date`, `Order_cancel_reason`, `Payment_method`, `Payment_id`,`Order_status`, `Userid`, `Refund_status`) 
            VALUES (NULL, '$Order_id', '$Order_total', '$Username', '$Street_address', '$Area', '$Landmark', '$Pincode', '$MobileNumber', '$Order_date', '-',          '- ', '$Order_payment', '$Payment_id', '$Order_status', '$Table_name', 'No')" ; 
    
            $Insert_order_information_into_OrderData = mysqli_query($conn, $Insert_order_information_into_OrderData) ; 

            // == Insert Order Product Information in Order Product data table 

            for($i=0 ; $i<count($Order_product_data); $i++){
                
                $Product_id = $Order_product_data[$i]["Product_id"] ; 
                $Product_image1 = $Order_product_data[$i]['Product_image1'] ; 
                $Product_image2 = $Order_product_data[$i]["Product_image2"] ; 
                $Product_image3 = $Order_product_data[$i]["Product_image3"] ; 
                $Product_information = $Order_product_data[$i]["Product_information"] ; 
                $Product_weight = $Order_product_data[$i]["Product_weight"] ; 
                $Product_size = $Order_product_data[$i]['Product_size'] ; 
                $Product_discount_price = $Order_product_data[$i]["Product_discount_price"] ; 
                $Product_retail_price = $Order_product_data[$i]["Product_retail_price"] ; 
                $Product_tag = $Order_product_data[$i]["Product_tag"] ; 
                $Product_type = $Order_product_data[$i]["Product_type"] ; 
                $Product_category_id = $Order_product_data[$i]['Category_id'] ; 

                $Insert_product_data_query = "INSERT INTO `Order_product_data` (`Order_product_key`, `Product_id`, `Product_image1`, `Product_image2`,                     `Product_image3`, `Product_information`, `Product_weight`, `Product_size`, `Product_discount_price`, `Product_retail_price`,                                `Product_type`, `Order_id`, `Product_tag`, `Category_id`) 
                 VALUES (NULL, '$Product_id', '$Product_image1', '$Product_image2', '$Product_image3', '$Product_information', '$Product_weight',                           '$Product_size', '$Product_discount_price', '$Product_retail_price', '$Product_type', '$Order_id', '$Product_tag', '$Product_category_id')                 " ;

                $Insert_all_product_data = mysqli_query($conn, $Insert_product_data_query) ;  

                $Delete_product_data_query = "UPDATE `$Product_category_id` SET `Product_sold_status` = 'No'  WHERE `Product_id` = '$Product_id' " ;
                $Delete_product_data_query = mysqli_query($conn, $Delete_product_data_query) ; 
                
            }
            
            if($Order_payment != "Payment pending"){

                $Information_message = "Your order place successfully on Shree Shakti Gold.For query contact us on +919824113124"; 

                $fields = array(
                "sender_id" => "TXTIND",
                "message" => $Information_message,
                "route" => "v3",
                "numbers" => $MobileNumber,
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
            }

            $Information_message = "Your have new order.Check it out!"; 

            $fields = array(
            "sender_id" => "TXTIND",
            "message" => $Information_message,
            "route" => "v3",
            "numbers" => "6354757251",
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

            $Payment_url = "http://shreeshaktigold.epizy.com/Payment.php?total=".$Order_total."&Mobile_number=".$MobileNumber."&username=".$Username ; 
            $Payment_url = $Payment_url."&User_id=".$Table_name."&Order_id=".$Order_id ; 

            $Payment_failed_url = "http://shreeshaktigold.epizy.com/Payment_response.php?Status=Payment_fail&Order_id=".$Order_id."&User_id=".$Table_name ; 
            $Payment_failed_url = $Payment_failed_url."&Mobile_number=".$MobileNumber ; 
            
            $Response = array("Status" => "Place_order", "Payment_url" => $Payment_url, "Payment_cancel_url" => $Payment_failed_url ) ; 
            UpdateData($Response) ; 
            // echo json_encode($Response) ; 

        }catch( Exception $e){
        
            mysqli_rollback($conn) ; 

            $Response = array("Status" => "Network request failed") ; 
            UpdateData($Response) ;  
        }
    } else if ($InputData['Check_status'] == "Place_order_data"){
     
        $Order_status = $InputData['Order_status']; 
        $Table_name = $InputData['Table_name'] ; 

        mysqli_autocommit($conn, false); 

        try{
            
            if ($Order_status == "Pending"){

                $Fetch_order_data_query = "SELECT * FROM `$Table_name` WHERE `Option` = 'Order' AND `Data2` IN ('Pending', 'Online payment', 'Online payment pending') " ; 
                $Fetch_order_data_query = mysqli_query($conn, $Fetch_order_data_query) ; 
                $Fetch_order_data_query_result = mysqli_fetch_all($Fetch_order_data_query, MYSQLI_ASSOC) ; 
        
                for($i = 0 ; $i<count($Fetch_order_data_query_result); $i++){
                    
                    $Order_id = $Fetch_order_data_query_result[$i]['Data1'] ; 

                    $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
                    $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
                    
                    $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

                    $Fetch_order_data_query_result[$i]['Product_data'] = $Fetch_order_product_data_result ; 
                } 
                
                $Response = array("Status" => "Fetch", "Order" => $Fetch_order_data_query_result) ;
                UpdateData($Response) ; 
            }

            else if ($Order_status == "Cancel"){
                $Fetch_order_data_query = "SELECT * FROM `$Table_name` WHERE `Option` = 'Order' AND `Data2` IN ('User-cancel', 'Server-cancel') " ; 
                $Fetch_order_data_query = mysqli_query($conn, $Fetch_order_data_query) ; 
                $Fetch_order_data_query_result = mysqli_fetch_all($Fetch_order_data_query, MYSQLI_ASSOC) ; 
        
                for($i = 0 ; $i<count($Fetch_order_data_query_result); $i++){
                    
                    $Order_id = $Fetch_order_data_query_result[$i]['Data1'] ; 

                    $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
                    $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
                    
                    $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

                    $Fetch_order_data_query_result[$i]['Product_data'] = $Fetch_order_product_data_result ; 
                } 
                
                $Response = array("Status" => "Fetch", "Order" => $Fetch_order_data_query_result) ;
                UpdateData($Response) ; 
            }
            else if ($Order_status == "Complete"){
                $Fetch_order_data_query = "SELECT * FROM `$Table_name` WHERE `Option` = 'Order' AND `Data2` IN ('Complete') " ; 
                $Fetch_order_data_query = mysqli_query($conn, $Fetch_order_data_query) ; 
                $Fetch_order_data_query_result = mysqli_fetch_all($Fetch_order_data_query, MYSQLI_ASSOC) ; 
        
                for($i = 0 ; $i<count($Fetch_order_data_query_result); $i++){
                    
                    $Order_id = $Fetch_order_data_query_result[$i]['Data1'] ; 

                    $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
                    $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
                    
                    $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

                    $Fetch_order_data_query_result[$i]['Product_data'] = $Fetch_order_product_data_result ; 
                } 
                
                $Response = array("Status" => "Fetch", "Order" => $Fetch_order_data_query_result) ;
                UpdateData($Response) ; 
            }
            

            mysqli_commit($conn); 

        }catch(Exception $e){

            mysqli_rollback($conn) ;

            $Response = array("Status" => "Network request failed") ; 
            UpdateData($Response) ; 
        }

    } else if ($InputData['Check_status'] == "Fetch_notification_id"){

        try{

            $Fetch_notification_id = "SELECT `Notification_id` FROM `userdata`  "; 
            $Fetch_notification_id = mysqli_query($conn, $Fetch_notification_id); 
            $Fetch_notification_id_result = mysqli_fetch_all($Fetch_notification_id, MYSQLI_ASSOC) ; 

            $Response = array("Status" => "Success", "Notification" => $Fetch_notification_id_result); 
            UpdateData($Response) ; 

        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;  
        }
    } else if ($InputData['Check_status'] == "Admin_password"){

        $User_AdminPassword = $InputData['AdminPassword']; 

        try{

            // Fetch Password query 
            $Fetch_password_query = "SELECT * FROM `admin` WHERE  `admin_name` = 'Shaktigold' ";
            $Fetch_password_query = mysqli_query($conn, $Fetch_password_query); 
            
            $Fetch_password_query_data = mysqli_fetch_all($Fetch_password_query, MYSQLI_ASSOC); 
            
            $AdminPassword = $Fetch_password_query_data[0]['admin_password']; 

            if ($User_AdminPassword != $AdminPassword){
                
                $Response = array("Status" => "Invalid Password"); 
                UpdateData($Response) ; 

            }
            else{
            
                $Response = array("Status" => "Valid Password") ; 
                UpdateData($Response) ;  
            }

        }catch (Exception $e){

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Update_mobile_number_check"){
        // Functionality check Mobile number register or not and send otp to register Mobile number 

        $MobileNumber = $InputData['Mobilenumber'];
        
        try{
        
            // 1. Execute Query 
            $Check_mobile_number_query = "SELECT `Mobilenumber` FROM `userdata` WHERE `Mobilenumber` = '$MobileNumber' " ; 
            $Check_mobile_number_query = mysqli_query($conn, $Check_mobile_number_query); 
        
            // 2. Row count 
            $Check_mobile_number_query_row_count = mysqli_num_rows($Check_mobile_number_query); 
        
            if ($Check_mobile_number_query_row_count == 0){

                // 3. Create Verification code 
                $Verification_code_data = "1234567890";
                $Verification_code_data = str_shuffle($Verification_code_data);
                $Verification_code = substr($Verification_code_data, 0, 4);

                // 4. Send Verification code to Mobile number 
                $curl = curl_init();

                curl_setopt_array($curl, array(
                    CURLOPT_URL => "https://www.fast2sms.com/dev/bulkV2?authorization=".$AuthenticationKey."&variables_values=$Verification_code&route=otp&                    numbers=" . urlencode($MobileNumber),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_SSL_VERIFYHOST => 0,
                    CURLOPT_SSL_VERIFYPEER => 0,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                    CURLOPT_HTTPHEADER => array(
                        "cache-control: no-cache"
                    ),
                ));


                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);

                $curl_response = json_decode($response, true);

                if ($curl_response['return'] == true){
                    
                    // 5. Send Response
                    $Response = array("Status" => "OTP send", "OTP" =>  $Verification_code); 
                    UpdateData($Response) ; 
                }
                else{

                    // 6. Send Response 
                    $Response = array("Status" => "OTP send failed"); 
                    UpdateData($Response) ;  
                }
             
            }
            else{

                $Response = array("Status" => "Mobile number already register") ;
                UpdateData($Response) ; 
                
            }

        
        }catch (Exception $e){

            // 1. Response 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ; 
        }
    } else if ($InputData['Check_status'] == "Update_mobile"){
        $Update_mobile_number = $InputData['Update_number'] ; 
        $Previous_mobile_number = $InputData['Previous_number'] ; 

        try{

           $Update_mobile_number_query = "UPDATE `userdata` SET `Mobilenumber` = '$Update_mobile_number' WHERE `Mobilenumber` = '$Previous_mobile_number'";
           $Update_mobile_number_query = mysqli_query($conn, $Update_mobile_number_query) ; 

           $Response = array("Status" => "Success"); 
           UpdateData($Response) ; 

        }catch(Exception $e){
            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;  
   
        }
    } else if ($InputData['Check_status'] == "Cancel_order"){

        // == Required information 
        $Table_name = $InputData['Table_name'] ; 
        $Payment_method = $InputData['Payment_method'] ; 
        $Payment_id = $InputData['Payment_id'] ; 
        $Order_id = $InputData['Order_id'] ; 
        $Order_cancel_reason = $InputData['Cancel_reason'] ; 
        $Order_cancel_date = $InputData['Cancel_date'] ; 
        $Mobile_number = $InputData['Mobile_number'] ; 
        $Username = $InputData['Username'] ; 
        $Order_date_value = $InputData['Order_date'] ; 
        $Order_total = $InputData['Order_total']; 

        mysqli_autocommit($conn, false) ; 

        try{

            // == Online payment method request is pending
        
            // == Cancel order in User table 
            $Update_user_table_query = "UPDATE `$Table_name` SET `Data2` = 'User-cancel', `Data6` = '$Order_cancel_date', `Data7` = '$Order_cancel_reason'             WHERE `Data1` = '$Order_id' AND `Option` = 'Order' " ; 
            $Update_user_table_query =  mysqli_query($conn, $Update_user_table_query) ; 

            // ==  Cancel order in Order table 
            $Cancel_order_in_OrderTable = "UPDATE `Order_data` SET `Order_status` = 'User-cancel', `Order_deliver_date` = '$Order_cancel_date',                        `Order_cancel_reason` = '$Order_cancel_reason' WHERE `Order_id` = '$Order_id' " ; 
            $Cancel_order_in_OrderTable = mysqli_query($conn, $Cancel_order_in_OrderTable) ; 
            
            // == Select Product data from `Order_product_data` 
            $Fetch_order_product_data = "SELECT * FROM `Order_product_data` WHERE `Order_id` = '$Order_id' " ; 
            $Fetch_order_product_data = mysqli_query($conn, $Fetch_order_product_data) ; 
            $Fetch_order_product_data_result = mysqli_fetch_all($Fetch_order_product_data, MYSQLI_ASSOC) ;

            for($i=0; $i<count($Fetch_order_product_data_result); $i++){
                $Category_id = $Fetch_order_product_data_result[$i]['Category_id'] ; 
                $Product_id = $Fetch_order_product_data_result[$i]['Product_id'] ; 

                // === Update product sold status

                $Update_product_sold_status = "UPDATE `$Category_id` SET `Product_sold_status` = 'Yes' WHERE `Product_id` = '$Product_id' "; 
                $Update_product_sold_status = mysqli_query($conn, $Update_product_sold_status); 
                
            }

            if ($Payment_method == "Payment success"){

                // Fetch refund payment entry in refund payment data table 

                $Entry_in_refund_payment_data = "INSERT INTO `refund_payment_data` (`Refund_payment_key`, `Payment_id`, `Username`, `Mobilenumber`, `Order_id`,            `Order_date`, `Refund_status`, `Order_total`, `User_id`) VALUES (NULL, '$Payment_id', '$Username', '$Mobile_number', '$Order_id', 
                '$Order_date_value', 'Pending', '$Order_total', '$Table_name') ";
                $Entry_in_refund_payment_data = mysqli_query($conn, $Entry_in_refund_payment_data);  
            }

            $Information_message = "Your order successfully cancel on Shree Shakti Gold Jewellers"; 

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

            // ---- Admin side message ----- // 

            $Information_message = "One order cancel by user. Check it out !"; 

            $fields = array(
            "sender_id" => "TXTIND",
            "message" => $Information_message,
            "route" => "v3",
            "numbers" => "6354757251",
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


            $Response = array("Status" => "Cancel_order") ; 
            UpdateData($Response) ;  


            $Response = array("Status" => "Cancel_order") ; 
            UpdateData($Response) ;  

            mysqli_commit($conn); 

          

        }catch(Exception $e){

            mysqli_rollback($conn) ; 

            $Response = array("Status" => "Network request failed"); 
            UpdateData($Response) ;  
        }
    } else if ($InputData['Check_status'] == "Complete_order"){

        $Table_name = $InputData['Table_name'] ; 
        $Order_id = $InputData['Order_id'] ; 
        $Order_complete_date = $InputData['Complete_order_date'] ; 
        $Mobile_number = $InputData['Mobile_number'] ; 

        mysqli_autocommit($conn, false) ; 

        try{

            // == Update Order information in User Table 
            $Complete_order_in_UserTable = "UPDATE `$Table_name` SET `Data2` = 'Complete', `Data6` = '$Order_complete_date' WHERE `Data1` = '$Order_id'  " ; 
            $Complete_order_in_UserTable = mysqli_query($conn, $Complete_order_in_UserTable) ; 

            // == Update Order information in Order data Table
            $Complete_order_in_OrderTable = "UPDATE `Order_data` SET `Order_status` = 'Complete' , `Order_deliver_date` = '$Order_complete_date' WHERE `Order_id` = '$Order_id' " ; 
            $Complete_order_in_OrderTable = mysqli_query($conn, $Complete_order_in_OrderTable) ; 

            $Information_message = "Your order deliver successfully by Shree Shakti Gold Jewellers"; 

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
            
            $Response = array("Status" => "Complete_order") ; 
            UpdateData($Response) ;  

            mysqli_commit($conn); 

        }catch(Exception $e){

            mysqli_rollback($conn);

            $Response = array("Status" => "Network request failed" ); 
            UpdateData($Response) ; 
        }
    }

    // echo json_encode($Response[0]) ; 
 
?>              
<script>
    var response  ;
  
    response = '<?= json_encode($Response[0]) ?>' ; 
    window.ReactNativeWebView.postMessage(response) ; 

</script>

</body>
</html>


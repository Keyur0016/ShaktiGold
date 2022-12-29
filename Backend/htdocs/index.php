<?php

// Setup Database connection
require './DatabaseConnection.php' ; 

// Start session 
session_start() ; 

// Order information related variable 
$Order_information_data  ; 
$Order_username ; 
$Order_subtotal ; 
$Order_id ; 
$Order_date ; 
$Order_cancel_date ;
$Order_cancel_reason ; 
$Order_mobile_number ; 
$Order_payment_method ; 
$Order_payment_id ; 
$Order_street_address ; 
$Order_area ;
$Order_user_id ; 
$Order_pincode ; 
$Order_landmark ; 
$order_product_image ; 
$Order_product_information ; 
$Order_product_weight ; 
$Order_product_size ; 
$Order_retail_price ; 
$Order_discount_price ; 
$Order_product_tag ; 
$Order_product_data ; 
$Order_product_division_i = 0 ; 
$Order_division_i = 0 ; 
$Order_temp_status ; 
$Order_product_count = 0 ; 
$Order_refund_status ; 

// UserInformation related variable 
$List_username ; 
$List_index ; 
$List_mobilenumber ; 
$List_userdata ; 

// UserSell Information related variable 
$Sell_index ; 
$Sell_order_id ; 
$Sell_username ; 
$Sell_user_mobile_number ; 
$Sell_order_total ; 
$Sell_order_date ; 
$Sell_product_weight ; 
$Sell_product_type ; 
$Sell_product_data ; 
$Sell_order_status ; 

// Dashboard gold category related variable 
$Gold_category_name ; 
$Gold_category_image ; 
$Gold_category_weight ;

// Dashboard silver category related variable 
$Silver_category_name ; 
$Silver_category_image ; 
$Silver_category_weight ; 

// Refund payment related variable 
$Refund_payment_index ; 
$Refund_payment_id;
$Refund_payment_order_id ; 
$Refund_payment_username ; 
$Refund_payment_mobile_number ; 
$Refund_payment_subtotal ; 
$Refund_payment_order_date ; 
$Refund_payment_status ; 
$Refund_payment_user_id ; 


if (!isset($_SESSION['Order_information'])){

    $_SESSION['Order_information'] = array() ; 
}



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Mukta:wght@500&family=Ubuntu:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="shortcut icon" href="./ShaktiGold.png" type="image/x-icon">
    <title>ShaktiGold</title>
</head>
<body>

    <div id="ShaktiGold">
        
        <!-- ==== Start Admin Option layout ====  -->
        
        <div id="OptionDiv">

            <div id="ShaktiGold_option_title"
                onclick="Load_dashboard()">ShaktiGold Admin panel</div>

            <!-- Admin all option  -->
            <div class="Admin_option_layout" onclick="Pending_order_data_fetch()">Check out Order</div>
            <div class="Admin_option_layout" onclick="Server_cancel_order_data_fetch()">ShaktiGold cancel order</div>
            <div class="Admin_option_layout" onclick="User_cancel_order_function()">User cancel Order</div>
            <div class="Admin_option_layout" onclick="Load_user_data()">User information</div>
            <div class="Admin_option_layout" onclick="Set_order_sell_information_layout()">Checkout sell information</div>
            <div class="Admin_option_layout" onclick="Fetch_refund_payment_data()">Refund payment </div>
            <div class="Admin_option_layout" onclick="Set_update_refund_id_layout()">Update refund status</div>
        
        </div>

        <!-- ==== End Admin Option Layout ====  -->

        <!-- ==== Start Dashboard layout ====  -->
        
        <div id="Dashboard">

            <?php
                if (isset($_SESSION['Gold_total_weight'])){
                    ?>
                        <div id="All_dashboard_option">
            
                            <!-- Gold weight option  -->
            
                            <div class="Gold_weight_option">
            
                                <div class="Gold_weight_option_title">Total Gold weight</div>
            
                                <div class="Gold_weight_information"><?php echo $_SESSION['Gold_total_weight'] + $_SESSION['Gold_order_weight']  ;    ?>gm</div>
                                
                                <div class="Weight_distribution">
            
                                    <div class="Market_weight">Market weight = <?php echo $_SESSION['Gold_total_weight'];  ?>gm</div>
                                    <div class="Order_weight">Order weight = <?php echo $_SESSION['Gold_order_weight'] ; ?>gm</div>
                                
                                </div>
            
                            </div>
                            
                            <!-- Sliver weight option  -->
                            <div class="Gold_weight_option">
            
                                <div class="Gold_weight_option_title">Total Sliver weight</div>
                                <div class="Gold_weight_information"><?php echo $_SESSION['Silver_total_weight'] + $_SESSION['Silver_order_weight'] ;  ?>gm</div>
                                <div class="Weight_distribution">
                                    <div class="Market_weight">Market weight = <?php echo $_SESSION['Silver_total_weight']; ?>gm</div>
                                    <div class="Order_weight">Order weight = <?php echo $_SESSION['Silver_order_weight'];  ?>gm</div>
                                </div>
            
                            </div>
            
                            
                        </div>

                        <div id="Gold_silver_product">
                        
                            <div class="Category_wise_title">
                                Gold Product category
                            </div>
                
                            <div class="Category_wise_product_weight">
                                <?php
                                    global $Gold_category_name ; 
                                    global $Gold_category_image ; 
                                    global $Gold_category_weight ; 
                
                                    for($i=0; $i<count($_SESSION['Gold_product_data']); $i++){
                
                                        $Gold_category_name = $_SESSION['Gold_product_data'][$i][0] ; 
                                        $Gold_category_image = $_SESSION['Gold_product_data'][$i][1] ; 
                                        $Gold_category_weight = $_SESSION['Gold_product_data'][$i][2] ; 
                                        
                                        ?>
                                            <div class="Category_wise_product_div">
                                                <div class="Category_wise_product_title"><?php global $Gold_category_name; echo $Gold_category_name; ?></div>
                                                <img src="<?php global $Gold_category_image; echo $Gold_category_image;  ?>" alt=""
                                                height="60px" width="60px">
                                                <div class="Category_wise_product_data"><?php global $Gold_category_weight; echo $Gold_category_weight; ?>gm</div>
                                            </div>
                                        <?php
                                    }
                                ?>
                            </div>
                
                            <div class="Category_wise_title">
                                Silver Product category
                            </div>
                
                            <div class="Category_wise_product_weight">
                                <?php
                                    global $Silver_category_name ; 
                                    global $Silver_category_image ; 
                                    global $Silver_category_weight ; 
                
                                    for($i=0; $i<count($_SESSION['Silver_product_data']); $i++){
                                        
                                        $Silver_category_name = $_SESSION['Silver_product_data'][$i][0] ; 
                                        $Silver_category_image = $_SESSION['Silver_product_data'][$i][1] ; 
                                        $Silver_category_weight = $_SESSION['Silver_product_data'][$i][2] ; 
                
                                        ?>
                                            <div class="Category_wise_product_div">
                                                <div class="Category_wise_product_title"><?php global $Silver_category_name; echo $Silver_category_name; ?></div>
                                                <img src="<?php global $Silver_category_image; echo $Silver_category_image;  ?>" alt=""
                                                height="60px" width="60px">
                                                <div class="Category_wise_product_data"><?php global $Silver_category_weight; echo $Silver_category_weight ; ?>gm</div>
                                            </div>
                                        <?php
                                    }
                                ?>
                            </div>

                        </div>
            
                    <?php
                }
            ?>


        </div>

        <!-- ==== End Dashboard layout ====  -->
        
        <!-- ==== Start Order information layout ====  -->

        <div id="Order_layout" >
            <?php
                if (isset($_SESSION['Order_information'])){
                    
                    global  $Order_information_data  ; 
                    global  $Order_username ; 
                    global  $Order_subtotal ; 
                    global  $Order_id ; 
                    global  $Order_date ; 
                    global  $Order_cancel_date ;
                    global  $Order_cancel_reason ; 
                    global  $Order_mobile_number ; 
                    global  $Order_payment_method ; 
                    global  $Order_payment_id ; 
                    global  $Order_street_address ; 
                    global  $Order_area ; 
                    global  $Order_pincode ; 
                    global  $Order_landmark ; 
                    global  $order_product_image ; 
                    global  $Order_product_information ; 
                    global  $Order_product_weight ; 
                    global  $Order_product_size ; 
                    global  $Order_retail_price ; 
                    global  $Order_discount_price ; 
                    global  $Order_product_data ; 
                    global  $Order_division_i; 
                    global  $Order_user_id ; 
                    global $Order_refund_status; 

                    for($i=0 ; $i<count($_SESSION["Order_information"]); $i++){

                        $Order_information_data = $_SESSION{'Order_information'}[$i][0] ;

                        // OrderId 
                        $Order_id = $Order_information_data["Order_id"] ; 
                        
                        // Order date
                        $Order_date = $Order_information_data["Order_place_date"] ;
                        
                        // Order payment method 
                        $Order_payment_method = $Order_information_data["Payment_method"] ; 

                        // Order payment id 
                        $Order_payment_id = $Order_information_data["Payment_id"] ; 

                        // Order Username 
                        $Order_username = $Order_information_data["Order_username"] ; 

                        // Order subtotal value 
                        $Order_subtotal = $Order_information_data['Order_total'] ; 

                        // Order street address 
                        $Order_street_address = $Order_information_data["Street_address"] ; 

                        // Order area information 
                        $Order_area = $Order_information_data["Area"]; 

                        // Order Landmark information 
                        $Order_landmark = $Order_information_data['Landmark'] ;

                        // Order Pincode information 
                        $Order_pincode = $Order_information_data["Pincode"] ; 

                        // Order cancel date information 
                        $Order_cancel_date = $Order_information_data['Order_deliver_date'] ; 

                        // Order cancel reason information 
                        $Order_cancel_reason = $Order_information_data['Order_cancel_reason'] ; 

                        // Order user id 
                        $Order_user_id = $Order_information_data['Userid'] ; 

                        // Order mobile number
                        $Order_mobile_number = $Order_information_data['Mobile_number'] ; 

                        // Order refund status 
                        $Order_refund_status = $Order_information_data['Refund_status'] ; 

                        // Set i value
                        $Order_division_i = $i ; 

                        ?>
                
                            <div class="Order_data_layout" style="padding-bottom:1rem;">

                                <!-- Order username and index information  -->
                                
                                <div class="Order_data_username UsernameTitleLayout">
                                    
                                    <!-- Order index information  -->
                                    <div class="Order_data_index"><?php global $Order_division_i; echo $Order_division_i + 1; ?></div>

                                    <div class="Order_data_usernameTitle">Username = &nbsp;</div>
                                    <div class="Order_data_usernameData"><?php global $Order_username; echo $Order_username; ?>&nbsp;</div>
                            
                                </div>

                                <!-- Order subtotal information  -->

                                <div class="Order_data_username Datadiv">
                
                                    <div class="Order_data1">

                                        <div class="Order_data_usernameTitle Data1Title">Order subtotal &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Order_subtotal; echo $Order_subtotal;?></div>
        
                                    </div>
            
                                </div>
                
                                <!-- Order date and id information  -->

                                <div class="Order_data_username Datadiv">
                
                                    <div class="Order_data1">

                                        <div class="Order_data_usernameTitle Data1Title">Order date &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_date; echo $Order_date;?></div>
        
                                    </div>
                
                                    <div class="Order_data1">
        
                                    <div class="Order_data_usernameTitle Data1Title BorderLayout">Order id : &nbsp;</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Order_id; echo $Order_id; ?>  &nbsp;</div>
        
                                    </div>
                
                                </div>

                                <!-- If order cancel by user or admin than show cancel date and cancel reason  -->
 
                                <?php
                                    
                                    if ($_SESSION['Order_status'] == "User-cancel"){
                                        ?>
                                        <div class="Order_data_username Datadiv">
                
                                            <div class="Order_data1">

                                                <div class="Order_data_usernameTitle Data1Title">Order cancel date  &nbsp;:</div>
                                                <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_cancel_date; echo                                                                $Order_cancel_date; ?></div>

                                            </div>

                                            <div class="Order_data1">

                                            <div class="Order_data_usernameTitle Data1Title BorderLayout">Order cancel reason : &nbsp;</div>
                                                <div class="Order_data_usernameData Data2Title"><?php global $Order_cancel_reason; echo                                                                    $Order_cancel_reason; ?>  &nbsp;</div>

                                            </div>

                                        </div>
                                        <?php

                                    }
                                    

                                    if ($_SESSION['Order_status'] == "Server-cancel"){
                                        ?>
                                        <div class="Order_data_username Datadiv">
                
                                            <div class="Order_data1">

                                                <div class="Order_data_usernameTitle Data1Title">Order cancel date  &nbsp;:</div>
                                                <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_cancel_date; echo $Order_cancel_date; ?></div>

                                            </div>

                                            <div class="Order_data1">

                                            <div class="Order_data_usernameTitle Data1Title BorderLayout">Order cancel reason : &nbsp;</div>
                                                <div class="Order_data_usernameData Data2Title"><?php global $Order_cancel_reason; echo $Order_cancel_reason; ?>  &nbsp;</div>

                                            </div>

                                        </div>
                                        <?php

                                    }
                                ?>
                
                                <!-- Order Payment method information  -->
                                <div class="Order_data_username Datadiv">
                
                                    <div class="Order_data1">

                                        <div class="Order_data_usernameTitle Data1Title">Payment method &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp; <?php global $Order_payment_method; echo $Order_payment_method; ?></div>
                                    
                                    </div>
                
                                    <?php
                                        
                                        global $Order_payment_method ; 

                                        if ($Order_payment_method != "Cash on delivery"){

                                            ?>
                                                <div class="Order_data1">
                                                
                                                    <div class="Order_data_usernameTitle Data1Title BorderLayout">Payment id : &nbsp;</div>
                                                    <div class="Order_data_usernameData Data2Title"><?php global $Order_payment_id; echo $Order_payment_id; ?></div>
                                                
                                                </div>
                                            <?php
                                        }
                                    ?>
                                
                                </div>

                                <!-- Order mobile number information division  -->
                                
                                <div class="Order_data_username Datadiv MobileNumberBorder">
                
                                    <div class="Order_data1">
                                        <div class="Order_data_usernameTitle Data1Title">Mobile number &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp; <?php global $Order_mobile_number; echo $Order_mobile_number;  ?></div>
                                    </div>

                                    <!-- Show refund status   -->

                                    <?php
                                       global $Order_payment_method; 
                                       if (($_SESSION['Order_status'] == "Server-cancel") or ($_SESSION['Order_status'] == 'User-cancel')){
                                           if ($Order_payment_method == "Payment success"){
                                               ?>
                                                <div class="Order_data1">

                                                        <div class="Order_data_usernameTitle Data1Title BorderLayout" style="color: red;">Refund status : &nbsp;</div>
                                                            <div class="Order_data_usernameData Data2Title"><?php global $Order_refund_status; echo                                                                    $Order_refund_status; ?>  &nbsp;</div>

                                                </div>
                                               <?php
                                           } 
                                       }
                                    ?>
                
                                </div>

                                <?php
                                
                                    global $Order_information_data ; 
                                    global $Order_division_i ;
                                    global $Order_product_data ; 
                                    global $Order_product_information ; 
                                    global $Order_product_weight; 
                                    global $Order_product_size; 
                                    global $order_product_image; 
                                    global $Order_retail_price ; 
                                    global $Order_discount_price ;
                                    global $Order_product_tag ;
                                
                                
                                    for($j=0; $j<ceil(count($_SESSION['Order_information'][$Order_division_i][1]) / 2); $j++){
                                        
                                        ?>
                                            <div class="Product_data_div">
                                        <?php
                                        
                                        for ($k = 0 ; $k<2; $k++){
                                            
                                            if (count($_SESSION['Order_information'][$Order_division_i][1]) != $Order_product_division_i){

                                                // Order Product data 
                                                $Order_product_data = $_SESSION['Order_information'][$Order_division_i][1][$Order_product_division_i] ; 

                                                $Order_product_division_i = $Order_product_division_i + 1; 

                                                // Order Product Image 
                                                $Order_product_image = $Order_product_data["Product_image1"] ; 

                                                // Order Product weight 
                                                $Order_product_weight = $Order_product_data["Product_weight"] ; 

                                                // Order Product size 
                                                $Order_product_size = $Order_product_data["Product_size"] ; 

                                                // Product retail price
                                                $Order_retail_price = $Order_product_data["Product_retail_price"] ; 

                                                // Product discount price
                                                $Order_discount_price = $Order_product_data['Product_discount_price'] ; 

                                                // Product tag
                                                $Order_product_tag = $Order_product_data["Product_tag"] ; 
                                                ?>
                                                    
                                                    <!-- Product data information  -->
                                                    <div class="Product_data_information">
                                                        
                                                        <!-- Product image division  -->
                                                        <div class="Product_image">
                                                            <img src="<?php global $Order_product_image; echo $Order_product_image;  ?>" alt="Product image"
                                                            class="Product_image_data">
                                                        </div>
                                                        
                                                        <!-- Product information data  -->
                                                        <div class="Product_all_data">

                                                            <!-- Product information  -->

                                                            <div class="Product_information"><?php global $Order_product_information; echo                                                                             $Order_product_information;  ?></div>
                                                
                                                            <div class="Product_weight_size">
                                                
                                                                <!-- Product weight information  -->

                                                                <div class="Product_weight_data">
                                                                    <div class="Product_weight_title">Weight</div>
                                                                    <div class="Product_weight"><?php global $Order_product_weight; echo $Order_product_weight;  ?></div>
                                                                </div>
                                                                
                                                                <!-- Product size information  -->
                                                                
                                                                <div class="Product_weight_data sizeLayout">
                                                                    <div class="Product_weight_title">Size</div>
                                                                    <div class="Product_weight"><?php global $Order_product_size; echo $Order_product_size; ?></div>
                                                                </div>

                                                                <div class="Product_weight_data sizeLayout">
                                                                    <div class="Product_weight_title">TAG</div>
                                                                    <div class="Product_weight"><?php global $Order_product_tag; echo $Order_product_tag; ?></div>
                                                                </div>
                                                
                                                            </div>
                                                        
                                                            <!-- Product price information  -->
                                                            <div class="Product_price_information">
                                                
                                                                <div class="Product_price_title Product_weight_title">Price</div>
                                                                <div class="Product_discount_price"><strike><?php global $Order_retail_price; echo $Order_retail_price; ?></strike></div>
                                                                <div class="Product_retail_price"><?php global $Order_discount_price; echo $Order_discount_price;  ?></div>
                                                            
                                                            </div>
                                                
                                                        </div>
                                                
                                                    </div>

                                                <?php
                                            }
                
                                        }

                                        ?>
                                            </div>
                                        <?php
                                    }
                                ?>
                                
                                <!-- Order address information  -->
                                <div class="Address_information_div">
                                    <div class="Address_title">Address</div>
                                    <div class="Address_data"><?php global $Order_street_address; echo $Order_street_address;  ?></div>
                                    <div class="Address_data"><?php global $Order_area; echo $Order_area;?> , <?php global $Order_landmark; echo $Order_landmark; ?> 
                                    | Pincode = <?php global $Order_pincode; echo $Order_pincode;  ?></div>
                                </div>
                
                                <!-- Cancel order and Bill Print option  -->

                                <div class="Admin_access_product_option">
                                    
                                    <?php
                                        if($_SESSION['Order_status'] == "Pending" or $_SESSION['Order_status'] == 'Online payment' ){
                                            ?>

                                                    <div class="Admin_access_product_option_layout"
                                                        onclick="Cancel_order_reason_layout_set('<?php global $Order_user_id; echo $Order_user_id; ?>', 
                                                        '<?php global $Order_mobile_number; echo $Order_mobile_number;  ?>', 
                                                        '<?php global $Order_id; echo $Order_id;  ?>')" >Cancel order</div>
                                                
                                                <?php
                                        }
                                    ?>
                                    
                                    <div class="Admin_access_product_option_layout" 
                                    <?php
                                            if ($_SESSION['Order_status'] == "User-cancel" or $_SESSION['Order_status'] == "Server-cancel"){
                                                ?>
                                                    style="margin-left:auto; margin-right:auto; text-align:center; "
                                                    <?php
                                            }
                                            ?>
                                        onclick="Print_bill_information('<?php global $Order_division_i; echo $Order_division_i; ?>')">Bill print</div>
                                        
                                    </div>
                                </div>
                        
                        <?php

                        global $Order_product_division_i; 
                        global $Order_product_count ; 

                        $Order_product_division_i = 0 ; 
                        $Order_product_count = 0 ; 
                    }

                }
                else{

                }
            ?>

            <?php
                if (count($_SESSION['Order_information']) == 0){
                    ?>
                       <div id="Not_found_order">Not found any order</div>
                    <?php
                }
            ?>
        </div>

        <!-- ==== Stop Order information layout ====  -->

        <!-- ==== Start order cancel reason ====  -->

        <div class="Admin_login_div" id="Cancel_order_division">

            <div class="Admin_login" id="Cancel_order_layout">

                <div class="Admin_login_title">Cancel order reason</div>
                <input type="text" name="" id="Cancel_reason" class="Admin_input"
                placeholder="Enter cancel order reason">
                <div class="Admin_login_button"
                    onclick="Cancel_order_function()" >Cancel order</div>
            
            </div>

        </div>

        <!-- ==== Stop order cancel reason ====  -->

        <!-- ==== Start user information layout ====  -->

        <div id="UserInformation_layout">

            <div id="SearchLayout">
                <div id="BackButton" onclick="Load_user_data()" >Back</div>
                <div id="SearchButton" onclick="User_search_function()">Search</div>
                <input type="text" name="" id="SearchInput" placeholder="Search by Username">
            </div>

            <div id="UserInformation_list_layout">

                <div class="UserInformation_list_data ListIndexLayout">
                    <div class="UserInformation_list_index ListIndexData">Index</div>
                    <div class="UserInformation_list_data_title ListIndexData">Username</div>
                    <div class="UserInformation_list_data_information ListIndexData">Mobile number</div>
                </div>

                <?php
                    
                    global $List_userdata; 
                    global $List_username; 
                    global $List_mobilenumber; 
                    global $List_index ; 
                    if (isset($_SESSION['userdata'])){
                        for($i = 0; $i<count($_SESSION['userdata']); $i++){
                             
                            $List_userdata = $_SESSION['userdata'][$i] ; 
                            $List_username = $List_userdata['Username'] ; 
                            $List_mobilenumber = $List_userdata['Mobilenumber'] ; 
                            $List_index = $i + 1 ; 
                            ?>

                                <div class="UserInformation_list_data OtherIndexLayout">

                                    <div class="UserInformation_list_index OtherIndexData">
                                        <?php global $List_index; echo $List_index;  ?>
                                    </div>
                                    
                                    <div class="UserInformation_list_data_title OtherIndexData">
                                        <?php global $List_username; echo $List_username; ?>
                                    </div>
                                    
                                    <div class="UserInformation_list_data_information OtherIndexData">
                                        <?php global $List_mobilenumber; echo $List_mobilenumber;  ?>
                                    </div>
                                
                                </div>

                            <?php
                        }
                    }
                ?>

            
            </div>

        </div>

        <!-- ==== Stop user information layout ====  -->

        <!-- ==== Start Particular order sell information layout ==== -->
        
        <div id="Order_sell_information">

            <!-- ==== Start order sell option layout ====  -->

            <div class="Order_sell_option">
              
                <div id="Order_close"
                    onclick="Search_order_close()">X</div>
                    
                <div class="Order_sell_layout"
                    onclick="Load_today_order_data()">
                    Today sell
                </div>

                <div class="Order_sell_layout"
                    onclick="Yesterday_order_data()">
                    Yesterday sell
                </div>

                <div class="Order_sell_layout"
                    onclick="Week_order_data()">
                    Week sell
                </div>

                <div class="Order_sell_layout"
                    onclick="Search_by_order_id_function()">
                    Search by order id
                </div>

                <div class="Order_sell_layout"
                    onclick="Order_date_set_layout_function()">
                    Search by date
                </div>

            </div>

            <!-- ==== Stop order sell option layout ====  -->

            <div class="Sell_weight_price_information" id="Sell_price_information">

                <div class="Sell_option" style="background-color: #a4deff; ">
                    Selling Gold weight = <?php echo $_SESSION['Today_order_gold_weight']; ?>gm
                </div>
                 
                <div class="Sell_option">
                    Selling gold price = 
                    <?php echo $_SESSION['Today_order_gold_discount_price'] ; ?>/-
                </div>

                <div class="Sell_option" style="background-color: #a4deff;">
                    Selling Silver weight = <?php echo $_SESSION['Today_order_silver_weight']; ?>gm
                </div>

                <div class="Sell_option">
                    Selling Silver price =  
                    <?php echo $_SESSION['Today_order_silver_discount_price'];  ?>
                </div>
                    
            </div>

            <!-- ==== Stop order sell option layout ====  -->

            <div id="Sell_order_list_processing">
                <div class="spinner-border" id="SpinnerLayout"  role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div id="Sell_list_division">

                <div class="Sell_list_index  SellIndexLayout">

                    <div class="Sell_list_index_data Sell_index_font">Index</div>
                    <div class="Sell_list_order_id Sell_index_font SellIndexBorder">Order id</div>
                    <div class="Sell_list_username Sell_index_font SellIndexBorder">Username</div>
                    <div class="Sell_list_mobile_number Sell_index_font SellIndexBorder">Mobilenumber</div>
                    <div class="Sell_list_order_status SellIndexBorder Sell_index_font">Order status</div>
                    <div class="Sell_list_order_date Sell_index_font SellIndexBorder" >Order date</div>
                    <div class="Sell_list_order_value Sell_index_font SellIndexBorder">Order value</div>

                </div>

                <?php
                   
                    if (isset($_SESSION["Today_order"])){

                        global $Sell_index; 
                        global $Sell_username ; 
                        global $Sell_order_id ; 
                        global $Sell_user_mobile_number ;
                        global $Sell_order_total ; 
                        global $Sell_product_data ; 
                        global $Sell_order_status ; 

                        for($i=0 ; $i<count($_SESSION['Today_order']); $i++){

    
                            $Sell_product_data = $_SESSION['Today_order'][$i] ; 
                            $Sell_index = $i + 1; 
                            
                            $Sell_order_id = $Sell_product_data['Order_id'] ; 
                            $Sell_username = $Sell_product_data['Order_username']; 
                            $Sell_user_mobile_number = $Sell_product_data['Mobile_number'] ; 
                            $Sell_order_total = $Sell_product_data['Order_total'] ; 
                            $Sell_order_status = $Sell_product_data['Order_status'] ; 
                            $Sell_order_date = $Sell_product_data['Order_place_date']; 

                            ?>
                                <div class="Sell_list_index OtherSellData">
                
                                    <div class="Sell_list_index_data Sell_index_font">
                                        <?php global $Sell_index; echo $Sell_index;  ?>
                                    </div>

                                    <div class="Sell_list_order_id Sell_index_font SellIndexBorder">
                                        <?php global $Sell_order_id; echo $Sell_order_id; ?>
                                        <img src="./copy.png" alt="" height="20px" width="20px" style="float:right; margin-right:5px; cursor:pointer;"
                                        onclick="Copy_to_clipboard('<?php global $Sell_order_id; echo $Sell_order_id; ?>')">
                                    </div>
                                    
                                    <div class="Sell_list_username Sell_index_font SellIndexBorder">
                                        <?php global $Sell_username; echo $Sell_username; ?>
                                    </div>
                                    
                                    <div class="Sell_list_mobile_number Sell_index_font SellIndexBorder">
                                        <?php global $Sell_user_mobile_number; echo $Sell_user_mobile_number;  ?>
                                    </div>
                                    
                                    <div class="Sell_list_order_status Sell_index_font SellIndexBorder" >
                                        <?php global $Sell_order_status; 
                                            
                                            if ($Sell_order_status == "Pending"){
                                                echo "Pending"; 
                                            }
                                            else if ($Sell_order_status == "User-cancel"){
                                                echo "User cancel"; 
                                            }
                                            else if ($Sell_order_status == "Server-cancel"){
                                                echo "ShaktiGold Cancel" ; 
                                            }
                                            else if ($Sell_order_status == "Online payment"){
                                                echo "Online payment" ; 
                                            }
                                        ?>
                                    </div>
                                    
                                    <div class="Sell_list_order_date Sell_index_font SellIndexBorder">
                                        <?php global $Sell_order_date; echo $Sell_order_date;  ?>
                                    </div>

                                    <div class="Sell_list_order_value Sell_index_font SellIndexBorder">
                                        <?php global $Sell_order_total; echo $Sell_order_total;  ?>/-
                                    </div>

                
                                </div>
                            <?php
                        }
                    }
                ?>

                <?php
                   
                   if (count($Sell_user_mobile_number['Today_order']) == 0){
                        ?>
                            <div id="Not_found_order">Not found any order</div>
                        <?php
                   }
                ?>
                  
                

            </div>

            <!-- ==== Start order id wise search layout ====  -->

            <div id="Sell_order_layout">

                <?php
                    if (isset($_SESSION['Order_information'])){
                        
                        global  $Order_information_data  ; 
                        global  $Order_username ; 
                        global  $Order_subtotal ; 
                        global  $Order_id ; 
                        global  $Order_date ; 
                        global  $Order_cancel_date ;
                        global  $Order_cancel_reason ; 
                        global  $Order_mobile_number ; 
                        global  $Order_payment_method ; 
                        global  $Order_payment_id ; 
                        global  $Order_street_address ; 
                        global  $Order_area ; 
                        global  $Order_pincode ; 
                        global  $Order_landmark ; 
                        global  $order_product_image ; 
                        global  $Order_product_information ; 
                        global  $Order_product_weight ; 
                        global  $Order_product_size ; 
                        global  $Order_retail_price ; 
                        global  $Order_discount_price ; 
                        global  $Order_product_data ; 
                        global  $Order_division_i; 
                        global  $Order_user_id ; 
                        global $Order_refund_status; 

                        for($i=0 ; $i<count($_SESSION["Order_information"]); $i++){

                            $Order_information_data = $_SESSION{'Order_information'}[$i][0] ;

                            // OrderId 
                            $Order_id = $Order_information_data["Order_id"] ; 
                            
                            // Order date
                            $Order_date = $Order_information_data["Order_place_date"] ;
                            
                            // Order payment method 
                            $Order_payment_method = $Order_information_data["Payment_method"] ; 

                            // Order payment id 
                            $Order_payment_id = $Order_information_data["Payment_id"] ; 

                            // Order Username 
                            $Order_username = $Order_information_data["Order_username"] ; 

                            // Order subtotal value 
                            $Order_subtotal = $Order_information_data['Order_total'] ; 

                            // Order street address 
                            $Order_street_address = $Order_information_data["Street_address"] ; 

                            // Order area information 
                            $Order_area = $Order_information_data["Area"]; 

                            // Order Landmark information 
                            $Order_landmark = $Order_information_data['Landmark'] ;

                            // Order Pincode information 
                            $Order_pincode = $Order_information_data["Pincode"] ; 

                            // Order cancel date information 
                            $Order_cancel_date = $Order_information_data['Order_deliver_date'] ; 

                            // Order cancel reason information 
                            $Order_cancel_reason = $Order_information_data['Order_cancel_reason'] ; 

                            // Order user id 
                            $Order_user_id = $Order_information_data['Userid'] ; 

                            // Order mobile number
                            $Order_mobile_number = $Order_information_data['Mobile_number'] ; 

                            // Order refund status 
                            $Order_refund_status = $Order_information_data['Refund_status'] ; 

                            // Set i value
                            $Order_division_i = $i ; 

                            ?>
                    
                                <div class="Order_data_layout" style="padding-bottom:1rem;">

                                    <!-- Order username and index information  -->
                                    
                                    <div class="Order_data_username UsernameTitleLayout">
                                        
                                        <!-- Order index information  -->
                                        <div class="Order_data_index"><?php global $Order_division_i; echo $Order_division_i + 1; ?></div>

                                        <div class="Order_data_usernameTitle">Username = &nbsp;</div>
                                        <div class="Order_data_usernameData"><?php global $Order_username; echo $Order_username; ?>&nbsp;</div>
                                
                                    </div>

                                    <!-- Order subtotal information  -->

                                    <div class="Order_data_username Datadiv">
                    
                                        <div class="Order_data1">

                                            <div class="Order_data_usernameTitle Data1Title">Order subtotal &nbsp;:</div>
                                            <div class="Order_data_usernameData Data2Title"><?php global $Order_subtotal; echo $Order_subtotal;?></div>
            
                                        </div>
                
                                    </div>
                    
                                    <!-- Order date and id information  -->

                                    <div class="Order_data_username Datadiv">
                    
                                        <div class="Order_data1">

                                            <div class="Order_data_usernameTitle Data1Title">Order date &nbsp;:</div>
                                            <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_date; echo $Order_date;?></div>
            
                                        </div>
                    
                                        <div class="Order_data1">
            
                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Order id : &nbsp;</div>
                                            <div class="Order_data_usernameData Data2Title"><?php global $Order_id; echo $Order_id; ?>  &nbsp;</div>
            
                                        </div>
                    
                                    </div>

                                    <!-- If order cancel by user or admin than show cancel date and cancel reason  -->
    
                                    <?php
                                        
                                        if ($_SESSION['Order_status'] == "User-cancel"){
                                            ?>
                                            <div class="Order_data_username Datadiv">
                    
                                                <div class="Order_data1">

                                                    <div class="Order_data_usernameTitle Data1Title">Order cancel date  &nbsp;:</div>
                                                    <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_cancel_date; echo                                                                $Order_cancel_date; ?></div>

                                                </div>

                                                <div class="Order_data1">

                                                <div class="Order_data_usernameTitle Data1Title BorderLayout">Order cancel reason : &nbsp;</div>
                                                    <div class="Order_data_usernameData Data2Title"><?php global $Order_cancel_reason; echo                                                                    $Order_cancel_reason; ?>  &nbsp;</div>

                                                </div>

                                            </div>
                                            <?php

                                        }
                                        

                                        if ($_SESSION['Order_status'] == "Server-cancel"){
                                            ?>
                                            <div class="Order_data_username Datadiv">
                    
                                                <div class="Order_data1">

                                                    <div class="Order_data_usernameTitle Data1Title">Order cancel date  &nbsp;:</div>
                                                    <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Order_cancel_date; echo $Order_cancel_date; ?></div>

                                                </div>

                                                <div class="Order_data1">

                                                <div class="Order_data_usernameTitle Data1Title BorderLayout">Order cancel reason : &nbsp;</div>
                                                    <div class="Order_data_usernameData Data2Title"><?php global $Order_cancel_reason; echo $Order_cancel_reason; ?>  &nbsp;</div>

                                                </div>

                                            </div>
                                            <?php

                                        }
                                    ?>
                    
                                    <!-- Order Payment method information  -->
                                    <div class="Order_data_username Datadiv">
                    
                                        <div class="Order_data1">

                                            <div class="Order_data_usernameTitle Data1Title">Payment method &nbsp;:</div>
                                            <div class="Order_data_usernameData Data2Title"> &nbsp; <?php global $Order_payment_method; echo $Order_payment_method; ?></div>
                                        
                                        </div>
                    
                                        <?php
                                            
                                            global $Order_payment_method ; 

                                            if ($Order_payment_method != "Cash on delivery"){

                                                ?>
                                                    <div class="Order_data1">
                                                    
                                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Payment id : &nbsp;</div>
                                                        <div class="Order_data_usernameData Data2Title"><?php global $Order_payment_id; echo $Order_payment_id; ?></div>
                                                    
                                                    </div>
                                                <?php
                                            }
                                        ?>
                                    
                                    </div>

                                    <!-- Order mobile number information division  -->
                                    
                                    <div class="Order_data_username Datadiv MobileNumberBorder">
                    
                                        <div class="Order_data1">
                                            <div class="Order_data_usernameTitle Data1Title">Mobile number &nbsp;:</div>
                                            <div class="Order_data_usernameData Data2Title"> &nbsp; <?php global $Order_mobile_number; echo $Order_mobile_number;  ?></div>
                                        </div>

                                        <!-- Show refund status   -->

                                        <?php
                                        global $Order_payment_method; 
                                        if (($_SESSION['Order_status'] == "Server-cancel") or ($_SESSION['Order_status'] == 'User-cancel')){
                                            if ($Order_payment_method == "Payment success"){
                                                ?>
                                                    <div class="Order_data1">

                                                            <div class="Order_data_usernameTitle Data1Title BorderLayout" style="color: red;">Refund status : &nbsp;</div>
                                                                <div class="Order_data_usernameData Data2Title"><?php global $Order_refund_status; echo                                                                    $Order_refund_status; ?>  &nbsp;</div>

                                                    </div>
                                                <?php
                                            } 
                                        }
                                        ?>
                    
                                    </div>

                                    <?php
                                    
                                        global $Order_information_data ; 
                                        global $Order_division_i ;
                                        global $Order_product_data ; 
                                        global $Order_product_information ; 
                                        global $Order_product_weight; 
                                        global $Order_product_size; 
                                        global $order_product_image; 
                                        global $Order_retail_price ; 
                                        global $Order_discount_price ;
                                        global $Order_product_tag ;
                                    
                                    
                                        for($j=0; $j<ceil(count($_SESSION['Order_information'][$Order_division_i][1]) / 2); $j++){
                                            
                                            ?>
                                                <div class="Product_data_div">
                                            <?php
                                            
                                            for ($k = 0 ; $k<2; $k++){
                                                
                                                if (count($_SESSION['Order_information'][$Order_division_i][1]) != $Order_product_division_i){

                                                    // Order Product data 
                                                    $Order_product_data = $_SESSION['Order_information'][$Order_division_i][1][$Order_product_division_i] ; 

                                                    $Order_product_division_i = $Order_product_division_i + 1; 

                                                    // Order Product Image 
                                                    $Order_product_image = $Order_product_data["Product_image1"] ; 

                                                    // Order Product weight 
                                                    $Order_product_weight = $Order_product_data["Product_weight"] ; 

                                                    // Order Product size 
                                                    $Order_product_size = $Order_product_data["Product_size"] ; 

                                                    // Product retail price
                                                    $Order_retail_price = $Order_product_data["Product_retail_price"] ; 

                                                    // Product discount price
                                                    $Order_discount_price = $Order_product_data['Product_discount_price'] ; 

                                                    // Product tag
                                                    $Order_product_tag = $Order_product_data["Product_tag"] ; 
                                                    ?>
                                                        
                                                        <!-- Product data information  -->
                                                        <div class="Product_data_information">
                                                            
                                                            <!-- Product image division  -->
                                                            <div class="Product_image">
                                                                <img src="<?php global $Order_product_image; echo $Order_product_image;  ?>" alt="Product image"
                                                                class="Product_image_data">
                                                            </div>
                                                            
                                                            <!-- Product information data  -->
                                                            <div class="Product_all_data">

                                                                <!-- Product information  -->

                                                                <div class="Product_information"><?php global $Order_product_information; echo                                                                             $Order_product_information;  ?></div>
                                                    
                                                                <div class="Product_weight_size">
                                                    
                                                                    <!-- Product weight information  -->

                                                                    <div class="Product_weight_data">
                                                                        <div class="Product_weight_title">Weight</div>
                                                                        <div class="Product_weight"><?php global $Order_product_weight; echo $Order_product_weight;  ?></div>
                                                                    </div>
                                                                    
                                                                    <!-- Product size information  -->
                                                                    
                                                                    <div class="Product_weight_data sizeLayout">
                                                                        <div class="Product_weight_title">Size</div>
                                                                        <div class="Product_weight"><?php global $Order_product_size; echo $Order_product_size; ?></div>
                                                                    </div>

                                                                    <div class="Product_weight_data sizeLayout">
                                                                        <div class="Product_weight_title">TAG</div>
                                                                        <div class="Product_weight"><?php global $Order_product_tag; echo $Order_product_tag; ?></div>
                                                                    </div>
                                                    
                                                                </div>
                                                            
                                                                <!-- Product price information  -->
                                                                <div class="Product_price_information">
                                                    
                                                                    <div class="Product_price_title Product_weight_title">Price</div>
                                                                    <div class="Product_discount_price"><strike><?php global $Order_retail_price; echo $Order_retail_price; ?></strike></div>
                                                                    <div class="Product_retail_price"><?php global $Order_discount_price; echo $Order_discount_price;  ?></div>
                                                                
                                                                </div>
                                                    
                                                            </div>
                                                    
                                                        </div>

                                                    <?php
                                                }
                    
                                            }

                                            ?>
                                                </div>
                                            <?php
                                        }
                                    ?>
                                    
                                    <!-- Order address information  -->
                                    <div class="Address_information_div">
                                        <div class="Address_title">Address</div>
                                        <div class="Address_data"><?php global $Order_street_address; echo $Order_street_address;  ?></div>
                                        <div class="Address_data"><?php global $Order_area; echo $Order_area;?> , <?php global $Order_landmark; echo $Order_landmark; ?> 
                                        | Pincode = <?php global $Order_pincode; echo $Order_pincode;  ?></div>
                                    </div>
                    
                                    <!-- Cancel order and Bill Print option  -->

                                    <div class="Admin_access_product_option">
                                        
                                        <?php
                                            if($_SESSION['Order_status'] == "Pending" or $_SESSION['Order_status'] == 'Online payment' ){
                                                ?>

                                                        <div class="Admin_access_product_option_layout"
                                                            onclick="Cancel_order_reason_layout_set('<?php global $Order_user_id; echo $Order_user_id; ?>', 
                                                            '<?php global $Order_mobile_number; echo $Order_mobile_number;  ?>', 
                                                            '<?php global $Order_id; echo $Order_id;  ?>')" >Cancel order</div>
                                                    
                                                    <?php
                                            }
                                        ?>
                                        
                                        <div class="Admin_access_product_option_layout" 
                                        <?php
                                                if ($_SESSION['Order_status'] == "User-cancel" or $_SESSION['Order_status'] == "Server-cancel"){
                                                    ?>
                                                        style="margin-left:auto; margin-right:auto; text-align:center; "
                                                        <?php
                                                }
                                                ?>
                                            onclick="Print_bill_information('<?php global $Order_division_i; echo $Order_division_i; ?>')">Bill print</div>
                                            
                                        </div>
                                    </div>
                            
                            <?php

                            global $Order_product_division_i; 
                            global $Order_product_count ; 

                            $Order_product_division_i = 0 ; 
                            $Order_product_count = 0 ; 
                        }

                    }
                    else{

                    }
                ?>

                <?php
                    if (count($_SESSION['Order_information']) == 0){
                        ?>
                        <div id="Not_found_order">Not found any order</div>
                        <?php
                    }
                ?>
            </div>

            <!-- ==== Stop order id wise search layout ====  -->

        </div>

        <!-- ==== Stop Particular order sell information layout ====  -->

        <!-- ==== Start search by order id layout ====  -->

        <div class="Admin_login_div" id="Order_id_division">

            <div class="Admin_login" id="Order_id_layout">

                <div class="Admin_login_title">Order id</div>
                <input type="text" name="" id="Order_id" class="Admin_input"
                placeholder="Enter your order id">

                <div class="Admin_login_button"
                    onclick="Search_order_data_fetch()" >
                    Search this order
                </div>
            
            </div>

        </div>

        <!-- ==== Stop search by order id layout ====  -->

        <!-- ==== Start search by date layout ====  -->

        <div class="Admin_login_div" id="Order_date_division">

            <div class="Admin_login" id="Order_date_layout">

                <div class="Admin_login_title">Search by date</div>

                <input type="date" name="" id="Order_date" class="Admin_input"
                placeholder="Enter your order date" formate="dd-mm-yyyy">
                
                <div class="Admin_login_button"
                    onclick="Order_date_search_function()
                    " >Search this order</div>
            
            </div>

        </div>

        <!-- ==== Stop search by date layout ====  -->

        <!-- ==== Start Refund payment information division  -->

        <div id="Refund_payment_layout">

            <?php
                global $Refund_payment_index; 
                global $Refund_payment_username ; 
                global $Refund_payment_order_date ; 
                global $Refund_payment_order_id ; 
                global $Refund_payment_mobile_number ; 
                global $Refund_payment_subtotal ; 
                global $Refund_payment_status ; 
                global $Refund_payment_user_id ; 

                if (isset($_SESSION['Refund_payment_data'])){

                    for($i = 0 ; $i<count($_SESSION['Refund_payment_data']); $i++){
                        
                        $Refund_payment_index = $i ; 
                        $Refund_payment_id = $_SESSION['Refund_payment_data'][$i]['Payment_id'] ; 
                        $Refund_payment_status = $_SESSION['Refund_payment_data'][$i]['Refund_status'] ; 
                        $Refund_payment_subtotal = $_SESSION['Refund_payment_data'][$i]['Order_total'] ;
                        $Refund_payment_order_date = $_SESSION['Refund_payment_data'][$i]['Order_date'] ; 
                        $Refund_payment_order_id = $_SESSION['Refund_payment_data'][$i]['Order_id'] ; 
                        $Refund_payment_username = $_SESSION['Refund_payment_data'][$i]['Username'] ; 
                        $Refund_payment_mobile_number = $_SESSION['Refund_payment_data'][$i]['Mobilenumber'] ; 
                        $Refund_payment_user_id = $_SESSION['Refund_payment_data'][$i]['User_id'] ; 
                        
                        ?>
                            <div class="Refund_payment_data" style="cursor:pointer;">
                        
                                <div class="Order_data_username UsernameTitleLayout">
                                                    
                                    <!-- --- Refund payment order index ---  -->
                                    <div class="Order_data_index"><?php global $Refund_payment_index; echo $Refund_payment_index + 1; ?></div>
                
                                    <!-- --- Refund payment id information ---  -->
                                    <div class="Order_data_usernameTitle">Refund payment id = &nbsp;</div>
                                    <a class="Order_data_usernameData" style="text-decoration:none;"
                                        href="https://dashboard.razorpay.com/app/payments/<?php global $Refund_payment_id; echo $Refund_payment_id; ?>"><?php global $Refund_payment_id; echo $Refund_payment_id; ?>&nbsp;</a>
                                            
                                </div>
                                
                                <!-- --- Refund payment status and subtotal information --- -->
    
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                    <div class="Order_data_usernameTitle Data1Title" style="color: red;">Order value : &nbsp;</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Refund_payment_subtotal; echo $Refund_payment_subtotal; ?>/-  &nbsp;</div>
                
                                    </div>

                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Refund status &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_status; echo $Refund_payment_status; ?></div>
                
                                    </div>
                
                                
                                </div>
                
                                <!-- --- Order id and Order date information --- -->
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title">Order id &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_order_id; echo $Refund_payment_order_id; ?></div>
                
                                    </div>
                
                                    <div class="Order_data1">
                
                                    <div class="Order_data_usernameTitle Data1Title BorderLayout">Order date : &nbsp;</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Refund_payment_order_date; echo $Refund_payment_order_date; ?>  &nbsp;</div>
                
                                    </div>
                                
                                </div>
                
                                <!-- ---- Username and Mobilenumber information ---- -->
    
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title">Username &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_username; echo $Refund_payment_username; ?></div>
                
                                    </div>
    
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Mobile number &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_mobile_number; echo $Refund_payment_mobile_number; ?></div>
                
                                    </div>
                
                                
                                </div>
                
                                <div class="Make_refund_button"
                                    onclick = "Update_refund_status('<?php global $Refund_payment_order_id; echo $Refund_payment_order_id; ?>',
                                    '<?php global $Refund_payment_user_id; echo $Refund_payment_user_id; ?>',
                                    '<?php global $Refund_payment_mobile_number; echo $Refund_payment_mobile_number; ?>')">
                                    Make refund
                                </div>
                            </div>
                        <?php
                    }
                }

            ?>

            <?php
               
               if (count($_SESSION['Refund_payment_data']) == 0){
                    ?>
                        <div id="Not_found_order">Not found any refund data</div>

                    <?php
               }
            ?>
        
        </div>

        <!-- ==== Stop Refund payment information division --  -->

        <!-- === Start Refunded payment information division ===  -->

        <div id="Refunded_payment_layout">

            <?php
                global $Refund_payment_index; 
                global $Refund_payment_username ; 
                global $Refund_payment_order_date ; 
                global $Refund_payment_order_id ; 
                global $Refund_payment_mobile_number ; 
                global $Refund_payment_subtotal ; 
                global $Refund_payment_status ; 
                global $Refund_payment_user_id ; 

                if (isset($_SESSION['Refund_payment_data'])){

                    for($i = 0 ; $i<count($_SESSION['Refund_payment_data']); $i++){
                        
                        $Refund_payment_index = $i ; 
                        $Refund_payment_id = $_SESSION['Refund_payment_data'][$i]['Payment_id'] ; 
                        $Refund_payment_status = $_SESSION['Refund_payment_data'][$i]['Refund_status'] ; 
                        $Refund_payment_subtotal = $_SESSION['Refund_payment_data'][$i]['Order_total'] ;
                        $Refund_payment_order_date = $_SESSION['Refund_payment_data'][$i]['Order_date'] ; 
                        $Refund_payment_order_id = $_SESSION['Refund_payment_data'][$i]['Order_id'] ; 
                        $Refund_payment_username = $_SESSION['Refund_payment_data'][$i]['Username'] ; 
                        $Refund_payment_mobile_number = $_SESSION['Refund_payment_data'][$i]['Mobilenumber'] ; 
                        $Refund_payment_user_id = $_SESSION['Refund_payment_data'][$i]['User_id'] ; 
                        
                        ?>
                            <div class="Refund_payment_data" style="cursor:pointer;">
                        
                                <div class="Order_data_username UsernameTitleLayout">
                                                    
                                    <!-- --- Refund payment order index ---  -->
                                    <div class="Order_data_index"><?php global $Refund_payment_index; echo $Refund_payment_index + 1; ?></div>
                
                                    <!-- --- Refund payment id information ---  -->
                                    <div class="Order_data_usernameTitle">Refund payment id = &nbsp;</div>
                                    <a class="Order_data_usernameData" style="text-decoration:none;"
                                        href="https://dashboard.razorpay.com/app/payments/<?php global $Refund_payment_id; echo $Refund_payment_id; ?>"><?php global $Refund_payment_id; echo $Refund_payment_id; ?>&nbsp;</a>
                                            
                                </div>
                                
                                <!-- --- Refund payment status and subtotal information --- -->
    
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                    <div class="Order_data_usernameTitle Data1Title" style="color: red;">Order value : &nbsp;</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Refund_payment_subtotal; echo $Refund_payment_subtotal; ?>/-  &nbsp;</div>
                
                                    </div>

                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Refund status &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_status; echo $Refund_payment_status; ?></div>
                
                                    </div>
                
                                
                                </div>
                
                                <!-- --- Order id and Order date information --- -->
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title">Order id &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_order_id; echo $Refund_payment_order_id; ?></div>
                
                                    </div>
                
                                    <div class="Order_data1">
                
                                    <div class="Order_data_usernameTitle Data1Title BorderLayout">Order date : &nbsp;</div>
                                        <div class="Order_data_usernameData Data2Title"><?php global $Refund_payment_order_date; echo $Refund_payment_order_date; ?>  &nbsp;</div>
                
                                    </div>
                                
                                </div>
                
                                <!-- ---- Username and Mobilenumber information ---- -->
    
                                <div class="Order_data_username Datadiv">
                                
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title">Username &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_username; echo $Refund_payment_username; ?></div>
                
                                    </div>
    
                                    <div class="Order_data1">
                
                                        <div class="Order_data_usernameTitle Data1Title BorderLayout">Mobile number &nbsp;:</div>
                                        <div class="Order_data_usernameData Data2Title"> &nbsp;<?php global $Refund_payment_mobile_number; echo $Refund_payment_mobile_number; ?></div>
                
                                    </div>
                
                                
                                </div>
                
                                <div class="Make_refund_button"
                                    onclick = "Update_refunded_status('<?php global $Refund_payment_order_id; echo $Refund_payment_order_id; ?>',
                                    '<?php global $Refund_payment_user_id; echo $Refund_payment_user_id; ?>',
                                    '<?php global $Refund_payment_mobile_number; echo $Refund_payment_mobile_number; ?>')">
                                    Unrefund payment 
                                </div>
                            </div>
                        <?php
                    }
                }

            ?>

            <?php
               
               if (count($_SESSION['Refund_payment_data']) == 0){
                    ?>
                        <div id="Not_found_order">Not found any refund data</div>

                    <?php
               }
            ?>
        </div>

        <!-- === Stop Refunded payment information division ===  -->
        
        <!-- Start processing information layout  -->

        <div id="Process_layout">
            <div class="spinner-border" id="SpinnerLayout"  role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- -- Stop processing information layout --  -->
        
        <!-- --- Start admin login division ---  -->

        <?php
           if (!isset($_COOKIE["admin"])){
                ?>

                    <div class="Admin_login_div" id="Admin_login_division"  >

                        <div class="Admin_login">

                            <div class="Admin_login_title">Admin login</div>
                            <input type="text" name="" id="Admin_password" class="Admin_input"
                            placeholder="Enter admin password">
                            <div class="Admin_login_button" onclick="AdminLogin()">Login</div>
                        
                        </div>

                    </div>
                <?php
           }
        ?>


        <!-- --- Stop admin login division ---  -->

    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="./Admin.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>
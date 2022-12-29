<?php

// Start session // 

session_start() ; 

// Bill number value 
$Bill_number = $_GET['bill_number'] ; 
$Bill_data = $_SESSION["Order_information"][$Bill_number] ; 

$Order_information = $Bill_data[0] ; 

// Order id 
$Order_id = $Order_information['Order_id'] ; 

// Order date information 
$Order_date = $Order_information['Order_place_date'] ; 

// Order username
$Order_username = $Order_information['Order_username'] ; 

// Order user mobile number
$Order_user_mobile_number = $Order_information['Mobile_number'] ; 

// Street address information 
$Order_street_address = $Order_information['Street_address'];

// Order area information 
$Order_area = $Order_information['Area'] ; 

// Order landmark information 
$Order_landmark = $Order_information['Landmark'] ; 

// Order Pincode information 
$Order_pincode = $Order_information['Pincode'] ; 

// Order Payment method 
$Order_payment_method = $Order_information['Payment_method'] ; 

$Order_product_data = $Bill_data[1];
$Order_product_information ; 
$Order_product_weight ;
$Order_product_discount_price ;  
$Order_product_price ; 
$Order_product_index ; 

// Order subtotal information 
$Order_subtotal = $Order_information['Order_total'] ; 

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="shortcut icon" href="./ShaktiGold.png" type="image/x-icon">
    <title>Bill Print</title>
</head>

<body>
    <div class="container" id="Download_bill_sample">

        <div class="row">

            <!-- BEGIN INVOICE -->

            <div class="col-xs-12">

                <div class="grid invoice">

                    <div class="grid-body">
                       
                        <!-- Store name information  -->

                        <div class="invoice-title">

                            <div class="row">

                                <!-- Company logo division  -->

                                <div class="col-xs-12" style="margin-top:13px;">
                                    <h2>Shakti Gold Jewellers</h2>
                                </div>

                            </div>

                            <br>
    
                            <!-- Order id information  -->
                            
                            <div class="row">

                                <div class="col-xs-12">

                                    <h3>Your invoice<br>
                                        <span class="small">Order id #<?php global $Order_id; echo $Order_id; ?></span><br>
                                    </h3>

                                </div>
                        
                            </div>
                        
                        </div>

                        <hr>

                        <div class="row">
                    
                            <!-- Shop address information   -->
                            <div class="col-xs-6">
                                
                                <address>
                                    <strong>Shop address:</strong><br>
                                    A-201, Shayam antillia, mota varachha  <br>
                                    <abbr>Contact number :</abbr> 6353757251
                                </address>
                            
                            </div>
                             
                            <!-- Username and Mobilenumber information  -->

                            <div class="col-xs-6">
                            
                                <address>
                                    <strong>Billed To:</strong><br>
                                    <?php global $Order_username; echo $Order_username; ?> <br>
                                    <abbr>Mobile number :</abbr> <?php global $Order_user_mobile_number; echo $Order_user_mobile_number; ?>
                                </address>
                            
                            </div>
                            
                            <!-- Address information  -->

                            <div class="col-xs-6 text-right">
                            
                                <address>
                                     
                                    <!-- Street address, Landmark and Pincode information  -->
                                    <strong>Shipping Address:</strong><br>
                                    <?php global $Order_street_address; echo $Order_street_address; ?> <br>
                                    <?php global $Order_area; echo $Order_area; ?>, <?php global $Order_landmark; echo $Order_landmark; ?><br>
                                    Pincode : <?php global $Order_pincode; echo $Order_pincode; ?><br>
                                
                                </address>
                            
                            </div>

                        </div>
                        
                        <div class="row">
                            
                            <!-- Payment method information  -->

                            <div class="col-xs-6">
                                <address>
                                    <strong>Payment Method:</strong><br>
                                    <?php global $Order_payment_method; echo $Order_payment_method; ?><br>
                                </address>
                            </div>

                            <!-- Order date information  -->
                            
                            <div class="col-xs-6 text-right">
                                <address>
                                    <strong>Order Date:</strong><br>
                                    <?php global $Order_date; echo $Order_date; ?>
                                </address>
                            </div>

                        </div>
                        
                        <div class="row">

                            <div class="col-md-12">
                                <h3>ORDER SUMMARY</h3>

                                <table class="table table-striped">

                                    <!-- Order project title column  -->

                                    <thead>
                                        <tr class="line">
                                            <td><strong>#</strong></td>
                                            <td class="text-center"><strong>Product</strong></td>
                                            <td class="text-center"><strong>Weight</strong></td>
                                            <td class="text-center"><strong>Discount price</strong></td>
                                            <td class="text-center"><strong>Price</strong></td>
                                            <td class="text-left"><strong></strong></td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        
                                        <?php
                                            global $Order_product_data; 
                                            global $Order_product_information; 
                                            global $Order_product_weight; 
                                            global $Order_product_discount_price; 
                                            global $Order_product_price ; 
                                            global $Bill_number; 

                                            for($i = 0 ; $i<count($Order_product_data); $i++){

                                                $Order_product_information = $Order_product_data[$i]["Product_information"] ; 
                                                $Order_product_weight = $Order_product_data[$i]['Product_weight']; 
                                                $Order_product_discount_price = $Order_product_data[$i]['Product_retail_price'] ; 
                                                $Order_product_price = $Order_product_data[$i]['Product_discount_price'] ; 
                                                $Order_product_index = $i + 1; 
                                                ?>

                                                    <tr>
                                                        <td><?php global $Order_product_index; echo $Order_product_index;  ?></td>
                                                        <td><?php global $Order_product_information; echo $Order_product_information;  ?></td>
                                                        <td class="text-center"><?php global $Order_product_weight; echo $Order_product_weight;  ?>gm</td>
                                                        <td class="text-center"><?php global $Order_product_discount_price; echo $Order_product_discount_price; ?>/-</td>
                                                        <td class="text-center"><?php global $Order_product_price; echo $Order_product_price;  ?>/-</td>
                                                        <td class="text-left"></td>

                                                    </tr>
                                                <?php
                                            }
                                        ?>

                                        <!-- Bill Taxes information division  -->
                                        <tr>
                                            <td colspan="3"></td>
                                            <td class="text-right"><strong>Taxes</strong></td>
                                            <td class="text-right"><strong>N/A</strong></td>
                                        </tr>

                                        <!-- Bill amount total information division  -->

                                        <tr>
                                            <td colspan="3">
                                            </td>
                                            <td class="text-left"><strong>Total</strong></td>
                                            <td class="text-left"><strong><?php global $Order_subtotal; echo $Order_subtotal; ?>/-</strong></td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-12 text-right identity">
                                <p> <strong>Our Return Policy</strong> <br>
                                    No return after 3 days <br>
                                    Check product on delivery <br>
                                    Return payment in between 7 days on cancel order <br>
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <!-- END INVOICE -->
        </div>
    </div>
    <script>
       window.print() ; 
    </script>
</body>

</html>
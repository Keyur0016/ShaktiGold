<?php
$Payment_total = $_GET['total'] ; 
$Username = $_GET["username"] ; 
$Mobile_number = $_GET["Mobile_number"] ;
$Payment_total = $Payment_total."00" ; 
$results ; 

// User id and Order id 
$User_id = $_GET['User_id'] ; 
$Order_id = $_GET['Order_id'] ; 

// Create Payment failed and Payment success url 
$Payment_failed_url = "./Payment_response.php?Status=Payment_fail&Order_id=".$Order_id."&User_id=".$User_id."&Mobile_number=".$Mobile_number ; 
$Payment_accept_url = "./Payment_response.php?Status=Payment_success&Order_id=".$Order_id."&User_id=".$User_id."&Mobile_number=".$Mobile_number."&Payment_id=" ; 

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
        var options = {
            "amount": "<?php global $Payment_total; echo $Payment_total;  ?>", 
            "key": "rzp_test_bWhDOltOtKqQdU", 
            "currency": "INR",
            "name": "Shree Shakti Gold Jewellers",
            "description": "Shree Shakti Gold order payment",
            "image": "https://res.cloudinary.com/smartinfo/image/upload/v1670427386/ShaktiGold_rey8lk.png",
            "prefill": {
                "name": "<?php global $Username; echo $Username; ?>",
                "email": "vaghasiyakeyur162002@gmail.com",
                "contact": "<?php global $Mobile_number; echo $Mobile_number; ?>"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#7689b3"
            }, 
            "handler": function (response) { 
                let payment_accept_url = '<?php global $Payment_accept_url; echo $Payment_accept_url;  ?>' + response.razorpay_payment_id; 
                window.location.href = payment_accept_url ; 
            },
            "modal": {
            "ondismiss": function () {
                    window.location.href = '<?php global $Payment_failed_url; echo $Payment_failed_url;  ?>';
                }
            }
            
        };

        var rzp1 = new Razorpay(options);


        rzp1.on('payment.failed', function (response){
            window.location.href = '<?php global $Payment_failed_url; echo $Payment_failed_url;  ?>'
        });

        rzp1.open();
        e.preventDefault();

</script>
</body>
</html>
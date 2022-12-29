// --- Function which close all layout --- // 

function Close_all_layout(){
    $(document).ready(function(){

        $("#Dashboard").hide() ;
        $("#Order_layout").hide() ; 
        $("#UserInformation_layout").hide(); 
        $("#Order_sell_information").hide() ; 
        $("#Refund_payment_layout").hide() ; 
        $("#Refunded_payment_layout").hide() ; 
    
    }); 
}

// --- Set background color to option division function --- // 

function Set_order_option_backgroundColor(x){
    for (let i = 0; i<7; i++){
        document.getElementsByClassName("Admin_option_layout")[i].style.backgroundColor = "rgb(240,239,239)" ; 
    }

    try{

        document.getElementsByClassName('Admin_option_layout')[x].style.backgroundColor = "#fff9c3" ; 
    }catch{

    }
}


// --- Load Dashboard function --- // 

function Load_dashboard(){
    Close_all_layout() ; 
   
   Set_order_option_backgroundColor(10); 
   
    $(document).ready(function(){

        $("#Dashboard").show() ; 
    
    })
}

Load_dashboard() ; 

// --- Set Pending order data function --- // 

function Pending_order_data_fetch(){
    
    Set_order_option_backgroundColor(0) ; 

    Close_all_layout() ; 

    $(document).ready(function(){
      
        $("#Process_layout").css("display", "flex") ; 

        $.post("./AdminBackend.php", {'Option':"Pending_order"}, function(data){
            if (data == "FetchData"){
                
                $("#Order_layout").show(); 
                $("#Process_layout").hide() ; 
                $("#Order_layout").load(location.href+" #Order_layout>*","");
            } 
        }) ; 
    }); 
}

// --- Print bill option function --- //
 
function Print_bill_information(order_division_value){

    let Bill_url = "./Bill.php?bill_number=" + order_division_value ; 
    window.open(Bill_url, "_blank") ; 

}

// --- Server cancel order set function --- // 

function Server_cancel_order_data_fetch(x){
    Set_order_option_backgroundColor(1) ; 

    Close_all_layout() ; 

    $(document).ready(function(){
      
        $("#Process_layout").css("display", "flex") ; 

        $.post("./AdminBackend.php", {'Option':"Server_cancel_order_fetch"}, function(data){
            if (data == "FetchData"){
                
                $("#Order_layout").show(); 
                $("#Process_layout").hide() ; 
                $("#Order_layout").load(location.href+" #Order_layout>*","");
            } 
        }) ; 
    }); 
}

// --- User cancel order set function --- // 

function User_cancel_order_function(){

    Set_order_option_backgroundColor(2) ; 
    Close_all_layout() ; 

    $(document).ready(function(){

        $("#Process_layout").css("display", "flex"); 

        $.post("./AdminBackend.php", {'Option':'User-cancel-order'}, function(data){
            if (data == "FetchData"){

                $("#Order_layout").show(); 
                $("#Process_layout").hide() ; 
                $("#Order_layout").load(location.href+" #Order_layout>*","");
            }
        }); 
    }); 
}

// --- Cancel order input reason fill layout set function --- //

let User_id ; 
let Mobile_number ; 
let Order_id ; 

function Cancel_order_reason_layout_set(temp_user_id, temp_number, temp_order_id){
 
    User_id = temp_user_id ; 
    Mobile_number = temp_number ; 
    Order_id = temp_order_id ; 

    document.getElementsByClassName("Admin_login_div")[0].style.display = "flex" ; 
 
}

// --- Cancel order function --- // 

function Cancel_order_function(){
    
    $(document).ready(function(){

        let Cancel_order_reason = document.getElementById("Cancel_reason").value ; 

        if (Cancel_order_reason == ""){
            alert("Enter order cancel reason") ; 
        }
        else{
            
            let data = new Date() ;
            let day = data.getDate() ; 
            let Month = data.getMonth() + 1; 
            let Year = data.getFullYear() ; 

            let Cancel_date = day + "-" + Month + "-" + Year ; 

            $.post("./AdminBackend.php", {'Option': "Server-cancel-order", "Userid":User_id, "Mobile_number":Mobile_number, "Order_id":Order_id, "Cancel_date":Cancel_date, "Cancel_reason":Cancel_order_reason}, function(data){
                if (data == "Cancel"){
                    Pending_order_data_fetch(0) ; 
                    document.getElementsByClassName("Admin_login_div")[0].style.display = "none"; 

                }
                else{
                    alert("Network request failed"); 
                }
            }) ; 

        }
    }); 
}

// --- Load user data function --- //

function Load_user_data(){
    Set_order_option_backgroundColor(3) ; 

    Close_all_layout() ; 

    $(document).ready(function(){

        $("#Process_layout").css("display", "flex") ; 

        $.post("./AdminBackend.php", {'Option':'Load_user'}, function(data){
        
            if (data == "Fetch"){
                $("#Process_layout").hide() ; 
                $("#UserInformation_layout").show() ; 
                $("#UserInformation_layout").load(location.href+" #UserInformation_layout>*","");
            }
        })         
    }); 
}

// --- User search by mobilenumber and username function --- //

function User_search_function(){
    let username = document.getElementById("SearchInput").value ; 

    if (username == ""){
        alert("Enter username"); 
    }
    else{
        $.post("./AdminBackend.php", {'Option':'Search_user', 'Username':username}, function(data){
            if (data == "NotFound"){
                alert("Not found any user information") ; 
            }
            else if (data == "Fetch"){
                $("#UserInformation_layout").load(location.href+" #UserInformation_layout>*","");
            }
        })
    }
}

// --- Function order sell option layout background color --- // 

function Set_sell_option_background_color(x){
    for(let i = 0 ; i<4; i++){
        document.getElementsByClassName("Order_sell_layout")[i].style.backgroundColor = "#6575a2" ; 
    }

    document.getElementsByClassName("Order_sell_layout")[x].style.backgroundColor = "#a0bded" ; 
}

// --- Set order sell information layout function --- // 

function Set_order_sell_information_layout(){
 
    Set_order_option_backgroundColor(4) ; 

    Close_all_layout() ; 

    $(document).ready(function(){
        $("#Order_sell_information").show() ; 

    }); 
}


// --- Load today order data function --- // 


function Load_today_order_data(){

    Set_sell_option_background_color(0) ; 

    $(document).ready(function(){
        
        // Today date 
        const data  = new Date() ; 
        const day = data.getDate() ; 
        const Month = data.getMonth() + 1; 
        const Year = data.getFullYear() ; 

        const Today_date = day + "-" + Month + "-" +  Year ; 
        
        $("#Sell_list_division").hide() ; 
        $("#Sell_order_layout").hide() ;
        $("#Sell_order_list_processing").css("display", "flex") ;  

        $.post('./AdminBackend.php', {'Option':"Today_order", 'Date':Today_date}, function(data){
            
            $("#Sell_order_list_processing").hide() ;

            if (data == "FetchData"){
                
                $("#Sell_list_division").show() ;
                $("#Sell_list_division").load(location.href+" #Sell_list_division>*","");
                $("#Sell_price_information").load(location.href+" #Sell_price_information>*","");

            }else{
            
                alert("Network request failed") ; 
            
            }
        }); 
    }); 
}

Load_today_order_data() ;

// --- Load yesterday order data function --- //

function Yesterday_order_data(){

    Set_sell_option_background_color(1) ; 

    $(document).ready(function(){

        // Today date 
        const data  = new Date() ; 
        const day = data.getDate() - 1 ; 
        const Month = data.getMonth() + 1; 
        const Year = data.getFullYear() ; 

        const Yesterday_date = day + "-" + Month + "-" +  Year ; 
        
        $(document).ready(function(){

            $("#Sell_list_division").hide() ; 
            $("#Sell_order_layout").hide() ;
            $("#Sell_order_list_processing").css("display", "flex") ;  

            $.post("./AdminBackend.php", {'Option':"Today_order", "Date":Yesterday_date}, function(data){
                
                $("#Sell_order_list_processing").hide() ; 

                if (data == "FetchData"){

                    $("#Sell_list_division").show() ; 
                    $("#Sell_list_division").load(location.href+" #Sell_list_division>*","");
                    $("#Sell_price_information").load(location.href+" #Sell_price_information>*","");
                }
                else{
                    alert("Network request failed") ; 
                }
            })
        }); 

    }); 
}

// --- Load week order data function --- //

function Week_order_data(){

    Set_sell_option_background_color(2) ; 

    $(document).ready(function(){

        $("#Sell_list_division").hide() ; 
        $("#Sell_order_layout").hide() ;
        $("#Sell_order_list_processing").css("display", "flex") ;

        $.post("./AdminBackend.php", {'Option':'Week_order'}, function(data){

            $("#Sell_order_list_processing").hide() ; 

            if (data == "FetchData"){
                $("#Sell_list_division").show() ; 
                $("#Sell_list_division").load(location.href+" #Sell_list_division>*","");
                $("#Sell_price_information").load(location.href+" #Sell_price_information>*","");
                
            }
        })
    }); 
}

// --- Set search by order id layout function --- // 

function Search_by_order_id_function(){

    Set_sell_option_background_color(3) ; 

    document.getElementById("Order_id_division").style.display = "flex"; 

    document.getElementById("Order_close").s
}

// --- Set search by order id function backend --- // 

function Search_order_data_fetch(){

    let Order_id_value = document.getElementById("Order_id").value ; 

    if (Order_id_value == ""){
        alert("Entre order id"); 
    }
    else{
        $(document).ready(function(){

            $("#Sell_list_division").hide() ; 
            $("#Order_id_division").hide() ; 
            $("#Sell_price_information").hide() ;
            $("#Sell_order_list_processing").show() ;
            $("#Order_close").show();  

            $.post("./AdminBackend.php", {"Option":"Search_by_order_id", "Order_id":Order_id_value}, function(data){
                $("#Sell_order_list_processing").hide() ; 
                $("#Sell_order_layout").load(location.href+" #Sell_order_layout>*","");
                $("#Sell_order_layout").show() ; 
            }) ; 
        }); 
    }
}

// Close search order layout division

function Search_order_close(){
    $(document).ready(function(){
        $("#Sell_list_division").show();
        $("#Sell_order_layout").hide(); 
        $("#Order_close").hide();
    }); 
}

// Copy order id to clipboard function

function Copy_to_clipboard(order_id){
    var dummyContent = order_id ;

    $(document).ready(function(){

        var dummy = $('<input>').val(dummyContent).appendTo('body').select()
        document.execCommand('copy')
        alert("Copy order id"); 
    }); 
}

// --- Set search by order date layout function --- // 

function Order_date_set_layout_function(){
    Set_sell_option_background_color(4) ; 

    document.getElementById("Order_date_division").style.display = "flex" ; 
}

// --- Set search by order date backend function --- //

function Order_date_search_function(){
    let Order_date = document.getElementById("Order_date").value ; 
    
    const Date_data = new Date(Order_date);
    const Order_day = Date_data.getDate() ; 
    const Order_month = Date_data.getMonth() + 1; 
    const Order_year = Date_data.getFullYear() ; 

    const search_order_date = Order_day + "-" + Order_month + "-" + Order_year ; 

    $(document).ready(function(){
        $("#Order_date_division").hide(); 
        $("#Sell_list_division").hide() ; 
        $('#Sell_price_information').hide(); 

        $.post("./AdminBackend.php", {"Option":"Search_by_order_date", "Order_date":search_order_date}, function(data){
           
            $("#Sell_order_layout").load(location.href+" #Sell_order_layout>*","");
            $("#Sell_order_layout").show() ; 
        }); 
    }); 

}

// --- Check admin login password --- // 

function AdminLogin (){
    let AdminPassword = document.getElementById("Admin_password").value ; 

    if (AdminPassword == ""){
        alert("Enter Admin Password") ; 
    }
    else{
        
        $(document).ready(function(){

            $.post("./AdminBackend.php", {'Option':"Check_password", "Admin_password":AdminPassword}, function(data){
    
                if (data == "InvalidPassword"){
                    alert("Invalid Password") ; 
                }
                else if (data == "ValidPassword"){
                    $("#Admin_login_division").hide(); 
                    alert("Login Successfully") ; 
                }
            }) ;

        }); 
    }
}

// For detect outside division click 

$(document).mouseup(function (e) {
    if ($(e.target).closest("#Cancel_order_layout").length
                === 0) {
        $("#Cancel_order_division").hide();
    }
});

$(document).mouseup(function (e) {
    if ($(e.target).closest("#Order_id_layout").length
                === 0) {
        $("#Order_id_division").hide();
    }
});

$(document).mouseup(function (e) {
    if ($(e.target).closest("#Order_date_layout").length
                === 0) {
        $("#Order_date_division").hide();
    }
});



function Load_weight(){
    $(document).ready(function(){
        $.post("./AdminBackend.php", {'Option':'Total_weight'}, function(data){
            console.log(data);
            $("#Dashboard").load(location.href+" #Dashboard>*","");
        })
    }); 
    
}

Load_weight() ; 

// Set refund data layout function

function Fetch_refund_payment_data(){

    Close_all_layout() ; 

    Set_order_option_backgroundColor(5) ; 

    $(document).ready(function(){
        
        $("#Refund_payment_layout").show() ; 

        $.post("./AdminBackend.php", {"Option":"Fetch_refund_id"}, function(data){

            if (data == "Fetch"){
                $("#Refund_payment_layout").load(location.href+" #Refund_payment_layout>*","");
                $("#Refund_payment_layout").show();
            }
        }); 
    }); 
}

// Update Refund status function 

function Update_refund_status(order_id, user_id, number){
    
    var result = confirm("Are you sure you want to update refund status !"); 

    if (result == true) {
        $(document).ready(function(){

            $.post("./AdminBackend.php", {"Option":"Update_refund_id", "order_id":order_id, "user_id":user_id, "number":number}, function(data){
                console.log(data) ; 
                if (data == "Update"){
                    Fetch_refund_payment_data() ; 
                }
            }); 
        });
       
    } else {
        doc = "Cancel was pressed.";
    }
}

// Set unchecked refuned id status layout 

function Set_update_refund_id_layout(){
    
    Close_all_layout(); 

    Set_order_option_backgroundColor(6) ; 

    $(document).ready(function(){
        
        $("#Refunded_payment_layout").show() ; 

        $.post("./AdminBackend.php", {"Option":"Fetch_refunded_id"}, function(data){

            if (data == "Fetch"){
                $("#Refunded_payment_layout").load(location.href+" #Refunded_payment_layout>*","");
                $("#Refunded_payment_layout").show();
            }
        }); 
    }); 

}

// Update refund payment status 

function Update_refunded_status(order_id, user_id, number){
    var result = confirm("Are you sure you want to update refund status of this order !"); 

    if (result == true) {
        $(document).ready(function(){

            $.post("./AdminBackend.php", {"Option":"Unrefund_payment_id", "order_id":order_id, "user_id":user_id, "number":number}, function(data){
                
                if (data == "Update"){
                    Set_update_refund_id_layout()
                }
            }); 
        });
       
    } else {
       
    }
}

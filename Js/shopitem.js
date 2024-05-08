$(document).ready(function(){
    let num = (localStorage.getItem('cartItemid'));
    if(num.length == 1){
        $('#shopItems').show().text(num.length);
    }else{
        num = num.split('|');
        $('#shopItems').show().text(num.length);
    }
})
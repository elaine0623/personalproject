$(document).ready(function(){
    let num = (localStorage.getItem('cartItemid'));
    if(num && num.length > 0){
        if(num.length == 1){
            $('#shopItems').show().text(num.length);
        }else{
            num = num.split('|');
            $('#shopItems').show().text(num.length);
        }
    }else {
        $('#shopItems').text(''); // 如果購物車中沒有項目，顯示空字串
    }
})
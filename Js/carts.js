//設定全選及全部取消功能
function toggle(toggle_status) {
    var checkboxes = document.querySelectorAll('.item_check');//找到購物車內所有選取項目
    // console.log(toggle_status)
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != toggle_status){
            checkboxes[i].checked = toggle_status.checked;//將toggle的狀態指派給各個購物車子項
        }
    }
}

//取得本機資料庫加入購物車項目
const shoplist = (localStorage.getItem('cartItemid')).split('|');//將字串轉換成array
const selectData = shoplist.slice();//複製array給selectData陣列
console.log(selectData)

// const selectData = [1,2,3,4,5,6,7,8,9];
//存入後端資料
var travelData = [
    {
        id: 1,
        name: "龜山島｜揭開牛奶海、<br> 無人島神秘面紗",
        startData: "2024/04/02",
        pic : 'img/Yilan4.jpg',
        price: 6000,
    },
    {
        id: 2,
        name: "台北草山旅｜自然花海、<br> 山上探險、風光明媚",
        startData: "2024/04/01",
        pic: 'img/Yilan.jpg',
        price: 4500,
    },
    {
        id: 3,
        name: "台中高美濕地｜親近自然<br>生態與美麗夕陽",
        startData: "2024/04/03",
        pic: 'img/recom3.jpg',
        price: 6000,
    },
    {
        id: 4,
        name: "龜山島｜揭開牛奶海、 <br>無人島神秘面紗",
        startData: "2024/05/02",
        pic : 'img/Yilan4.jpg',
        price: 6000,
    },
    {
        id: 5,
        name: "國際之南墾丁｜沉浸在<br> 夢幻沙灘與奇幻海岸",
        startData: "2024/05/03",
        pic : 'img/Yilan2.jpg',
        price: 16000,
    },
    {
        id: 6,
        name: "台北草山旅｜自然花海、<br> 山上探險、風光明媚",
        startData: "2024/06/02",
        pic: 'img/Yilan.jpg',
        price: 5000,
    },
    {
        id: 7,
        name: "龜山島｜揭開牛奶海、<br> 無人島神秘面紗",
        startData: "2024/06/01",
        pic : 'img/Yilan4.jpg',
        price: 7000,
    },
    {
        id: 8,
        name: "台北草山旅｜自然花海、<br> 山上探險、風光明媚",
        startData: "2024/06/03",
        pic: 'img/Yilan.jpg',
        price: 5000,
    },
    {
        id: 9,
        name: "龜山島｜揭開牛奶海、<br> 無人島神秘面紗",
        startData: "2024/07/02",
        pic : 'img/Yilan4.jpg',
        price: 8000,
    },
];
let sum = 0;
for(let i = 0;i<selectData.length;i++){
    let item = travelData.find(item => item.id == selectData[i]); //找到商品ID的Object指派給item
    //console.log(item)
    $('#allData').append(`<div class="inner">
                    <div class="basic_info">
                        <div class="checkbox">
                            <input type="checkbox"class="item_check" checked>
                        </div>
                        <div class="items_pic">
                            <img src="${item.pic}" alt="">
                        </div>
                        <p>${item.name}</p>
                        </div>
                    <div class="items">
                        <div class="date">
                            <label for="selectdate">選擇日期</label>
                            <input type="text" id="datepicker_${item.id}" class="datepicker">
                        </div>
                        <div class="counts">
                            <label for="selectpeople">選擇人數</label>
                            <input type="number" step="1" id="selectpeople_${item.id}" min="1" max="15" value="1" onchange="selectNum(${item.id})">
                        </div>
                    </div>
                </div>
                </div>
                <div class="sum">
                        TWD $ <span class="total" id="total_${item.id}"></span>
                </div>`)
                //發生change事件呼叫selectNum函數
                $(`#total_${item.id}`).text(item.price);//一進入頁面就預設1個的價格
                sum += item.price;//迴圈加總
                if (i==selectData.length-1){//迴圈跑到最後一次時
                    $('#sumall').text(sum)//在畫面上顯示
                    $('#sumall_inner').text(sum)//同步存一個價格
                }
                //使用jQuery datepicker套件
                $( `#datepicker_${item.id}` ).datepicker({
                    dateFormat:"yy/mm/dd",
                    defaultDate: "+1w",
                    changeMonth: true,
                    onSelect: function() { 
                        var dateObject = $(this).datepicker('getDate'); 
                        //alert (dateObject); 用datepicer('getDate')抓到user選擇日期指派給dateObject
                        var formattedDate = $.datepicker.formatDate("yy/mm/dd", dateObject);//將dateObject的格式與startData的顯示一致
                        let itemlist = travelData.find(itemlist => itemlist.startData == formattedDate);
                        //console.log(itemlist);//尋找相同出發日的Object指派給{itemlist}
                        var num = $(`#selectpeople_${item.id}`).val()//取user選擇人數的值
                        old = $(`#total_${item.id}`).text();//取目前價格
                        newdata = itemlist.price * num;//新Object的值*人數
                        $(`#total_${item.id}`).text(newdata);//印出更新的小計         
                        between = newdata - old;//兩者價差加到總計
                        sumtotal = +($('#sumall').text());//取得目前總計的金額
                        $('#sumall').text(sumtotal + between)//印出更新後的總計
                        $('#sumall_inner').text(sumtotal +between)
                    },
                    beforeShowDay: function(date) {//使用套件提供function限制可選天數
                        switch (item.id) {
                        case 1:
                        case 4:
                        case 7:
                        case 9:
                            if (date >= new Date(2024, 3, 2) && date <= new Date(2024, 3, 2)) {
                                return [true, '', '可選'];
                            }
                                // 日期範圍指定出發日: 2024-05-02
                            if (date >= new Date(2024, 4, 2) && date <= new Date(2024, 4, 2)) {
                                return [true, '', '可選'];
                            }
                            if (date >= new Date(2024, 5, 1) && date <= new Date(2024, 5, 1)){ 
                                return [true, '', '可選'];
                            }
                            if (date >= new Date(2024, 6, 2) && date <= new Date(2024, 6, 2)){ 
                                return [true, '', '可選'];
                            }else{
                                return [false, '', '不可選'];
                            }
                            break;
                        case 2:
                        case 6:
                        case 8:
                            if (date >= new Date(2024, 3, 1) && date <= new Date(2024, 3, 1)) {
                                return [true, '', '可選'];
                            }
                                // 日期範圍指定出發日: 2024-05-02
                            if (date >= new Date(2024, 5, 2) && date <= new Date(2024, 5, 2)) {
                                return [true, '', '可選'];
                            }
                            if (date >= new Date(2024, 5, 3) && date <= new Date(2024, 5, 3)) {
                                return [true, '', '可選'];
                            }else{
                                return [false, '', '不可選'];
                            }
                            break;
                        case 3:
                            if (date >= new Date(2024, 3, 3) && date <= new Date(2024, 3, 3)) {
                                return [true, '', '可選'];
                            }else{
                                return [false, '', '不可選'];
                            }
                            break; 
                        case 5:
                            if (date >= new Date(2024, 4, 3) && date <= new Date(2024, 4, 3)) {
                                return [true, '', '可選'];
                            }else{
                                return [false, '', '不可選'];
                            }
                            break;
                        }
                    }
                });
                //預設畫面初始日期
                $( `#datepicker_${item.id}` ).datepicker( "setDate", `${item.startData}` );
};
//onchange="selectNum(${item.id})"
function selectNum(id){
    var num = $(`#selectpeople_${id}`).val()
    let price = travelData.find(itemlist => itemlist.startData == $(`#datepicker_${id}`).val()).price;
    //alert (price);//要找到當天日期對應到的價格
    //錯的price = +($(`#total_${id}`).text())
    $(`#total_${id}`).text(price * num);//小計等於數量*價格
    // $('#sumall').text()
    let sumall = +($('#sumall_inner').text())//取得原始價格
    sumall += price * (num-1) ;//總計會等於數量- 1(起始值)
    $('#sumall').text(sumall);
}

(function list() {

   (function() {
      var success = document.getElementsByClassName('status-3');

      var apply = document.getElementsByClassName('apply')[0];
      var applyForm = document.getElementsByClassName('apply-form')[0];
      var cancel = document.getElementsByClassName('cancel')[0];

      apply.addEventListener('click', function() {
         console.log("block");

         applyForm.style.display = 'block';
      })

      cancel.addEventListener('click', function() {
         console.log("none");

         applyForm.style.display = 'none';
      })
   })();

   var limit = 6;
   var current = 0;
   var data = [];

   var format = function(time, format){
      var t = new Date(time);
      var tf = function(i){return (i < 10 ? '0' : '') + i};
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
      switch(a){
            case 'yyyy':
               return tf(t.getFullYear());
               break;
            case 'MM':
               return tf(t.getMonth() + 1);
               break;
            case 'mm':
               return tf(t.getMinutes());
               break;
            case 'dd':
               return tf(t.getDate());
               break;
            case 'HH':
               return tf(t.getHours());
               break;
            case 'ss':
               return tf(t.getSeconds());
               break;
            }
      }) 
   }

   Ae.trans.AJAX({
      type: "GET",
      url: "/user/expenses/apply/list",
      async: true,
   }, callback)

   function callback(xmls) {
      jsonName = xmls.responseText;
      data = JSON.parse(jsonName);

      current = 0;
      limit = 6;
      getData(data, current, limit);
   }


   function getData(data, current, limit) {
      var expensesList = '';
      var arr,reg = new RegExp("(^| )"+"UserPermit"+"=([^;]*)(;|$)");
      arr=document.cookie.match(reg);


      for(var i = 0 ; i < limit;) {
         current++;
         if(arr[2] == 0 ) {

         } else if(arr[2] == 1010000 && "YX" == data[current].identifier.substring(0, 2)) {

         } else if(arr[2] == 1020000 && "ZZ" == data[current].identifier.substring(0, 2)) {

         } else if(arr[2] == 1030000 && "YF" == data[current].identifier.substring(0, 2)) {

         } else if(arr[2] == 1040000 && "YY" == data[current].identifier.substring(0, 2)) {

         } else if(arr[2] == 1050000 && "CG" == data[current].identifier.substring(0, 2)) {

         } else {
            continue;
         }
         
         i++
         expensesList += `<li class="items" onclick="turnToPage('detail')">
            <div class="items-header">
               费用申请编号：` + data[current].identifier +`
            </div>
            <div class="items-body">
               类型：` + data[current].ascription + `<br>
               金额：￥` + data[current].amount + `<br>
               项目：`+ data[current].matter + `<br>
               收款单位： ` + data[current].receiveCompany + `
            </div>
            <div class="items-footer">
               申请人：`+ data[current].ascriptor +  `  日期：` + format(data[current].expensesGmt,'yyyy-MM-dd') + `
               <button class="status-3 frt">已完成</button>
            </div>
         </li>`
      }
      var expensesBody = document.getElementsByClassName('expenses-body')[0];
      expensesBody.innerHTML = expensesList;
   }

   nextPage.addEventListener('click', function() {
      current += limit;
      
      getData(data, current, limit)
   })

   prePage.addEventListener('click', function() {
      
      if(current <= 0) {
         alert('到头了。请翻下一页');
         return;
      }
      current -= limit;
      getData(data, current, limit)
   })
   
   function put() {

         var identifier = input[0].value;
         var expensesGmt = input[1].value;
         var matter = input[2].value;
         var amount = input[3].value;
         var handler = input[4].value;
         var ascriptor = input[5].value;
         var expensesType = input[6].value;
         var departmentType = input[7].value;
         var receiveCompany = input[8].value;
         var ascription = input[9].value;
         var projectNum = input[10].value;
         var projectName = input[11].value;
         var classType = input[12].value;



         var context = `identifier=${identifier}&
                        expensesGmt=${expensesGmt}&
                        matter=${matter}&
                        amount=${amount}&
                        handler=${handler}&
                        ascriptor=${ascriptor}&
                        expensesType=${expensesType}&
                        departmentType=${departmentType}&
                        receiveCompany=${receiveCompany}&
                        ascription=${ascription}&
                        projectNum=${projectNum}&
                        projectName=${projectName}&
                        classType=${classType}`



         Ae.trans.AJAX({
            type: "POST",
            url: "/user/apply/add",
            async: true,
            context: context,
            contentType: "application/x-www-form-urlencoded"
         }, callback)
   
         function callback(xmls) {
            jsonName = xmls.responseText;
            jsonName = JSON.parse(jsonName);
         }
   }

})();
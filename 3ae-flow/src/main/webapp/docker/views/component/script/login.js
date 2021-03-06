LoginController = {

    closeAlert: function() {
        $('#closeAlert').click(function() {
            var alert = document.getElementsByClassName('alert')[0];
            console.log(alert)
            alert.style.display = 'none';
        })
    },
 
    
 
    login: function() {
        var msg = document.getElementById('message');
        var input = document.getElementsByTagName('input');
        that = this

        $('#submit').click(function() {
          
            if(!input[0].value || !input[1].value) {
                msg.innerHTML = "用户名密码不能为空"
                return;
            }
 
            var userName = input[0].value;
            var userPwd = input[1].value;
            var form = document.getElementById('form');
            var context = `userName=${userName}&userPwd=${userPwd}` 
    
            Ae.trans.AJAX({
                type: "POST",
                url: "/user/login",
                async: true,
                context: context,
                contentType: "application/x-www-form-urlencoded"
            }, callback)

            function callback(xmls) {
                jsonName = xmls.responseText;
                jsonName = JSON.parse(jsonName);
                console.log(jsonName);
                var datys = 30;
                if(jsonName.success) {
                    // 提升用户体验
                    window.location.href='/portal';

                    Global.cookie.setCookie("Token", jsonName.data.token, datys);
                    Global.cookie.setCookie("UserName", jsonName.data.userName, datys);
                    Global.cookie.setCookie("UserPermit", jsonName.data.userPermit, datys);
                    Global.cookie.setCookie("departmentType", jsonName.data.departmentType, datys);
                    
                    
                } else {
                    msg.innerHTML = jsonName.error;
                }
            }
        })
    },

    _init() {
        this.closeAlert();
        this.login();
    }
}

LoginController._init();
 
 // 入口函数
 $(function () {
    // 一：登陆
    // 1.1给按钮设置一个点击事件
    $('.input_sub').on('click', function (e) {
      // 1.2去掉默认提交行为
      e.preventDefault();
      // 1.3获取账号密码
      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();
      // 1.4非空判断
      if (username == "" || password == "") {
        // alert("账号或者密码不能为空！");
        // 模态框的使用第一步：调用
        $('#myModal').modal();
        $('.modal-body').text('账号或者密码不能为空！');
        return;
      };
      // 1.5发送ajax请求
      $.ajax({
        type: "post",
        // url: "http://localhost:8080/api/v1/admin/user/login",
        // 利用沙箱模式创建一个js文件存储所有接口的url
        url: BigNew.user_login,
        data: {
          username: username,
          password: password,
        },
        success: function (backData) {
          // console.log(backData);
          // alert(backData.msg);
          $('#myModal').modal();
          $('.modal-body').text(backData.msg);
          if (backData.code == 200) {

            // 把返回的token给保存起来
            localStorage.setItem('token', backData.token);

            // 模态框的使用第二部：利用模态框的方法
            $('#myModal').on('hidden.bs.modal', function (e) {
              location.href = './index.html';
            })
          }
        },
      });
    });
  });

       // 入口函数
       $(function () {
        // 1.进到首页就显示管理员的信息:
        // 1.1用原生js语法获取管理员信息：获取的是json数据
        // var xhr = new XMLHttpRequest();
        // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');
        // xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
        // xhr.onload = function () {
        //     // console.log(JSON.parse(xhr.response));
        //     var backData=JSON.parse(xhr.response);
        //     console.log(backData);
        //     if(backData.code==200){
        //         document.querySelector('.user_info>img').setAttribute('src',backData.userPic);
        //         document.querySelector('.user_info>span>i').setAttribute('text',backData.data.nickname)
        //         document.querySelector('.user_center_link>img').setAttribute('src',backData.userPic);
        //    };
        // };
        // xhr.send();

        // 1.2用jq语法获取管理员的信息：获取的是js对象
        $.ajax({
            type: "get",
            // url: "http://localhost:8080/api/v1/admin/user/info",
            // 利用沙箱模式创建一个js文件存储所有接口的url
            url: BigNew.user_info,
            // 参数
            // headers: {
            //     Authorization: localStorage.getItem('token'),
            // },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    $('.user_info>img').attr('src', backData.data.userPic);
                    $('.user_info>span>i').text(backData.data.nickname);
                    $('.user_center_link>img').attr('src', backData.data.userPic);
                };
            },
        });

        // 为了不在每一个页面获取token就设置一个全局配置，这个全局配置放在jquery.js文件的最下面
        // $.ajaxSetup({
        //     beforeSend: function (xhr) {
        //         xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        //     },
        //     error: function (xhr, status, error) {
        //         console.log(error);
        //         if (error == 'Forbidden') {
        //             alert('未登录，请登录');
        //             location.href = './login.html';
        //         };

        //     },
        // });


        // 2.退出:给退出按钮设置一个点击事件，删除token
        $('.logout').on('click', function (e) {
            e.preventDefault();
            if (confirm('确定退出吗？')) {
                localStorage.removeItem('token');
                window.location.href = './login.html'
            };
        });


        // 3.左侧导航栏一级菜单（div）点击事件
        $('.level01').on('click',function(){
            // 3.1当前点击的有样式其余的没有
            $(this).addClass('active').siblings('div').removeClass('active');
            // 3.2判断当前点击的一级菜单是否是文章管理
            if($(this).index()==1){
                // 3.2.1把二级菜单显示就隐藏隐藏就显示
                $('ul.level02').slideToggle();
                // 3.2.2让字体图标旋转
                $(this).find('b').toggleClass('rotate0');


                // 点击一级菜单显示二级菜单第一个一级菜单方法一给第一个二级菜单设置点击事件:不跳转
                // $('ul.level02>li').first().trigger('onclick');

                // 点击一级菜单
                $('ul.level02>li:eq(0)>a')[0].click();
            };
        });

        // 4.左侧导航栏危机菜单Li标签设置点击事件
        $('ul.level02>li').on('click',function(){
            // 4.1档期那点击的标签设置active，其余的删除
            $(this).addClass('active').siblings('li').removeClass('active');
            // 4.2待解决的需求：点击一级菜单‘文章管理’有一个默认的二级菜单的内容显示在iframe
            // 4.2方法二：

        });

    });

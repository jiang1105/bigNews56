$(function () {
    // 1.个人信息编辑
    $.ajax({
        url: BigNew.user_detail,
        success: function (backData) {
            console.log(backData);
            if (backData.code == 200) {
                // $('.control-label').val(backData.data.username);
                // $('.nickname').val(backData.data.nickname);
                // $('.email').val(backData.data.email);
                // $('.password').val(backData.data.password);
                // 1.1因为backData返回的是一个对象所以可以直接遍历对象
                for (var key in backData.data) {
                    $('.' + key).val(backData.data[key]);
                };
                $('.user_pic').attr('src', backData.data.userPic);
            };
        },

    });
    // 2.给修改按钮设置点击事件，发送ajax请求
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        // 2.1用formdata要用dom元素
        var fd = new FormData(document.querySelector('form'));
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    // 第一种刷新页面的方法
                    // parent.window.location.reload();
                    // 第二种方法
                    $.ajax({
                        type: "get",
                        url: BigNew.user_info,
                        success: function (backData) {
                            // console.log(backData);
                            if (backData.code == 200) {
                                parent.$('.user_info>img').attr('src', backData.data.userPic);
                                parent.$('.user_info>span>i').text(backData.data.nickname);
                                parent.$('.user_center_link>img').attr('src', backData.data.userPic);
                            };
                        },
                    });
                };
            },
        });
    });

    // 3.图片预览
    $('#exampleInputFile').on('change', function () {
        var file1 = this.files[0];
        var url1 = URL.createObjectURL(file1);
        $('.user_pic').attr('src', url1);
    });
});

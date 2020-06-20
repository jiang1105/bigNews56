$(function () {
    // 1.图片预览
    $('#inputCover').on('change', function () {
        var file1 = this.files[0];
        var url1 = URL.createObjectURL(file1);
        $('.article_cover').attr('src', url1);
    });

    // 2.显示文章类别
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var res = template('categoryList', backData);
                $('.form-control').html(res);
            };
        },
    });


    // 3.日期插件
    jeDate('#testico', {
        // theme: { bgcolor: "#00A1CB", color: "#ffffff", pnColor: "#00CCFF" },
        zIndex: 2222222222222222,
        // isinitVal: true,  //显示默认时间
        format: "YYYY-MM-DD",   //显示时分秒的格式
        isTime: false,
        minDate: "2014-09-19 00:00:00",
    });

    // 4.富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    // 5.获取文章的id
    var id = window.location.search.split("=")[1];
    // 5.1发送ajax请求,为了不让上面的类别在异步刷新的时候出现爱生活
    setTimeout(function () {
        $.ajax({
            url: BigNew.article_search,
            data: {
                id: id,
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    // 5.2给对应的标签赋值
                    $('#articalId').val(backData.data.id);
                    $('#inputTitle').val(backData.data.title);
                    $('.article_cover').attr('src', backData.data.cover);
                    $('.form-control').val(backData.data.categoryId);//文章类别
                    $('#testico').val(backData.data.date);
                    // 给富文本设置内容
                    editor.txt.html(backData.data.content);
                };
            },
        });
    }, 10);


    // 6.编辑文章:已发布
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        // 5.1创建formdata,检查name的属性值和接口名保持一致，和获取文章的所有信息
        var fd = new FormData(document.querySelector('form'));
        // 5.2注意点：在formdata里面追加获取的富文本编辑器的内容和状态
        var content = editor.txt.html();
        fd.append('content', content);
        fd.append('state', '已发布');
        // 5.3发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功！');
                    parent.$('ul.level02>li:eq(0)').click();
                    location.href = './article_list.html';
                };
            },
        });
    });


    // 7.编辑文章：草稿
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        // 5.1创建formdata,检查name的属性值和接口名保持一致，和获取文章的所有信息
        var fd = new FormData(document.querySelector('form'));
        // 5.2注意点：在formdata里面追加获取的富文本编辑器的内容和状态
        var content = editor.txt.html();
        fd.append('content', content);
        fd.append('state', '草稿');
        // 5.3发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改草稿成功！');
                    parent.$('ul.level02>li:eq(0)').click();
                    location.href = './article_list.html';
                };
            },
        });
    });
});

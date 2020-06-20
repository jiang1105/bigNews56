$(function () {
    // 1.已进入页面就发送ajax请求获取所有的文章类别，并且通过模板引擎
    function getData() {
        $.ajax({
            url: BigNew.category_list,
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var res = template('category_list', backData);
                    $('tbody').html(res);
                };
            },
        });
    };
    getData();

    // 2.使用模态框show.bs.modal方法模态框显示的时候立即调用,判断是新增弹出来的模态框还是编辑弹出来的模态框
    // show 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
    $('#myModal').on('show.bs.modal', function (e) {
        // e.relatedTarget打印出来的是DOM获取的元素
        console.log(e.relatedTarget);
        if ($('#xinzengfenlei')[0] == e.relatedTarget) {
            // alert('新增');
            $('#myModalLabel').text('新增分类');
            $('#addOrEdit').text('新增').addClass('btn-primary').removeClass('btn-success');
        } else {
            // alert('编辑');
            $('#myModalLabel').text('编辑分类');
            $('#addOrEdit').text('编辑').addClass('btn-success').removeClass('btn-primary');

            // 2.1获取当前点击的编辑按钮的分类的名字和别名
            var categroyId = $(e.relatedTarget).attr('data-id');
            var categorySlug = $(e.relatedTarget).parent().prev().text().trim();
            var categoryName = $(e.relatedTarget).parent().prev().prev().text().trim();
            // 2.2把值赋值给模态框对应的标签
            $('#categroyId').val(categroyId);
            $('#recipient-name').val(categorySlug);
            $('#message-text').val(categoryName);
        };
    });

    // 3.给模态框中的新增或者编辑按钮设置点击事件
    $('#addOrEdit').on('click', function () {
        // 3.1判断是新增还是编辑
        // if($(this).text=='新增'){
        //     alert('新增');
        // }else{
        //     alert('编辑');
        // };
        if ($(this).hasClass('btn-primary')) {
            // alert('新增');
            // 3.2获取用户输入的文章分类名和文章分类别名
            var categoryName = $('#recipient-name').val().trim();
            var categorySlug = $('#message-text').val().trim();
            $.ajax({
                type: "post",
                url: BigNew.category_add,
                data: {
                    name: categoryName,
                    slug: categorySlug,
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        // alert(backData.msg);
                        // 3.3新增成功加载数据重新渲染在页面
                        getData();
                        // 3.4把模态框隐藏，把模态框里面输入的文本情况
                        $('#myModal').modal('hide');
                        $('#recipient-name').val("");
                        $('#message-text').val("");
                    };
                },
            });
        } else {
            // alert('编辑');
            // 3.5获取要编辑的文章分类的id 修改后的内容
            var categroyId = $('#categroyId').val().trim();
            var categoryName = $('#recipient-name').val().trim();
            var categorySlug = $('#message-text').val().trim();


            // formData需要后端的支持，而且formData还是js的方法
            // serialize不需要后端的支持,
            var data= $('#myModal form').serialize();
            
            
            $.ajax({
                type: "post",
                url: BigNew.category_edit,
                // data: {
                //     id: categroyId,
                //     name: categoryName,
                //     slug: categorySlug,
                // },
                data:data,
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 200) {
                        alert(backData.msg);
                        getData();
                        $('#myModal').modal('hide');
                        $('#recipient-name').val("");
                        $('#message-text').val("");
                    };
                },
            });
        };
    });

    
    // 4.给模态框中的取消按钮设置一个点击事件：清空模态框中的内容
    $('#btnCancel').on('click', function () {
        // 方法一
        // $('#recipient-name').val("");
        // $('#message-text').val("");
        // 方法二:reset()是DOM元素点出来的
        $('#myModal form')[0].reset();
    });

    // 5.删除按钮事件
    $('tbody').on('click', '.btn-delete', function () {
        var categoryId = $(this).attr('data-id');
        // 5.2发送ajax请求
      if(confirm('你确定删除吗？')){
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: categoryId,
            },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 204) {
                    alert(backData.msg);
                    getData();
                };
            },
        });
      };
    });
});

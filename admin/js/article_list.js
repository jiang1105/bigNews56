$(function () {
    // 1.一进入文章列表页就显示文章分类，发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var res = template('categoryList', backData);
                $('#selCategory').html(res);
            };
        },
    });


    // 封装
    function getData(myPage, callback) {
        $.ajax({
            type: "get",
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
                page: myPage,
                perpage: 3,
            },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var res = template('articalList', backData);
                    $('tbody').html(res);

                    if (backData.data.data.length != 0 && callback != null) {
                        $('#pagination').show().next('p').hide();
                        callback(backData);
                    } else if (backData.data.data.length == 0 && currentPage == 1) {
                        $('#pagination').hide().next('p').show();
                    } else if (backData.data.totalPage == currentPage - 1 && backData.data.data.length == 0) {
                        currentPage--;
                        $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                    };
                };
            },
        });
    };


    var currentPage = 1;
    // 2.一进入页面就发送ajax请求，获取默认的分类和默认状态下的所有文章
    getData(1, function (backData) {
        $('#pagination').twbsPagination({
            totalPages: backData.data.totalPage,
            visiblePages: 10,
            first: '首页',
            last: '尾页',
            prev: "上一页",
            next: "下一页",
            onPageClick: function (event, page) {
                currentPage = page;
                getData(page, null);
            },
        })
    });
    // $.ajax({
    //     type: "get",
    //     url: BigNew.article_query,
    //     data: {
    //         type: $('#selCategory').val().trim(),
    //         state: $('#selStatus').val().trim(),
    //         page: 1,
    //         perpage: 6,
    //     },
    //     success: function (backData) {
    //         console.log(backData);
    //         if (backData.code == 200) {
    //             var res = template('articalList', backData);
    //             $('tbody').html(res);
    //             // 2.1插件的使用
    //     };
    //     },
    // });


    // 3.给筛选按钮设置一个点击事件
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        // 3.1发送ajax获取数据
        // $.ajax({
        //     type: "get",
        //     url: BigNew.article_query,
        //     data: {
        //         type: $('#selCategory').val().trim(),
        //         state: $('#selStatus').val().trim(),
        //         page: 1,
        //         perpage: 6,
        //     },
        //     success: function (backData) {
        //         console.log(backData);
        //         if (backData.code == 200) {
        //             var res = template('articalList', backData);
        //             $('tbody').html(res);

        //             // 3.2筛选发生改变，总页码也会改变，页码需要重绘
        //             $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, 1);
        //         };
        //     },
        // });
        currentPage = 1;
        getData(currentPage, function (backData) {
            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
        })
    });


    // 4.利用文章id删除文章
    $('tbody').on('click', '.btn-danger', function () {
        if (confirm('确定删除吗？')) {
            var articleId = $(this).attr('data-id');
            $.ajax({
                type: "post",
                url: BigNew.article_delete,
                data: {
                    id: articleId,
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 204) {
                        alert(backData.msg);
                        getData(currentPage, function (backData) {
                            // 4.1删除文章也有可能发生页码的改变
                            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                        });
                    };
                },
            })
        };
    });

    // 5.点击发表文章按钮设置点击事件
    $('#release_btn').on('click',function(){
        parent.$('ul.level02>li:eq(1)').click();
    });

});

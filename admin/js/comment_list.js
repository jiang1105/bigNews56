$(function () {
    // 1.一进入评论页面就发送ajax请求，获取所有的评论，模板引擎渲染
    function getData(myPage, callback) {
      $.ajax({
        // type: 'post',
        url: BigNew.comment_list,
        data: {
          page: myPage,
          perpage: 5,
        },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            var res = template('commentList', backData);
            $('tbody').html(res);

            // 判断
            if (callback != null && backData.data.data.length != 0) {
              callback(backData);
            }else if(backData.data.data.length==0&&backData.data.totalPage==currentPage-1){
              currentPage--;
              $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
            };
          };
        },
      });
    }

    // 声明一个变量用来记录档期那页
    var currentPage;
    getData(1, function (backData) {
      // 分页结构
      $('#pagination').twbsPagination({
        totalPages: backData.data.totalPage,  //总页数
        visiblePages: 10,
        first: '首页',
        last: '尾页',
        prev: "上一页",
        next: "下一页",
        onPageClick: function (event, page) {
          currentPage = page;  //给当前页赋值
          getData(page, null);
        },
      })
    });

    // 2.评论审核通过
    $('tbody').on('click', 'a.btn-pizhun', function () {
      // 2.1获取当前评论ID
      var commentId = $(this).attr('data-id');
      $.ajax({
        type: 'post',
        url: BigNew.comment_pass,
        data: {
          id: commentId,
        },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            alert('评论通过！')
            getData(currentPage, null);

          };
        },
      });
    });


    // 3.评论审核拒绝
    $('tbody').on('click', 'a.btn-jujue', function () {
      var commentId = $(this).attr('data-id');
      $.ajax({
        type: 'post',
        url: BigNew.comment_reject,
        data: {
          id: commentId,
        },
        success: function (backData) {
          console.log(backData);
          if (backData.code == 200) {
            alert('拒绝！')
            getData(currentPage, null);
          };
        },
      });
    });

    // 4.评论审核删除
    $('tbody').on('click', 'a.btn-delete', function () {
      if (confirm('确定删除吗？')) {
        var commentId = $(this).attr('data-id');
        $.ajax({
          type: 'post',
          url: BigNew.comment_delete,
          data: {
            id: commentId,
          },
          success: function (backData) {
            console.log(backData);
            if (backData.code == 200) {
              alert('删除成功！')
              getData(currentPage, function () {
                // 重绘
                $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
              });
            };
          },
        });
      }
    });
  });

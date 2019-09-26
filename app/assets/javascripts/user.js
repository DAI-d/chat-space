$(function() {

var search_list = $("#user-search-result");
var member_list = $(".chat-group-users.js-add-user");

function appendUserToSearchList(user) {
    var html =
        `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</a>
        </div>`
    search_list.append(html);
}

function appendNoUserToSearchList(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    search_list.append(html);
}

function appendUserToMemberList(name, user_id) {
  var html = 
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
member_list.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
        $("#user-search-result").empty();
        return false
    }

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input} ,
      dataType: 'json'
    })

    .done(function(user) {
      $("#user-search-result").empty();
      if (user.length !== 0) { //users→user
        user.forEach(function(user){ //users→user
          appendUserToSearchList(user);
        });
      }
      else {
        appendNoUserToSearchList("一致するメンバーはいません");
      }
    })
    .fail(function() {
      alert('メンバー検索に失敗しました');
    })
  });

  $(function(){  //1.clickアクション定義。documentでリストにclickイベント発火できる。
    $(document).on('click', '.user-search-add', function() { //クラスuser-search-add（appendUserToSearchListの中）をクリックしたときにイベント発火
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendUserToMemberList(name, user_id);
    });
  });

  $(function(){  //1.clickアクション定義。documentでリストにclickイベント発火できる。
    $(document).on('click', '.user-search-remove', function() { //クラスuser-search-add（appendUserToSearchListの中）をクリックしたときにイベント発火
      $(this).parent().remove();
    });
  });

});
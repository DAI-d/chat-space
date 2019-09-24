$(function() {

var search_list = $("#user-search-result");

function appendProduct(user) {
    var html = `<p>
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                  </div>
                </p>`
    // return html;
    search_list.append(html);
}

function appendErrMsgToHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <div class='chat-group-user__name'>${user}</div>
                </div>`
    // return html;
    search_list.append(html);
}

  $(".chat-group-form__input-member").on("keyup", function() {
    var input = $(this).val()
    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
    .fail(function() {
      alert('映画検索に失敗しました');
    })
  });
});
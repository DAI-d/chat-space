$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<p>
                  ${message.user_name}
                  </p>
                  <p>
                  ${message.date}
                  </p>
                  <p>
                  ${content}
                  </p>
                  <p>
                  ${image}
                </p>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message')[0].reset(); //formに当てたクラス名っぽい
    })
    .fail(function(){
      alert('error');
    })
  })
})
var UserService = {
  init: function () {
    var token = localStorage.getItem("token");
    if (token) {
      window.location.replace("index.html");
    }
    $("#login-form").validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.login(entity);
      },
    });
  },
  login: function (entity) {
    $.ajax({
      url: "rest/login",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log(result);
        localStorage.setItem("token", result.token);
        window.location.replace("index.html");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      },
    });
  },

  userName: function () {
    $.ajax({
      url: "rest/users",
      type: "GET",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#userName").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html +=
            `
         <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">` +
            data[i].userName +
            `</a>

          `;
        }
        $("#userName").html(html);
      },
    });
  },

  logout: function () {
    localStorage.clear();
    window.location.replace("login.html");
  },
};

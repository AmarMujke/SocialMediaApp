var UserService = {
  init: function () {
    var token = localStorage.getItem("token");

    $("#login-form").validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.login(entity);
      },
    });
  },

  addUser: function (entity) {
    if (!entity) {
      $("#register-form").validate({
        submitHandler: function (form) {
          var entity = Object.fromEntries(new FormData(form).entries());
          UserService.addUser(entity);
        },
      });
    }
    $.ajax({
      url: "rest/users",
      type: "POST",

      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log(result);
        localStorage.setItem("token", result.token);
        window.location.replace("login.html");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
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
      success: function (data) {
        $("#userName").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html +=
            `
         <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">` +
            data[i].name +
            `</a>

          `;
        }
        $("#userName").html(html);
      },
    });
  },

  list: function () {
    var token = localStorage.getItem("token");
    var user;

    var jsonPayload = null;
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    }

    if (jsonPayload) {
      console.log(jsonPayload);
      user = JSON.parse(jsonPayload);
      console.log(user.id);
    }
    $.ajax({
      url: "rest/users/" + user.id,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (result) {
        console.log(result);
        $("#profile").html("");
        var html = "";

        html +=
          `
 
        <div class="row">
          <div class="col-lg-12 mb-4 mb-sm-5">
            <div class="card card-style1 border-0">
              <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div class="row align-items-center">
                  <div class="col-lg-6 mb-4 mb-lg-0">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="..."
                    />
                  </div>
                  <div class="col-lg-6 px-xl-10">
                    <div
                      class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded" style = "background-color:#02c39a!important"
                    >
                      <h3 class="h2 text-white mb-0">` +
          result.name +
          `</h3>
                    
                    </div>
                    <ul class="list-unstyled mb-1-9">
                      <li class="mb-2 mb-xl-3 display-28">
                        <span
                          class="display-26 text-secondary me-2 font-weight-600"
                          >Email:</span
                        >
                        ` +
          result.email +
          `
                      </li>
                    </ul>
                    <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                      <li>
                        <a href="#!"><i class="ti-twitter-alt"></i></a>
                      </li>
                      <li>
                        <a href="#!"><i class="ti-facebook"></i></a>
                      </li>
                      <li>
                        <a href="#!"><i class="ti-pinterest"></i></a>
                      </li>
                      <li>
                        <a href="#!"><i class="ti-instagram"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
          `;

        $("#profile").html(html);
      },
    });
  },

  logout: function () {
    localStorage.clear();
    window.location.replace("login.html");
  },
};

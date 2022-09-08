var PostService = {
  init: function () {
    PostService.list();
    UserService.list();
    $("#postList").validate({
      submitHandler: function (form) {
        var entity = Object();
        if (!isNaN(entity.id)) {
          // update method
          var id = entity.id;
          delete entity.id;
          PostService.update(id, entity);
        } else {
          // add method
          PostService.add(entity);
        }
      },
    });

    var token = localStorage.getItem("token");
    var user_id;
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
      user_id = JSON.parse(jsonPayload);
      console.log(user_id.id);
    }

    PostService.listByUser(user_id.id);
  },

  list: function () {
    $.ajax({
      url: "rest/postsDesc",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (data) {
        $("#postList").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html +=
            `
            <article class="post vt-post container" style="width:70%; height: fit-content; float:inherit;">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img id="userName">
                        <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">` +
            data[i].userName +
            `</a>
                    </div>
                    <div class="author-info author-info-2" id = "post" style="text-align:center; max-width: fit-content; border:none;">
                        <ul class="list-inline" style="text-align:center;">
                            <li style="float:right; margin-right:6%" >
                                <div class="info">
                                    <p>Likes:</p>
                                    <strong>` +
            data[i].likes +
            `</strong></div>
                                </li>
                            <li>
                              <button onClick="PostService.like(` +
            data[i].id +
            `)" class="info" style=" width: fit-content; border-radius: 20%;  background-color: #02c39a !important; border:none;"><img src="assets/up.png" width="40px" alt=""></button>
                            </li>
                            </ul>
                             <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Dislikes:</p>
                                    <strong>` +
            data[i].dislikes +
            `</strong></div>
                            </li>
                            <li>
            <button onClick="PostService.dislike(` +
            data[i].id +
            `)" class="info" style=" width: fit-content; border-radius: 20%; background-color: #02c39a !important; border:none;"><img src="assets/down.png" width="40px" alt=""></button>                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8" style="border-left: 1px solid black;">
                    <div class="caption">
                        ` +
            data[i].text +
            `
                </div>
            </div>
        </article>
       
             `;
        }
        $("#postList").html(html);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        UserService.logout();
      },
    });
  },

  like: function (id) {
    $.ajax({
      url: "rest/posts/" + id,
      type: "PUT",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (result) {
        PostService.list();
        toastr.success("LIKED!");
      },
    });
  },

  dislike: function (id) {
    $.ajax({
      url: "rest/posts/dislike/" + id,
      type: "PUT",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (result) {
        PostService.list();
        toastr.success("LIKED!");
      },
    });
  },

  listByUser: function (user_id) {
    $.ajax({
      url: "rest/postByUser/" + user_id,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (data) {
        $("#postListUser").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html +=
            `
            <article class="post vt-post container" style="width:70%; height: fit-content; float:inherit;">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img id="userName">
                        <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">` +
            data[i].userName +
            `</a>
                    </div>
                    <div class="author-info author-info-2" id = "post" style="text-align:center; max-width: fit-content; border:none;">
                        <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Likes:</p>
                                    <strong>` +
            data[i].likes +
            `</strong></div>
                                </li>
                            <li>
                            </li>
                            </ul>
                             <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Dislikes:</p>
                                    <strong>` +
            data[i].dislikes +
            `</strong></div>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8" style="border-left: 1px solid black;">
                    <div class="caption">
                        ` +
            data[i].text +
            `
                </div>
            </div>
         <button onClick="PostService.delete(` +
            data[i].id +
            `)" class="info" style=" width: fit-content; border-radius: 20%;  background-color: #02c39a !important; border:none;">delete</button>
        </article>
       
             `;
        }
        $("#postListUser").html(html);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        UserService.logout();
      },
    });
  },

  add: function () {
    var token = localStorage.getItem("token");
    var user_id;

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
    var text = $("#textForm").val();
    console.log(text);
    post = [text];

    $.ajax({
      url: "rest/posts/" + user.id,
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      data: JSON.stringify({ text: text, userName: user.name }),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        PostService.list();
        toastr.success("Added !");
      },
    });
  },

  update: function (id, entity) {
    $.ajax({
      url: "rest/posts/" + id,
      type: "PUT",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#note-list").html(
          '<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>'
        );
        PostService.list(); // perf optimization
        $("#addNoteModal").modal("hide");
        toastr.success("Note updated!");
      },
    });
  },

  delete: function (id) {
    $.ajax({
      url: "rest/posts/" + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      type: "DELETE",
      success: function (result) {
        $(document).ajaxStop(function () {
          window.location.reload();
        });
        toastr.success("Post deleted!");
      },
    });
  },

  choose_color: function (color) {
    $('#addNoteForm input[name="color"]').val(color);
  },

  share: function (id) {
    $('#shareNoteForm input[name="note_id"]').val(id);
    $("#shareModal").modal("show");
  },

  share_note: function () {
    var note_id = $('#shareNoteForm input[name="note_id"]').val();
    var recipient = $('#shareNoteForm input[name="recipient"]').val();

    $.ajax({
      url: "rest/notes/" + note_id + "/share",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      data: JSON.stringify({ email: recipient }),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#shareModal").modal("hide");
        toastr.success("Note shared!");
      },
    });
  },
};

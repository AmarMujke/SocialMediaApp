var PostService = {
  init: function () {
    $("#addPost").validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
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
    PostService.list();
  },

  list: function () {
    $.ajax({
      url: "rest/posts",
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
                        <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">neki user</a>
                    </div>
                    <div class="author-info author-info-2" id = "post" style="text-align:center; max-width: fit-content; border:none;">
                        <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Dislikes:</p>
                                    <strong>` +
            data[i].dislikes +
            `</strong></div>
                                </li>
                            <li>
                               <button class="info" style=" width: fit-content; border-radius: 20%; background-color: #02c39a !important; border:none;"><img src="assets/down.png" width="40px" alt=""></button>
                            </li>
                            </ul>
                             <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Likes:</p>
                                    <strong>` +
            data[i].likes +
            `</strong></div>
                            </li>
                            <li>
                             <button class="info" style=" width: fit-content; border-radius: 20%;  background-color: #02c39a !important; border:none;"><img src="assets/up.png" width="40px" alt=""></button>
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

  get: function (id) {
    $(".note-button").attr("disabled", true);

    $.ajax({
      url: "rest/notes/" + id,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      success: function (data) {
        $('#addNoteForm input[name="id"]').val(data.id);
        $('#addNoteForm input[name="name"]').val(data.name);
        $('#addNoteForm input[name="description"]').val(data.description);
        $('#addNoteForm input[name="created"]').val(data.created);
        $('#addNoteForm input[name="color"]').val(data.color);

        $(".note-button").attr("disabled", false);
        $("#addNoteModal").modal("show");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
        $(".note-button").attr("disabled", false);
      },
    });
  },

  add: function (post) {
    $.ajax({
      url: "rest/posts",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      data: JSON.stringify(post),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#postList").html(
          `<article class="post vt-post container" style="width:70%; height: fit-content; float:inherit;">
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img id="userName">
                        <a href="#" style="color: black; text-decoration:none;"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" id="postImg" style="width:50%;" class="img-responsive" alt="image post">neki user</a>
                    </div>
                    <div class="author-info author-info-2" id = "post" style="text-align:center; max-width: fit-content; border:none;">
                        <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Dislikes:</p>
                                    <strong>` +
            result.dislikes +
            `</strong></div>
                                </li>
                            <li>
                               <button class="info" style=" width: fit-content; border-radius: 20%; background-color: #02c39a !important; border:none;"><img src="assets/down.png" width="40px" alt=""></button>
                            </li>
                            </ul>
                             <ul class="list-inline" style="text-align:center;">
                            <li style="float: right;">
                                <div class="info">
                                    <p>Likes:</p>
                                    <strong>` +
            result.likes +
            `</strong></div>
                            </li>
                            <li>
                             <button class="info" style=" width: fit-content; border-radius: 20%;  background-color: #02c39a !important; border:none;"><img src="assets/up.png" width="40px" alt=""></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8" style="border-left: 1px solid black;">
                    <div class="caption">
                        ` +
            result.text +
            `
                </div>
            </div>
        </article>
       
             `
        );
        PostService.list(); // perf optimization
        $("#postList").modal("hide");
        toastr.success("Note added!");
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
    $(".note-button").attr("disabled", true);
    $.ajax({
      url: "rest/notes/" + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      },
      type: "DELETE",
      success: function (result) {
        $("#note-list").html(
          '<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>'
        );
        PostService.list();
        toastr.success("Note deleted!");
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

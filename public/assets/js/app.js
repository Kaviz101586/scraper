$(document).on("click", "#scrapeIt", function () {
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function (res, req) {
      alert("Scraped Data");
      res.redirect("/")
    });
});

// $(document).on("click", ".noteBtn", expand);

// function expand() {
//   $("#noteTable").empty();
//   let thisId = $(this.attr("data-id"));
//   $.get("/api/notes" + data-id, res => {
//     $()
//   })
// }

$(document).on("click", ".noteBtn", function (event) {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "https://hbr.org/" + "articles/" + thisId
    })
      .then(function (data) {
        var noteSection = $("<div>")
        noteSection.append("<h3>" + $(this.data.title) + "</h3>");
        noteSection.append("<input id='titleInput' name='title' >");
        noteSection.append("<textarea id='bodyInput' name='body'></textarea>");
        noteSection.append("<button data-id='" + data._id + "' id='saveNote'>Save Note</button>");
        $("#notes").append(noteSection);
  
        if (data.note) {
          $("#titleInput").val(data.note.title);
          $("#bodyInput").val(data.note.body);
        }
      });
  });
  
    $(document).on("click", ".saveNote", function() {
      var thisId = $(this).attr("data-id");
  
      $.ajax({
        method: "POST",
        url: "https://hbr.org/" + "articles/" + thisId,
        data: {
          title: $("#titleinput").val(),
          body: $("#bodyinput").val()
        }
      })
        .then(function(data) {
          console.log(data);
          $("#notes").empty();
        });
  
      $("#titleinput").val("");
      $("#bodyinput").val("");
    });
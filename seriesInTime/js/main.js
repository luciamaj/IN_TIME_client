//First carousel
$(function () {
    $.ajax({
        "url": "https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a",
        "method": "GET",
        success: function (data) {
          console.log("dati", data);
          for (var i = 0; i < data.results.length; i++) {
              if(data.results[i].poster_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].poster_path;
              }
              else if (data.results[i].backdrop_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].backdrop_path;
              }
              else{
                  var linkImg = "images/notavailable.jpg";
              }
              var div = "<div class =\"tvshows\" data-id=\"" + data.results[i].id + "\"><img class = \"locandina\" data-id=\"" + data.results[i].id + "\" src=\"" + linkImg + "\"><div data-id=\"" + data.results[i].id + "\" class=\"singleBox\">" + data.results[i].name + "</div></div>"
              $('#car1').owlCarousel().trigger('add.owl.carousel', [$('<div class="owl-item">' + div + '</div>')]).trigger('refresh.owl.carousel');

          }
          $(".tvshows").on("click", singleBox_clickHandler);
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
    $("#closeInfo").on("click", closeBtn_clickHandler);
});

//Second carousel
$(function () {
    $.ajax({
        "url": "https://api.themoviedb.org/3/tv/popular?page=2&language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a",
        "method": "GET",
        success: function (data) {
          console.log("dati", data);
          for (var i = 0; i < data.results.length; i++) {
              if(data.results[i].poster_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].poster_path;
              }
              else if (data.results[i].backdrop_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].backdrop_path;
              }
              else{
                  var linkImg = "images/notavailable.jpg";
              }
              var div = "<div class =\"tvshows\" data-id=\"" + data.results[i].id + "\"><img class = \"locandina\" data-id=\"" + data.results[i].id + "\" src=\"" + linkImg + "\"><div data-id=\"" + data.results[i].id + "\" class=\"singleBox\">" + data.results[i].name + "</div></div>"
              $('#car2').owlCarousel().trigger('add.owl.carousel', [$('<div class="owl-item">' + div + '</div>')]).trigger('refresh.owl.carousel');

          }
          $(".tvshows").on("click", singleBox_clickHandler);
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
    $("#closeInfo").on("click", closeBtn_clickHandler);
});

//Third carousel
$(function () {
    $.ajax({
        "url": "https://api.themoviedb.org/3/tv/popular?page=3&language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a",
        "method": "GET",
        success: function (data) {
          console.log("dati", data);
          for (var i = 0; i < data.results.length; i++) {
              if(data.results[i].poster_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].poster_path;
              }
              else if (data.results[i].backdrop_path){
                  var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.results[i].backdrop_path;
              }
              else{
                  var linkImg = "images/notavailable.jpg";
              }
              var div = "<div class =\"tvshows\" data-id=\"" + data.results[i].id + "\"><img class = \"locandina\" data-id=\"" + data.results[i].id + "\" src=\"" + linkImg + "\"><div data-id=\"" + data.results[i].id + "\" class=\"singleBox\">" + data.results[i].name + "</div></div>"
              $('#car3').owlCarousel().trigger('add.owl.carousel', [$('<div class="owl-item">' + div + '</div>')]).trigger('refresh.owl.carousel');

          }
          $(".tvshows").on("click", singleBox_clickHandler);
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
    $("#closeInfo").on("click", closeBtn_clickHandler);
});

//Close boox
function closeBtn_clickHandler() {
    $("#infoBox").fadeOut();
    $("body").removeClass("modal-open");
    $("#dimScreen").fadeOut();
}

//Print general information
function singleBox_clickHandler(event) {
    var $t = $(event.target);
    var id = $t.data("id");
    console.log(id);

    $.ajax({
        url: "https://api.themoviedb.org/3/tv/" + id + "?language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a&append_to_response=videos,images",
        method: "GET",
        success: function (data) {
            console.log("dati", data);
            $("#dropdown").empty();
            $("#dropdown-episodes").empty();
            $("#overview-episode").empty();
            $("#video").empty();
            $("#genre").html("Genre: ");
            if(data.genres.name !=""){
                for(var i=0; i<data.genres.length; i++){
                    if(i==data.genres.length-1){
                        $("#genre").append( data.genres[i].name  );
                    }
                    else{
                        $("#genre").append( data.genres[i].name + ", " );
                    }

                }
            }
            else {
                $("#genre").html(" not available");
            }

            if(data.networks[0] != [""]){
                for(var i=0; i<data.networks.length; i++){
                    $("#network").html("Network: " + data.networks[i].name);
                }
            }
            else {
                $("#network").html("Network: not available");
            }

            if(data.status != ""){
                $("#status").html("Status: " + data.status);
            }
            else {
                $("#status").html("Status: not available");
            }
            if(data.poster_path){
                var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.poster_path;
            }
            else if (data.backdrop_path){
                var linkImg = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + data.backdrop_path;
            }
            else{
                var linkImg = "images/notavaible2.jpeg";
            }

            $("#text").html(data.overview);
            $("#image").html("<img id = \"poster\" src=\"" + linkImg + "\">");
            $("#title").html(data.name);
            $("#pop").html("Popularity: " + parseInt(data.popularity)+ "%");
            $("#vote").html("Vote: " + data.vote_average);
            $("#season").html("Numbers of seasons: " + data.number_of_seasons);
            $("#episode").html("Numbers of episodes: " + data.number_of_episodes);
            $("#home").html("<a target=\"_blank\" href=\"" + data.homepage + "\"> Website</a>");
            if (data.videos.results.length != 0) {
                var link = data.videos.results[0].key;
                $("#video").append("<a target=\"_blank\" href=\"https://www.youtube.com/watch?v=" + link + "\"><img id = \"thumb\" src=\"https://ytimg.googleusercontent.com/vi/" + link + "/mqdefault.jpg\"/></a>");
                $("#video").append("<a target=\"_blank\" href=\"https://www.youtube.com/watch?v=" + link + "\"><img id=\"yticon\" src=\"images/yticon.png\"/></a>");
                console.log(link);
            }
            else {
                $("#video").append("<img id=\"notavailablevideo\" src=\"images/download.png\"/>");
            }

            $("#dropdown").append("<option class=\"option\" disabled selected> Select the season </option>");
            $("#dropdown-episodes").append("<option class=\"option\" disabled selected> Select the episode </option>");
            if (data.seasons.length >= 1) {
                if (data.seasons[0].season_number == 1) {
                    for(var i=0; i<data.seasons.length; i++){
                        var seasonNumber = data.seasons[i].season_number;
                        $("#dropdown").append("<option class=\"option\" value=\"" + data.id +"\" > " + seasonNumber +" </option> ");
                    }
                }
                else {
                    for(var i=0; i<data.seasons.length - 1; i++){
                        var seasonNumber = data.seasons[i].season_number + 1;
                        $("#dropdown").append("<option class=\"option\" value=\"" + data.id +"\" > " + seasonNumber + " </option>");

                    }
                }
            }
            else {
                $("#dropdown").empty();
                $("#dropdown").append("<option class=\"option\" disabled selected> Not available </option> ");
            }

            var div = "<div id=\"calculate\" data-id=\"" + id + "\">CALCULATE</div>";
            $("#calculate").html(div);

            $("#calculate").on("click", openNew_clickHandler);
            $("body").addClass("modal-open");
            $("infoContent").fadeIn();
            $("#infoBox").fadeIn();
            $("#dimScreen").fadeIn();
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
}

//Open calculate
function openNew_clickHandler(event) {
    var $t = $(event.target);
    var id = $t.data("id");
    console.log(id);
    localStorage.setItem("idNew", id);
    window.open("calculate.html");
}

//Print episodes
function episodeSelect () {
    var id = $("#dropdown option:selected").val();
    var seasonN = $("#dropdown option:selected").text();
    console.log(id);
    console.log(seasonN);
    $.ajax({
        "url": "https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonN + "?append_to_response=episodes,videos,images&language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a",
        "method": "GET",
        success: function (data) {
            console.log(data);
            $("#dropdown-episodes").empty();
            if (data.episodes.length >= 1) {
                for(var i=0; i<data.episodes.length;i++){
                    $("#dropdown-episodes").append("<option class=\"option\" value=\"" + data.id +"\" data-id=\"" + data.episodes[i].episode_number +"\" > " + data.episodes[i].episode_number + ". " + data.episodes[i].name +" </option>  ");
                }
                console.log();
            }
            else {
                $("#dropdown-episodes").empty();
                $("#dropdown-episodes").append("<option class=\"option\" disabled selected> Not available </option> ");
            }
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
            $("#dropdown-episodes").empty();
            $("#dropdown-episodes").append("<option class=\"option\" disabled selected> Not available </option> ");
        }
    });
}

//Print overview
function showOverview () {
    var id = $("#dropdown option:selected").val();
    var seasonN = $("#dropdown option:selected").text();
    var episodeN = $("#dropdown-episodes option:selected").data('id');
    console.log(id);
    console.log(seasonN);
    console.log(episodeN);
    $.ajax({
        "url": "https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonN + "/episode/" + episodeN + "?api_key=9adc39f5c0d9ca60fa429e8e0158cd3a&language=en-US&append_to_response=videos,images",
        "method": "GET",
        success: function (data) {
            if (data.overview) {
                $("#overview-episode").html(data.overview);
            }
            else {
                $("#overview-episode").html("Overview not available");
            }
            $("#overview-episode").fadeIn();
            console.log(data);
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
}

//Search
function searchFunc () {
    var search = document.getElementById("search-btn").value;
    console.log(search);

    if (search) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv?api_key=9adc39f5c0d9ca60fa429e8e0158cd3a&language=en-US&query=" + search,
            method: "GET",
            success: function (data) {
                console.log("dati", data);
                $("#search-result").empty();
                var closeBtn = "<div id=\"closeSearch\" class=\"closeBtn\">X</div>"
                $("#search-result").append(closeBtn)

                for (var i = 0; i < data.results.length; i++) {
                    var div = $("<div data-id=\"" + data.results[i].id + "\" class=\"searchDiv\">" + data.results[i].name + "</div>")
                    $("#search-result").append(div);
                    console.log(data.results[i].id);
                }
                $('#search-result').slideDown();
                $(".searchDiv").on("click", singleBox_clickHandler);
                $("#closeSearch").on("click", closeSearch_clickHandler);
            },
            error: function (error, data) {
                console.log(error);
                console.log(data);
            }
        });
    }
    else {
        console.log("Insert something");
    }
}

//Close rearch
function closeSearch_clickHandler() {
    $("#closeSearch").fadeOut();
    $("#search-result").slideUp();
}

//Enter
var searchKey = $("#search-btn");
searchKey.on("keydown", function (e) {
    if (e.keyCode === 13) {
        searchFunc(e);
    }
});

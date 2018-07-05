//Send data
$(function searchBox_clickHandler () {
    var id = localStorage.getItem("idNew");
    console.log(id);

    $.ajax({
        url: "https://api.themoviedb.org/3/tv/" + id + "?language=en-US&api_key=9adc39f5c0d9ca60fa429e8e0158cd3a&append_to_response=videos,images",
        method: "GET",
        success: function (data) {
            console.log("dati", data);
            var linkImg = "https://image.tmdb.org/t/p/original/" + data.backdrop_path;
            if (data.backdrop_path) {
                 $("#title-calc").css("background-image", "url(" + linkImg + ")");
            }
            else {
                $("#title-calc").css("background-color", "#BF1A1A");
            }
            $("#title-calc").append("<div id=\"title-calc-span\">" + data.name + "</div>");
            $("#seasons-result").empty();
            if (data.seasons.length) {
                if (data.seasons[0].season_number == 1) {
                    for (var i = 0; i < data.seasons.length; i++) {
                        var seasonNumber = data.seasons[i].season_number;
                        console.log(seasonNumber);
                        var string = "Season "
                        var div = $("<div class=\"seasonsBox\" data-id=\"" + id + "\" data-season=\"" + seasonNumber + "\">" + string + seasonNumber + "</div><div class=\"seasonTray\" data-duration=\"" + data.episode_run_time[0] + "\" data-season=\"" + seasonNumber + "\"></div>");
                        $("#seasons-result").append(div);
                    }
                }
                else {
                    for (var i = 0; i < data.seasons.length - 1; i++) {
                        var seasonNumber = data.seasons[i].season_number + 1;
                        console.log(seasonNumber);
                        var string = "Season "
                        var div = $("<div class=\"seasonsBox\" data-id=\"" + id + "\" data-season=\"" + seasonNumber + "\">" + string + seasonNumber + "</div><div class=\"seasonTray\" data-duration=\"" + data.episode_run_time[0] + "\" data-season=\"" + seasonNumber + "\"></div>");
                        $("#seasons-result").append(div);
                    }
                }
            }
            else {
                window.alert("Dati non disponibili");
            }
            $(".seasonsBox").on("click", seasonsBox_clickHandler);
            },
        error: function (error, data) {
            console.log(error);
            console.log(data);
            }
        });
    });

//Print episodes
function seasonsBox_clickHandler (event) {
    var $t = $(event.target);
    var seriesId = $t.data("id");
    var seasonNum = $t.data("season");
    console.log(seasonNum, seriesId);


    $.ajax({
        url: "https://api.themoviedb.org/3/tv/" + seriesId + "/season/" + seasonNum + "?api_key=9adc39f5c0d9ca60fa429e8e0158cd3a&language=en-US&append_to_response=videos,images",
        method: "GET",
        success: function (data) {
            console.log("dati", data);
            var count = 0;
            var nEpisodes = data.episodes.length;
            console.log(nEpisodes);
            var text = "Select all the episodes in the season"
            $(".seasonTray[data-season=" + seasonNum + "]").toggle();
            $(".seasonTray[data-season=" + seasonNum + "]").empty();
            $(".seasonTray[data-season=" + seasonNum + "]").append("<div class=\"select\"><label class=\"label-check\"><input type=\"checkbox\" name=\"select-all\" class=\"select-all\" value=\"" + data.season_number + "\" />" + text + "</label</div>");
            console.log(data.episodes);
            for (var i = 0; i < data.episodes.length; i++) {
                var input = $("<br><div class\"episodesLabel\"><label class=\"label-check\" for=\"" + data.episodes[i].id + "\"><input id=\"" + data.episodes[i].id + "\" type=\"checkbox\" class=\"norm\" value=\"" + data.season_number + "\">" + data.episodes[i].name + "</label></div>");
                $(".seasonTray[data-season=" + seasonNum + "]").append(input);
            }

            $(".select-all").change(function() {
                var val = $(this).val();
                if( $(this).is(":checked") ) {

                $(":checkbox[value='"+val+"']").attr("checked", true);
                }

                else {
                $(":checkbox[value='"+val+"']").attr("checked", false);
                }
            });
        },
        error: function (error, data) {
            console.log(error);
            console.log(data);
        }
    });
}

//Calculate time and days
$("#calculate-btn").click(function(event){
    var episodeMax = document.getElementById("max-episodes").value;
    console.log(episodeMax);
    var result = 0;
    var checkDuration = false;
    event.preventDefault();
    var checkedList = $("input:checkbox.norm:checked");
    console.log(checkedList.length);
    var totEpisodes = checkedList.length;
    var days = parseFloat(totEpisodes / episodeMax);
    var days = Math.ceil(days);
    console.log("Giorni " + days);
    for (var i = 0; i < checkedList.length; i++) {
        var duration = $(".seasonTray").data("duration");
        if (isNaN(parseInt(duration))) {
            console.log("non c'è una durata");
            checkDuration = true;
            i=checkedList.length;
        }
        else {
            result = result + duration;
        }
    }

    var hours = Math.trunc(result/60);
    var minutes = result % 60;

    console.log(result);
    console.log(hours +":"+ minutes);
    if (hours || minutes != 0) {
        $("#result").html(hours +" hours and "+ minutes + " minutes");
    }
    if (checkDuration) {
        window.alert("Attenzione, il calcolo potrebbe non risultare corretto, alcune durate sono mancanti");
    }
    $("#closeCalculate").on("click", closeCalculate_clickHandler);
    if (episodeMax >0) {
        $("#days-result").css("display", "inline");
        $("#span-max-episodes").html(episodeMax);
        $("#span-days").html(days);
    }
    else  {
        $("#days-result").css("display", "inline");
        $("#span-max-episodes").html("0");
        $("#span-days").html("0");
    }
    if (result != 0) {
        $("body").addClass("modal-open");
        $("#infoBoxCalculate").fadeIn();
    }
    else {
        console.log("Episodes not selected");
    }
});

function closeCalculate_clickHandler() {
    $("#infoBoxCalculate").fadeOut();
    $("body").removeClass("modal-open");
}

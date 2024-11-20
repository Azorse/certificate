
var currentIndex = 0;
var slideCount = 0;
var playIndex = 0;
var vidIndex = 0;
var originalOffset = null;
var largeVideo = false;
var styleName = null;
var mainStyleSheet = null;
var isShowingTracks = false;

var keyCode = {
    BACKSPACE: 8,
    CAPS_LOCK: 20,
    COMMA: 188,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    INSERT: 45,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    NUMPAD_ONE: 97,
    NUMPAD_TWO: 98,
    NUMPAD_THREE: 99,
    C: 67,
    N: 78,
    P: 80
};

$(function () {
    //this was added to remember the selection or de-selection of CC captions for Preview presentations 
    var player = videojs("playerContainer")
    player.textTracks().on("change", function action(event) {

        

        var showing = this.tracks_.filter(function (track) {

            if (track.kind === "captions") {
                isShowingTracks = track.mode == "showing" ? true : false;
                return true;
            }

        })[0]

       })

    var styleSheets = document.styleSheets;
    for (var i = 0; i < styleSheets.length; i++)
        if (styleSheets[i].href != null && styleSheets[i].href.indexOf("style.css") > 0) {
            mainStyleSheet = styleSheets[i];
            
        }

    //update video path
    $('div.slide-video').each(function () {
        $(this).attr('data-video', relativeAssetsPath + $(this).attr('data-video'));
    });

    initSlideShow();
    switchStylestyle('one');

    $(document).keydown(function (event) {
        var key = event.keyCode || event.which;
        if (event.target.type !== 'textarea') {
            switch (key) {
                case keyCode.LEFT:
                case keyCode.UP:
                case keyCode.PAGE_UP:
                case keyCode.BACKSPACE:
                    navigate(currentIndex - 1);
                    break;
                case keyCode.RIGHT:
                case keyCode.DOWN:
                case keyCode.PAGE_DOWN:
                case keyCode.SPACE:
                case keyCode.ENTER:
                case keyCode.NUMPAD_ENTER:
                    navigate(currentIndex + 1);
                    break;
                case keyCode.HOME:
                    navigate(0);
                    break;
                case keyCode.END:
                    navigate(slideCount - 1);
                    break;
                case keyCode.ESCAPE:
                    exitSlideShow();
                    break;
                case keyCode.ONE:
                case keyCode.NUMPAD_ONE:
                    switchStylestyle('one');
                    break;
                case keyCode.TWO:
                case keyCode.NUMPAD_TWO:
                    switchStylestyle('two');
                    break;
                case keyCode.THREE:
                case keyCode.NUMPAD_THREE:
                    switchStylestyle('three');
                    break;
                case keyCode.N:
                    $.modal($('#notes' + currentIndex).html());

                    //$('#preview' + currentIndex).visible = false;
                    break;
                case keyCode.C:
                    $.modal.close();
                    //$('#preview' + currentIndex).visible = true;
                    break;
                case keyCode.P:
                    var html = $('#print' + currentIndex).html();
                    try {
                        var iframe = document.getElementById('iframe');
                        var doc = (iframe.contentWindow || iframe.contentDocument);
                        if (doc.document) doc = doc.document;
                        doc.write("<head><title></title></head><body onload='this.focus(); this.print();'>");
                        doc.write(html);
                        doc.write("</body>");
                        doc.close();
                    } catch (e) {; }
                    break;
                default:
                    return true;
            }
        }

        return false;
    });

    if ($.support.touch && slideCount != 1) {
        $("#next-link").show();
    } else {
        $("#previous").hover(
         function () { $("#previous-link").show(); }, function () { $("#previous-link").hide(); }
         );
        $("#next").hover(
            function () { $("#next-link").show(); }, function () { $("#next-link").hide(); }
        );
    }

    $("#home").hover(
        function () { $("#home-link").show(); }, function () { $("#home-link").hide(); }
    );
    $("#exit").hover(
        function () { $("#exit-link").show(); }, function () { $("#exit-link").hide(); }
    );
    $("#end").hover(
        function () { $("#end-link").show(); }, function () { $("#end-link").hide(); }
    );

    $('body').swiperight(function () {
        navigate(currentIndex - 1);
    }).swipeleft(function () {
        navigate(currentIndex + 1);
    });
});

function initSlideShow() {
    slideCount = getSlideCount();
    hideAllSlides(); //cc TODO: might need to remove if issues with mvc

    currentIndex = startOrdinal;

    showSlide(startOrdinal);
    setTitle(startOrdinal);
    if (startOrdinal > 0)
        playAnimationVideo(startOrdinal);


}

function navigate(index) {



    var playerDiv = $('#player' + currentIndex + '_');
    if (playerDiv.length > 0) {
        var playerId = playerDiv.attr('id');
        if ((playerDiv.offset().top < 1 && playerDiv.offset().left < 1) && originalOffset != null)
            playerDiv.offset(originalOffset);
    }

    if (index == 0) {
        $("#previous-link").hide();
    }
    else if ($.support.touch) {
        $("#previous-link").show();
    }

   



    if (vidIndex != 0 && vidIndex <= index) {
        currentIndex = vidIndex;
    } else {
        currentIndex = getIndex(index);
        vidIndex = 0;
        playIndex = 0;
    }


    if (currentIndex == (slideCount - 1)) {
        $("#next-link").hide();
    }
    else if ($.support.touch) {
        $("#next-link").show();
    }
    playerDiv = $('#player' + currentIndex + '_');
    if (playerDiv.length > 0) {
        if (playIndex == 0) {
            vidIndex = currentIndex;

            if ($("#assetlargesimplicity" + currentIndex).length > 0)
                largeVideo = true;
        }
    }

    if (vidIndex != 0 && playIndex == 0) {
        setTitle(currentIndex);
        hideAllSlides();
        playAnimationVideo(vidIndex);
        showSlide(currentIndex);
        playIndex = 1;

        showHideContents(true);


    } else if (vidIndex != 0 && playIndex == 1) {
        playAnimationVideo(vidIndex);
        playIndex = 0;
        vidIndex = 0;
        largeVideo = false;
    } else {
        setTitle(currentIndex);
        hideAllSlides();
        showSlide(currentIndex);
        playAnimationVideo(currentIndex);
        playIndex = 0;
        vidIndex = 0;
        showHideContents(true);

    }
}

function getSlideCount() {
    return $('#slides').children('*').length / 4;
}

function getIndex(index) {
    var i = index;

    if (i < 0) { i = 0; }
    if (i > slideCount - 1) { i = slideCount - 1; }

    return i;
}

function showHideContents(show) {
    if (show) {
        $(".container").show();
        $(".footer").show();
        $(".client-logo").show();

        videojs("playerContainer").pause();
        videojs("playerContainer").reset();

        $("#playerContainer").hide();


    } else {
        $(".container").hide();
        $(".footer").hide();
        $(".client-logo").hide();
        $("#playerContainer").show();
    }
}

function setTitle(index) {
    //var text = (index == 0) ? "Welcome" : ((index == slideCount - 1) ? "End" : "Slide " + index + " of " + (slideCount - 2));
    //var text = "Slide " + (index + 1) + " of " + slideCount;

    var onSlide = _pages[index];
    var totalSlides = _pages[_pages.length - 1];

    var text = "Slide " + onSlide + " of " + totalSlides;

    document.title = text;
    $(".page").text(text);
}

function hideAllSlides() {
    if ($(".slide").length > 0)
        $(".slide").hide();

    if ($(".slide-black").length > 0)
        $(".slide-black").hide();

    $("#exit-message").hide();

    for (var i = 0; i < slideCount; i++) {
        $('#player' + i + '_').empty();
    }
}

function showSlide(index) {
    var today = new Date();
    var expiration = _exp;
    var isExpired = dates.compare(today, expiration) == 1;

    var backgroundColor = $("#slide" + index).attr("data-id");
    var isImage = false;
    if (typeof (backgroundColor) === 'undefined')
        backgroundColor = "#FFFFFF";

    if (backgroundColor.indexOf(".png") > -1)
        isImage = true;

    var footerColor = $("#slide" + index).attr("data-footer");
    var footerStripe = $(".footer-stripe");
    footerStripe.css("background-color", footerColor);

    if (isExpired) {
        hideAllSlides();
        $("#over-limit").show();
        return;
    }


    if (!isImage) {
        $("#mainBody").attr("style", "background-color:" + backgroundColor);
    }
    else
    {
        $("#mainBody").attr("style", "background-image:" + backgroundColor);
    }

    $("#slide" + index).show();

    $(".footer-logo").show();
}

function playAnimationVideo(index) {


    var playerDiv = $('#player' + index + '_');
    if (playerDiv.length > 0) {
        var playerId = playerDiv.attr('id');
        var player = $('#' + playerId).siblings('input[type="hidden"]');
        var autoStart = (vidIndex != 0 && playIndex == 1) || (vidIndex == 0 && playIndex == 0);
        //check for video, set dimensions and play if available.            
        if (typeof (player.attr('data-video')) != 'undefined') {

            if (playIndex > 0) {
                showHideContents(false);
            }

            var playerName = playIndex > 0 ? "playerContainer" : playerId;

            var vidPlayer = videojs(playerName);
            vidPlayer.src(player.attr('data-video'));
            vidPlayer.autoplay(false);

            var width = $(window).width();
            var height = $(window).height();

            if (playIndex > 0) {

                

                //  vidPlayer.resize(width, height);
                playerDiv.css('background-color', 'black');
                vidPlayer.height(height);
                vidPlayer.width(width);

             
                //need to find the corresponding vtt file associated with the video
                var existingTracks = vidPlayer.remoteTextTracks();
             if (existingTracks.length > 0)
               {
                    var existingTrack = existingTracks[0];
                    vidPlayer.removeRemoteTextTrack(existingTrack);
              }
                    

                var vttSrc = player.attr('data-animation-id');
                //vidPlayer.addRemoteTextTrack({ kind: 'captions', src: vttSrc, mode: isShowingTracks, srclang: 'en', label: 'English' });
                vidPlayer.addRemoteTextTrack({ kind: 'captions', default: isShowingTracks, src: vttSrc, srclang: 'en', label: 'English' });
                vidPlayer.play();

               /* var newTracks = vidPlayer.remoteTextTracks();
                //check to see if we need to reshow
                if (newTracks.length > 0 && isShowingTracks) {
                    newTracks[0].mode = "showing";
                }*/
             

            } else {
                playerDiv.css('background-color', 'white');
                vidPlayer.height(height / 2);
                vidPlayer.width(width / 2);
            }

        }


    }
}


function checkIndex() {

}

function exitSlideShow() {
    var objWin = window.self;
    objWin.open('', '_self', '');
    objWin.close();

    //Below is for Firefox 2.0 users because self.close() does not work there by design
    hideAllSlides();
    $("#exit-message").show();
}

var dates = {
    convert: function (d) {
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0], d[1], d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year, d.month, d.date) :
            NaN
        );
    },
    compare: function (a, b) {
        return (
            isFinite(a = this.convert(a).valueOf()) &&
            isFinite(b = this.convert(b).valueOf()) ?
            (a > b) - (a < b) :
            NaN
        );
    },
    inRange: function (d, start, end) {
        return (
            isFinite(d = this.convert(d).valueOf()) &&
            isFinite(start = this.convert(start).valueOf()) &&
            isFinite(end = this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

function switchStylestyle(name) {
    $('link[rel*=style][title]').each(function () {
        this.disabled = true;
        if (this.getAttribute('title') == name)
            this.disabled = false;
    });
}


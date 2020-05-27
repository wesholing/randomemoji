var emojiData = [],
    emoji = {};

emoji.unicode = emoji.title = "";

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$.getJSON("https://randomemoji.com/js/unicode.json", function (data) {
        emojiData = data;
    })
    .done(function () {
        randomEmoji();
    });

$(document).ready(function() {
    
    $("#generate").click(function() {
        randomEmoji();
    });
    
    $("#emoji span").click(function(event){
        var $tempElement = $("<input>");
        $("body").append($tempElement);
        $tempElement.val($(this).text()).select();
        document.execCommand("Copy");
        $tempElement.remove();
    });
    
    $("#emoji span").click(function() {
        $(this).attr("data-original-title", "Copied!").tooltip("show");        
    });
    
    $("#emoji span").mouseout(function() {
        $(this).attr("data-original-title", "Click to copy");
    });
    
    $('[data-toggle="tooltip"]').tooltip();
});

function randomEmoji() {
    var list;
    
    emoji.index = randomNum(0,emojiData.length);
    console.log("emoji.index: " + emoji.index);
    list = emojiData[emoji.index].unicode.split("+");
    emoji.title = emojiData[emoji.index].title;

    for (i = 0; i < list.length; i++) {
        list[i] = "&#x" + list[i] + ";";
        emoji.unicode += list[i];
    }

    console.log("Title: " + emoji.title + "; Unicode: " + emoji.unicode);
    
    $("#emoji span").html(emoji.unicode);
    $("#title span").html(emoji.title);
    emoji.unicode = "";

}

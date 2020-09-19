
$(function () {

    $("body").on("click", "a", function (e) {
        var href = $(this).attr("href");
        console.log("href:" + href);
        $(this).attr("href", "/hss" + href);
    });

    $("body").on("click", "img", function (e) {
        console.log("发放:" + $(this).attr("src"))
        // $(this).attr("src", "/ddd" + $(this).attr("src"))
    });

})


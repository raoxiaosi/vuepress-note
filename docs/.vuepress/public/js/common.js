var base_dir = '/vuepress';

$(function () {
    $("body").on("click", "a", function (e) {
        var href = $(this).attr("href");
        console.log(href.indexOf('#') < 0)
        if (!no_deal_with_url(href)) {
            if (!has_base_dir(href)) {
                $(this).attr("href", base_dir + href);
            }
            window.location.href = $(this).attr("href")
        }
    });
})


window.addEventListener('load', function () {
    $("img").each(function () {
        var src = $(this).attr("src");
        if (!has_base_dir(src)) {
            $(this).attr("src", base_dir + src);
        }
    });
});

function has_base_dir(url) {
    return url.indexOf(base_dir) >= 0;
}

function no_deal_with_url(href) {
    var ignore = ['#', 'http://', 'https://']
    var result = false;
    for (var i = 0; i < ignore.length; i++) {
        if (href.indexOf(ignore[i]) >= 0) {
            result = true;
            break;
        }
    }
    return result;
}


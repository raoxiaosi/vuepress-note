window.addEventListener('load', function () {

    var catalog_html = '<div class="calalog">';
    $('h1,h2,h3,h4,h5,h6').each(function (index, item) {
        var tag = $(item).get(0).localName;
        var id = $(item).attr("id");
        var text = $(item).text();
        text = text.substring(text.indexOf('# ') + 2);
        catalog_html += '<a class="new' + tag + '" href="#' + id + '">' + text + '</a></br>';
    });

    $('.page .theme-default-content').prepend(catalog_html + '</div>');
    for (var i = 1; i <= 6; i++) {
        $(".newh" + i).css("margin-left", (i - 1) * 30);
    }
});

var base_dir = '/vuepress';

$(function () {
    $("body").on("click", "a", function (e) {
        var href = $(this).attr("href");
        if(!has_base_dir(href)){
            $(this).attr("href", base_dir + href);
        }
        window.location.href=$(this).attr("href")
        return
    });
})


window.addEventListener('load',function(){
      $("img").each(function () {
          var src = $(this).attr("src");
          if(!has_base_dir(src)){
              $(this).attr("src", base_dir + src);
          }
      });
});

function has_base_dir(url) {
    return url.indexOf(base_dir) >= 0;
}


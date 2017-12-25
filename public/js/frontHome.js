$(function () {
    var $select = $(".form-control"),
        $range = $('#range'),
        $num = $('#num'),
        $article = $('#article');
    $num.text($range.val());
    $article.text(form($range.val(), ['пункт', 'пунктов', 'пуункта']));

    $range.change(function () {
        $num.text($range.val());
        $article.text(form($range.val(), ['пункт', 'пунктов', 'пуункта']));
    });

    $select.change(function () {
        $(".col-md-3").remove();
        $.post('/ajax', { 'url': $select.val(), 'num': $range.val() }, function (data) {
            if (data.status == 'error') {
                alert('error getting data')
                return;
            }
            $.each(data.data, function (index, param) {
                var host = "https://joesnewbalanceoutlet.com";
                $(".main .container .row")
                .append('<div class="col-md-3">'
                     + "<img src=" + param.imgs + " />" + "<br />"
                     + param.title + "<br /> " 
                     + param.price + "<br />"
                     + param.origPrice + " <br /> "
                     + param.savePrice + "<br />"
                     + "<a href="+ host + param.url  + ">" + "View Details" + "</a>" + "<br />"
                     );
            });
        }, 'json')
            .fail(function () {
                alert('error connect');
            });
    });
    function form(n, arr) {
        n = n % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) return arr[1];
        if (n1 > 1 && n1 < 5) return arr[2];
        if (n1 == 1) return arr[0];
        return arr[1];
    }
});
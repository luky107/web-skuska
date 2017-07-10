/**
 * Created by Lukáš on 2. 7. 2017.
 */
$(document).ready(function () {


    $('#mobile-menu').click(function () {
        $(this).toggleClass('open');
    });
    $('.owl-carousel').owlCarousel({
        'nav': true,
        'items': 1,
        'loop': true,
        'dots': false,
        'mouseDrag': false,
        'pullDrag': false,
        'navContainer': '.banner',
        'navText': []
    });

    $(window).on('resize', function () {
        var max = 0;
        $('.some-height').each(function () {
            if ($(this).height() > max) {
                max = $(this).height();
            }
        }).each(function () {
            $(this).height(max);
        })

    }).resize();
});

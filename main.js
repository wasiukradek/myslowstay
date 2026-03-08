$(document).ready(function() {
    $(window).on('scroll', function() {
        var sloganH2 = $('#header .slogan h2');
        if (sloganH2.length) {
            var h2Offset = sloganH2.offset().top - 30;
            var y = $(window).scrollTop();
            var $navbar = $('#navbar');
            if (y > h2Offset) {
                $navbar.addClass('dark');
            } else {
                $navbar.removeClass('dark');
            }
        }
    });

    function initFeatures() {
        var featuresContent = $('#features-content');
        var featuresItems = featuresContent.find('.feature-text li');
        console.log(featuresItems);
        $(featuresItems).click(function() {
            $(featuresItems).removeClass('selected');
            $(this).addClass('selected');
        });
    }
    // Support multiple photos-gallery components
    $('.photos-gallery').each(function(galleryIndex) {
        var $gallery = $(this);
        var $container = $gallery.find('#photos-swapper-content');
        var $photoItems = $container.find('.photo-item');

        function centerPhotoItem(clickedIndex) {
            $photoItems.each(function(index) {
                $(this).removeClass('highlighted');
            });

            var containerWidth = $container.width();

            var animationDuration = 400; // ms

            var highlightedWidth = 400;
            var defaultWidth = 300;

            // Build widths array
            var widths = [];
            $photoItems.each(function(idx) {
                if (idx === clickedIndex) {
                    widths.push(highlightedWidth);
                } else {
                    widths.push(defaultWidth);
                }
            });

            // Calculate left of the clicked (highlighted) item so it's horizontally centered
            var leftOfClicked = (containerWidth - highlightedWidth) / 2;
            // Walk left from clickedIndex to get left position for the very first item
            var startLeft = leftOfClicked;
            var spacing = 100;
            for (var i = clickedIndex - 1; i >= 0; i--) {
                startLeft -= widths[i] + spacing;
            }
            // Animate all photo-items to new left positions
            var currentLeft = startLeft;
            $photoItems.each(function(idx) {
                var $item = $(this);
                var newWidth = (idx === clickedIndex) ? highlightedWidth : defaultWidth;
                $item.animate({
                    left: currentLeft + 'px',
                    width: newWidth + 'px',
                    height: newWidth + 'px'
                }, animationDuration);
                currentLeft += newWidth + spacing;
            });

            // Highlight the clicked element
            $($photoItems[clickedIndex]).addClass('highlighted');
        }

        // Set initial positions
        var spacing = 100;
        $photoItems.each(function(index) {
            $(this).css({
                left: index * (300 + spacing) + 'px',
                width: '300px',
                height: '300px'
            });
        });

        // Click event for this gallery's photo items
        $photoItems.each(function(itemIndex) {
            $(this).off('click.msslw-gallery').on('click.msslw-gallery', function() {
                centerPhotoItem(itemIndex);
            });
        });

        // Auto-select the second photo-item if exists, otherwise the first
        if ($photoItems.length > 0) {
            var defaultTo = ($photoItems.length > 1) ? 1 : 0;
            centerPhotoItem(defaultTo);
        }
    });

    initFeatures();


    // Replace default input[type="date"] with jQuery UI Datepicker
    $("#start-date, #end-date").attr("type", "text"); // fallback for unsupported browsers

    // Polish localization for jQuery UI Datepicker
    $.datepicker.regional['pl'] = {
        closeText: 'Zamknij',
        prevText: '&#x3C;Poprzedni',
        nextText: 'Następny&#x3E;',
        currentText: 'Dziś',
        monthNames: [
            'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
            'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
        ],
        monthNamesShort: [
            'Sty','Lu','Mar','Kw','Maj','Cze',
            'Lip','Sie','Wrz','Pa','Lis','Gru'
        ],
        dayNames: [
            'Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'
        ],
        dayNamesShort: [
            'Nie','Pn','Wt','Śr','Czw','Pt','So'
        ],
        dayNamesMin: [
            'Nd','Pn','Wt','Śr','Cz','Pt','So'
        ],
        weekHeader: 'Tydz',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['pl']);

    $("#start-date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: '2026-05-01',
        onSelect: function(selectedDate) {
            var date = $(this).datepicker('getDate');
            if(date) {
                var nextDay = new Date(date.getTime());
                nextDay.setDate(date.getDate() + 1);
                $("#end-date").datepicker("option", "minDate", nextDay);
            }
        }
    });
    $("#end-date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 1
    });
});
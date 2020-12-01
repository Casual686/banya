(function() {
    'use strict';

    $('[data-fancybox]').fancybox({
    		loop : true,
        buttons : [
                    'thumbs',
                    'close'
                  ],
        transitionEffect : 'slide',
        transitionDuration : 500,
        clickContent : function( current, event ) {

            if (current.type === 'image') {
                return false;
            }
        }
    });

    var mapContainer = document.getElementById('map');
        if (mapContainer) {

            ymaps.ready(init);
            var myMap,
                  myPlacemark;

            function init(){
                var myMap = new ymaps.Map("map", {
                    center: [56.06521306869719,47.26652949999999],
                    zoom: 14,
                    controls: ['zoomControl',  'routeButtonControl'],
                }),
                HintLayout = ymaps.templateLayoutFactory.createClass(
                    "<div class='my-hint'>" +
                    "<b>{{ properties.object }}</b><br />" +
                    "{{ properties.address }}" +
                    "</div>", {
                            // Определяем метод getShape, который
                            // будет возвращать размеры макета хинта.
                            // Это необходимо для того, чтобы хинт автоматически
                            // сдвигал позицию при выходе за пределы карты.
                            getShape: function () {
                                var el = this.getElement(),
                                    result = null;
                                if (el) {
                                    var firstChild = el.firstChild;
                                    result = new ymaps.shape.Rectangle(
                                        new ymaps.geometry.pixel.Rectangle([
                                            [0, 0],
                                            [firstChild.offsetWidth, firstChild.offsetHeight]
                                        ])
                                    );
                                }
                                return result;
                            }
                        }
                    );


                myPlacemark = new ymaps.Placemark([56.06521306869719,47.26652949999999], {
                    address: "Чебоксары, ул. Зоологическая, 13, стр. 2",
                    object: "Сауна дяди Вани"
                }, {
                        hintLayout: HintLayout,
                        preset: 'islands#redDotIcon'
                    });

                myMap.geoObjects.add(myPlacemark);
            }
        }

})();

$(document).ready(function(){
        $('input').blur();

        eventosGenerales()

        eventosDetail();

        cargarPaises();

        eventosBusqueda();

        eventosFiltro();

        eventosPasos();

        eventosPromociones();


        setTimeout(function(){
            document.addEventListener("deviceready", geoloc(), false);
        },1500);

        var ocultarChrome = obtenerQueryString("ocultar_chrome", 0);
        resizeMap(ocultarChrome);

        if (ocultarChrome) {
            $(".header-content").css("display", "none");
            $(".sec2").css("display", "none");
            $("#googleMap").css("margin-top", 0);
            $(".bloque-filtro").css("padding-bottom", "90px");

        }

        if(document.body.clientWidth>1024){
            setTimeout(function(){
                showPromocionesInicial(ocultarChrome);
            },2000);
        }


});


    if($('.ui-autocomplete').length > 0){
        $('.ui-autocomplete').hide();
    }

    if (isMobile()){
        $('#txHasta').autocomplete({
            source: direcciones,
            appendTo: ".dir",
            minLength: 3,
            position: { my: "left top",at: "left bottom", offset:'0 -278' },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { collision: "flip" }
        });
    }else{
        $('#txHasta').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { my: "left top",at: "left bottom", collision: "flip" },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { my: "left top",at: "left bottom", collision: "flip" }
        });
    }

$(window).on('resize',function(){
    if($('.ui-autocomplete').length > 0){
        $('.ui-autocomplete').hide();
    }

    if (isMobile()){
        $('#txHasta').autocomplete({
            source: direcciones,
            appendTo: ".dir",
            minLength: 3,
            position: { my: "left top",at: "left bottom", offset:'0 -278' },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { collision: "fit" }
        });
    }else{
        $('#txHasta').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { my: "left top",at: "left bottom", collision: "flip" },
            open: function () {
                $(this).data("uiAutocomplete").menu.element.addClass("newAutoComplete");
            }
        })
        $('#txBusqueda').autocomplete({
            source: direcciones,
            minLength: 3,
            appendTo: ".dir",
            position: { my: "left top",at: "left bottom", collision: "flip" }
        });
    }

})
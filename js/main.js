



$(document).ready(function(){

    $("body").mousemove(function (e){
        globalX = e.pageX;
        globalY = e.pageY;
    });

    $('.menu-btn').click(function(e){
        ocultarMenu2();
        ocultarMenu3();

        if($('ul.menu').hasClass('abierto')){
            ocultarMenu1();
        }else{
            $('ul.menu').animate({height:'136px'})
                .addClass('abierto');
        }
        e.stopPropagation();
    });

    eventosDetail();

    cargarPaises();

    eventosBusqueda();

    eventosFiltro();

    eventosPasos();

    eventosPromociones()

    setTimeout(function(){
        geoloc(function(){
            $('#txBusqueda').val(globalPositionStr);
        });
    },1500);

    $(document).click(function(){
        ocultarMenu1();
        ocultarMenu2();
        ocultarMenu3();

    });

    resizeMap();

    setTimeout(function(){
        showPromocionesInicial();
    },2000);
});
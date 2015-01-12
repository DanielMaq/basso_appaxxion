$(document).ready(function(){

        eventosGenerales()

        eventosDetail();

        cargarPaises();

        eventosBusqueda();

        eventosFiltro();

        eventosPasos();

        eventosPromociones();

        document.addEventListener("deviceready", geoloc(), false);
        //setTimeout(function(){
        //
        //},1500);

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
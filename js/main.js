


$(document).ready(function(){


        eventosGenerales()

        eventosDetail();

        cargarPaises();

        eventosBusqueda();

        eventosFiltro();

        eventosPasos();

        eventosPromociones();

        setTimeout(function(){
            geoloc();
        },1500);



        resizeMap();

        if(document.body.clientWidth>1024){
            setTimeout(function(){
                showPromocionesInicial();
            },2000);
        }



});
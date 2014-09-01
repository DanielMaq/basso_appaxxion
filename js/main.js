



function ocultarMenu1(){
    if(document.body.clientWidth<=1024){
        $('ul.menu').animate({height:'0px'})
            .removeClass('abierto');
    }
}

function ocultarMenu2(){
    $('.menu-pais').hide();
    $('.sec1 .pais').removeClass('abierto');
}

function showDetail(id){
   /* $('div.detail-bg').show();


    if(globalX>350){
        $('div.detail').css('left',(globalX-350)+'px')
    }else{
        $('div.detail').css('left',(globalX+30)+'px')
    }

    $('div.detail').show(); */


   /* currentMarkerId=id;


    routeFromGeoToStation(currentMarkerId)*/
}

function hideDetail(){
    $('div.detail').hide();
    $('div.detail-bg').hide();

   // routeFromGeoToStation(currentMarkerId)
}
function buscar(){
    /*var est=getMarkerByNombre($('#txBusqueda').val());
    if(est!=null){
        routeFromGeoToStation(est.theid)
    }else{
        routeFromGeoToDir($('#txBusqueda').val(),function(){
            alert('No encontrado')
        })
    }*/

    if(globalModoBusqueda==1){
        DirToPosition($('#txBusqueda').val(),function(pos){
            if(pos!=null){
                //globalLat=pos.k;
                //globalLon=pos.A;
                actualizarGeolocMarker(pos);
                centerMap(pos);
                //globalPositionStr = $('#txBusqueda').val();
            }else{
                /// mostrar mensaje
                alert('No se encontró la dirección')
            }
        })
    }else{ // globalModoBusqueda == 2
        routeFromDirToDir($('#txDesde').val(),$('#txHasta').val());
    }

}

function comoLlegar(){
    $('#txDesde').show().val(globalPositionStr);
    $('#txHasta').show().focus();
    $('#txBusqueda').hide();
    centerMapCurrentLoc();
    globalModoBusqueda = 2;
}
function miUbicacion(){
    $('#txDesde').hide();
    $('#txHasta').hide();
    $('#txBusqueda').show().val(globalPositionStr);
    centerMapCurrentLoc();
    globalModoBusqueda = 1;
}



var aplicandoFiltro=false;
function filtrar(){
    //Código temporall para testeso de filtro
    aplicandoFiltro = !aplicandoFiltro;
    if(aplicandoFiltro){
        filtros={
            'abierto24hs':true,
            'gnc':false
        }
        filtrarEstaciones();
        alert('Aplicando filtro: Abierto 24 hs ...')
    }else{
        filtros={
            'abierto24hs':true,
            'gnc':true
        }
        filtrarEstaciones();
        alert('Aplicando filtro: TODAS ')
    }

}

$(document).ready(function(){

    $("body").mousemove(function (e){
        globalX = e.pageX;
        globalY = e.pageY;
    });

    $('.menu-btn').click(function(e){
        ocultarMenu2();
        if($('ul.menu').hasClass('abierto')){
            ocultarMenu1();
        }else{
            $('ul.menu').animate({height:'172px'})
                .addClass('abierto');
        }
        e.stopPropagation();
    });

    $('div.detail, div.detail-bg').click(function(){
        hideDetail()
    });

    $('.sec1 .pais').click(function(e){
        ocultarMenu1();
        if($('.sec1 .pais').hasClass('abierto')){
            ocultarMenu2()
        }else{
            $('.menu-pais').show();
            $('.sec1 .pais').addClass('abierto');
        }
        e.stopPropagation();
    });



    cargarPaises();

    geoloc(function(){
        $('#txBusqueda').val(globalPositionStr);
    });


    $('.geo').click(miUbicacion);

    $('.map').click(comoLlegar);

    $('.lupa').click(buscar);
    $('#txBusqueda, #txDesde, #txHasta').keypress(function(e){
        if (e.keyCode == 13) {
            buscar();
            return false;
        }
    });

    $('.filtro').click(filtrar);



    $(document).click(function(){
        ocultarMenu1();
        ocultarMenu2();
    });


    //invalid name call



    resizeMap();


});
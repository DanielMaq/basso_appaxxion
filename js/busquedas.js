
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
    hideDetail();
    hidePromocionesInicial();
}

function comoLlegar(){
    $('#txDesde').show().val(globalPositionStr);
    $('#txHasta').show().val('').focus();
    $('#txBusqueda').hide();
    centerMapCurrentLoc();
    globalModoBusqueda = 2;
    hideDetail()
    hidePromocionesInicial();
}
function miUbicacion(){
    $('#txDesde').hide();
    $('#txHasta').hide();
    $('#txBusqueda').show().val(globalPositionStr);
    centerMapCurrentLoc();
    globalModoBusqueda = 1;
    hideDetail()
    hidePromocionesInicial();
}


function eventosBusqueda(){
    $('.sec1 .pais').click(function(e){
        ocultarMenu1();
        ocultarMenu3();
        hideDetail();
        hidePromocionesInicial();
        if($('.sec1 .pais').hasClass('abierto')){
            ocultarMenu2()
        }else{
            $('.menu-pais').show();
            $('.sec1 .pais').addClass('abierto');
        }

        e.stopPropagation();
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
}
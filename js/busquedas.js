
function alertaDireccionVacia(hasta){
    var tt=$('.sec1 .dir .tooltip');
    tt.css('color','#fff');

    if(hasta)
        tt.addClass('hasta');
    else
        tt.removeClass('hasta');

    tt.show();
    setTimeout(function(){
        tt.css('color','#CD8CAE');
        setTimeout(function(){
            tt.css('color','#fff');
            setTimeout(function(){
                tt.css('color','#CD8CAE');
                setTimeout(function(){
                    tt.css('color','#fff');
                    setTimeout(function(){
                        tt.css('color','#CD8CAE');
                        setTimeout(function(){
                            tt.hide();
                            if( globalModoBusqueda == 1){
                                $('#txBusqueda').focus();
                            }else{
                                if(hasta)
                                    $('#txHasta').focus();
                                else
                                    $('#txDesde').focus();
                            }
                        },250);
                    },300);
                },250);
            },300);
        },250);
    },300);
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
        if($('#txBusqueda').val()==''){
            alertaDireccionVacia(false);
        }else{
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
        }

    }else{ // globalModoBusqueda == 2
        if($('#txDesde').val()==''){
            alertaDireccionVacia(false);
        }else if($('#txHasta').val()==''){
            alertaDireccionVacia(true);
        }else{
            routeFromDirToDir($('#txDesde').val(),$('#txHasta').val());
        }
    }
    hideDetail();
    hidePromocionesInicial();
}

function comoLlegar(){
    if(paisCambiado){
        $('#txDesde').show().val('').focus();
        $('#txHasta').show().val('');
    }else{
        $('#txDesde').show().val(globalPositionStr);
        $('#txHasta').show().val('').focus();
        centerMapCurrentLoc();
    }

    $('#txBusqueda').hide();
    globalModoBusqueda = 2;
    hideDetail()
    hidePromocionesInicial();
}
function miUbicacion(){
    $('#txDesde').hide();
    $('#txHasta').hide();
    $('#txBusqueda').show().val(globalPositionStr);
    cambiarBandera(globalPais);
    alert('aca!');
    //centerMapCurrentLoc();
    //globalModoBusqueda = 1;
    //paisCambiado=false;
    //hideDetail();
    //hidePromocionesInicial();
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
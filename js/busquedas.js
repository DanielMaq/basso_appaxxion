
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
                    alert('No se encontró la dirección');
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
    setTimeout(function(){
        $('.dir').fadeOut(700, function(){
            $('.sec1 .abierto').removeClass('abierto');
        });
    },1000)
}

function comoLlegar(map){
    map = map || false
    if(paisCambiado){
        $('#txDesde').show().val('').focus();
        $('#txHasta').show().val('');
    }else{
        if (map == true){
            $('#txDesde').show().val('').focus();
            $('#txHasta').show().val('');
        }else{
            $('#txDesde').show().val(globalPositionStr);
            $('#txHasta').show().val('').focus();
        }

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
    centerMapCurrentLoc();
    globalModoBusqueda = 1;
    paisCambiado=false;
    hideDetail();
    hidePromocionesInicial();
}


function eventosBusqueda(){
    $('.sec1 .footer-content div').not('.dir').on('click',function(){
        $('.sec1 .dir').hide();
        //setTimeout(function(e){$('.sec1 .footer-content div .tooltip').fadeOut(700);e.stopPropagation()},2000)
    })

   $('.sec1 .pais').click(function(e){
       $('.sec1 .footer-content div').removeClass('abierto');
       $('.sec1 .pais').addClass('abierto');
        ocultarMenu1();
        ocultarMenu3();
        hideDetail();
        hidePromocionesInicial();
        if ($('.menu-pais').is(':visible')){
            $('.menu-pais').hide();
            $('.sec1 .pais').removeClass('abierto');
        }else{
            $('.menu-pais').show();
        }
        e.stopPropagation();
    });

    $('.geo').on('click', function(){
        if($(this).hasClass('abierto')){
            $('.sec1 .dir').hide();
            $(this).removeClass('abierto');
        }else{
            $('.sec1 .footer-content div').removeClass('abierto');
            $(this).addClass('abierto');
            var $inputsBar = $('.sec1 .dir:hidden');
            if ( $inputsBar.length ){
                $inputsBar.fadeIn();
            }
            miUbicacion();
        }
        directionsDisplay.setMap(null);
    });

    $('.map').on('click', function(){
        if($(this).hasClass('abierto')){
            $('.sec1 .dir').hide();
            $(this).removeClass('abierto');
        }else{
            $('.sec1 .footer-content div').removeClass('abierto');
            $(this).addClass('abierto');
            $('#txDesde').val('');
            var $inputsBar = $('.sec1 .dir');
            $inputsBar.fadeIn();
            var map = true
            comoLlegar(map);
        }
    });

    $('.lupa').on('click', function(){
        if($(this).hasClass('abierto')){
            $(this).removeClass('abierto');
            $('.sec1 .dir').hide();
        }else{
            $('.sec1 .footer-content div').removeClass('abierto');
            $(this).addClass('abierto')
            var $inputsBar = $('.sec1 .dir:hidden');
            $inputsBar.fadeIn();
            $('#txDesde,#txHasta').hide();
            $('#txBusqueda').fadeIn();
            $('#txBusqueda').val('').attr('placeholder','Ingrese ubicación a buscar').focus()
            //buscar();
        }
    });

    $('#txBusqueda, #txDesde, #txHasta').keypress(function(e){
        if (e.keyCode == 13) {
            buscar();
            return false;
        }
    });
}
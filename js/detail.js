var currentMarkerId;
function showDetail(idEstacion){
    //pasosCerrar();
    $('div.detail-bg').show();

    pasosOcultar();
    /*if(globalX>350){
     $('div.detail').css('left',(globalX-350)+'px')
     }else{
     $('div.detail').css('left',(globalX+30)+'px')
     }
     */


    $('div.detail').show();

    $('.detail .titulo1').html(Estaciones[idEstacion].direccion1);
    $('.detail .titulo2').html(Estaciones[idEstacion].direccion2);
    if(Estaciones[idEstacion].tipo=='axion'){
        $('.detail .tipo').attr('src','img/logo_axion.png');
    }else{
        $('.detail .tipo').attr('src','img/logo_esso.png');
    }


    $('.detail .estado').html(Estaciones[idEstacion].estado);
    $('.detail .distancia').html('Distancia: '+Estaciones[idEstacion].distancia);
    $('.detail .tel').html('Tel. '+Estaciones[idEstacion].telf);

    var web = Estaciones[idEstacion].web;
    if (web == "#") {
        web = "";
    }

    $('.detail .web').html(web);

    var resCombustibles="";
    var resServicios="";
    $.each(Estaciones[idEstacion].propiedades,function(index,value){
        if(value){
            if(filtros[index].tipo=='combustible'){
                resCombustibles += '<div><img src="'+filtros[index].icon2+'" /><span>'+filtros[index].nombre+'</span></div>';
            }
            if(filtros[index].tipo=='servicio'){
                resServicios += '<div><img src="'+filtros[index].icon2+'" /><span>'+filtros[index].nombre+'</span></div>';
            }
        }
    });

    $('.detail .combustibles').html(resCombustibles);
    $('.detail .servicios').html(resServicios);
    // $('.detail .promocion').html('');


    currentMarkerId=idEstacion;
    // routeFromGeoToStation(currentMarkerId)

    //pasosCerrar();
}

function hideDetail(){
    $('div.detail').hide();
    $('div.detail-bg').hide();

    pasosMostrar();

}

function eventosDetail(){

    $('div.detail-bg').click(function(){
        hideDetail()
        hidePromocionesInicial()
    });

    $('.detail a.cerrar').click(function(){ hideDetail() })

    $('.detail a.comollegar').click(function(){
        routeFromGeoToStation(currentMarkerId)
        hideDetail();
    })

}

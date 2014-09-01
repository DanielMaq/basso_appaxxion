var Paises={
    0:{
        nombre:'Argentina', abreviatura:'Arg.', lat:-34.639507, lon: -58.4910882
    },
    1:{
        nombre:'Paraguay', abreviatura:'Par.', lat:-25.3062274, lon: -57.5957806
    },
    2:{
        nombre:'Uruguay', abreviatura:'Uru.', lat:-34.8767092, lon: -56.1424982
    },
    3:{
        nombre:'Bolivia', abreviatura:'Bol.', lat:-17.7865961, lon: -63.1783028
    }
}
var paisActual='Argentina';

function cargarPaises(){
    var res="";
    var i=0;

    $.each(Paises, function(index, value) {
        res+= '<div data-value="'+value.nombre+'">'+value.nombre+'</div>';
        i++;
    });

    $('.menu-pais').html(res)
        .css('margin-top','-'+(i*59)+'px')
        .css('height',(i*59)+'px');

    $('.menu-pais div').click(function(){
        $('.menu-pais div').removeClass('selected');
        $(this).addClass('selected');
        $('.sec1 .pais').html($(this).html());
        paisActual = $(this).attr('data-value');



        //Regirigir mapa
        for (var i=0; i<4; i++){
            if(Paises[i].nombre==paisActual){
                centerMap(new google.maps.LatLng(Paises[i].lat,Paises[i].lon));
            }

        }


    });

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Estaciones={
    0:{
        nombre:'Estacion 1',
        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            abierto24hs:true,
            gnc:true
        },
        visible:false
    },
    1:{
        nombre:'Estacion 1',
        lat:0,
        lon:0,
        tipo:'esso',
        propiedades:{
            abierto24hs:false,
            gnc:true
        },
        visible:false
    },
    2:{
        nombre:'Estacion 1',
        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            abierto24hs:false,
            gnc:true
        },
        visible:false
    },
    3:{
        nombre:'Estacion 1',
        lat:0,
        lon:0,
        tipo:'esso',
        propiedades:{
            abierto24hs:true,
            gnc:true
        },
        visible:false
    },
    4:{
        nombre:'Estacion 1',
        lat:0,
        lon:0,
        tipo:'axion',
        propiedades:{
            abierto24hs:true,
            gnc:false
        },
        visible:false
    }

};

var filtros={
    'abierto24hs':true,
    'gnc':false
}



var globalX,globalY;

var globalLat,globalLon;

var globalPositionStr="Ubicacion inicial (texto de prueba)";
var globalModoBusqueda=1;

function estacionesAleatorias(){
    Estaciones[0].nombre='Molina';
    Estaciones[1].nombre='Alameda';
    Estaciones[2].nombre='Gota fria';
    Estaciones[3].nombre='Grigota';
    Estaciones[4].nombre='Mataral';

    var a1 = rnd(-0.015,0.015),a2 = rnd(-0.015,0.015),a3 = rnd(-0.015,0.015),a4 = rnd(-0.015,0.015),a5 = rnd(-0.01,0.01);
    var b1 = rnd(-0.015,0.015),b2 = rnd(-0.015,0.015),b3 = rnd(-0.015,0.015),b4 = rnd(-0.015,0.015),b5 = rnd(-0.01,0.01);

    Estaciones[0].lat=globalLat+a1;
    Estaciones[0].lon=globalLon+b1;
    Estaciones[1].lat=globalLat+a2;
    Estaciones[1].lon=globalLon+b2;
    Estaciones[2].lat=globalLat+a3;
    Estaciones[2].lon=globalLon+b3;
    Estaciones[3].lat=globalLat+a4;
    Estaciones[3].lon=globalLon+b4;
    Estaciones[4].lat=globalLat+a5;
    Estaciones[4].lon=globalLon+b5;
}


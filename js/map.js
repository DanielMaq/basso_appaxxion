


///////////////////////////////////

function rnd(min,max){
    p = max - min;
    aleat = Math.random() * p;
    return min + aleat;
}

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};

////////////////////////////////////////////////



var map;
var geocoder= new google.maps.Geocoder();
var directionsDisplay;
var directionsService;
/*var currentMarkerId;*/

function initializeMap() {

    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsService = new google.maps.DirectionsService();
    var pos1 = new google.maps.LatLng(-34.639507,-58.4910882 );
    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    var mapProp = {
        center: pos1,
        zoom:14,
        zoomControl:true,
        /* streetViewControl:false,*/
        /*mapTypeControlOptions: { mapTypeIds: []},*/
        mapTypeId:google.maps.MapTypeId.ROADMAP  /*,
        styles: myStyles*/
    };
    map=new google.maps.Map(document.getElementById("googleMap") ,mapProp);
    directionsDisplay.setMap(map);


    google.maps.event.addListener(map, 'click', function(event) {

    });

}

google.maps.event.addDomListener(window, 'load', initializeMap);

var myIconAxion = new google.maps.MarkerImage( 'img/marker_axion.png', null, null, null, new google.maps.Size(33,34));
var myIconEsso = new google.maps.MarkerImage( 'img/marker_esso.png', null, null, null, new google.maps.Size(44,37));

var myIconGeo = new google.maps.MarkerImage( 'img/geoloc.png', null, null,new google.maps.Point(57, 57), new google.maps.Size(114,114));

var geoMarker = null;

function centerMap(pos/*lat,lon*/){
    map.panTo(pos/*new google.maps.LatLng(lat,lon)*/);
}


/*var markers={};
var cantMarkers=-1;


function newMarker(theid,nombre,Latitude,Longitude){
    cantMarkers++;
    markers[cantMarkers] = new google.maps.Marker({
        position: new google.maps.LatLng(Latitude, Longitude),
        map: map, icon:myIcon
    });
    markers[cantMarkers].theid=theid;
    markers[cantMarkers].estNombre=nombre;


}*/

function dibujarEstaciones(){
    for(var i=0;i<5;i++){ //CantEstaciones
        //newMarker(i,Estaciones[i].nombre,Estaciones[i].lat,Estaciones[i].lon)

        var icon;
        if(Estaciones[i].tipo=='esso'){
            icon=myIconEsso;
        }else{
            icon=myIconAxion;
        }

        Estaciones[i].marker = new google.maps.Marker({
            position: new google.maps.LatLng(Estaciones[i].lat, Estaciones[i].lon),
            map: map, icon:icon
        });
        Estaciones[i].marker.idEstacion=i;

        google.maps.event.addListener(Estaciones[i].marker, 'click', function() {
             //var theid=this.theid;
             showDetail(this.idEstacion);
        });
    }

}

function filtrarEstaciones(){
    for(var i=0;i<5;i++){ //CantEstaciones
        Estaciones[i].visible=false;
    }
    for(var i=0;i<5;i++){ //CantEstaciones
        $.each(filtros, function(index, filtro) {
            if((Estaciones[i].propiedades[index] && filtro.valor && true ) || Estaciones[i].visible){
                Estaciones[i].marker.setMap(map);
                Estaciones[i].visible=true;
            }else{
                Estaciones[i].marker.setMap(null);
                Estaciones[i].visible=false;
            }
        });

        /**/
    }
}
/*function getMarker(id){
    for(var i=0;i<=cantMarkers;i++){
        if(markers[i].theid==id)
            return markers[i];
    }
    return null;
}
function getMarkerByNombre(nombre){
    for(var i=0;i<=cantMarkers;i++){
        if(markers[i].estNombre.toUpperCase().contains(nombre.toUpperCase()))
            return markers[i];
    }
    return null;
}*/

function actualizarGeolocMarker (pos/*latitude, longitude*/){
    //var pos = new google.maps.LatLng(latitude, longitude);

    if(geoMarker==null){
        geoMarker = new google.maps.Marker({
            position: pos,
            map: map, icon:myIconGeo
        });
    }else{
        geoMarker.setPosition(pos);
    }
}

function centerMapCurrentLoc(){
    actualizarGeolocMarker(new google.maps.LatLng(globalLat,globalLon));
    centerMap(new google.maps.LatLng(globalLat,globalLon));
    limpiarRuta();
}

function geoloc(callback){
    navigator.geolocation.getCurrentPosition(
        function onSuccess(position) {
            globalLat = position.coords.latitude;
            globalLon = position.coords.longitude;
            actualizarGeolocMarker(new google.maps.LatLng(globalLat,globalLon));
            centerMap(new google.maps.LatLng(globalLat,globalLon));

            PositionToDir(new google.maps.LatLng(globalLat,globalLon),function(dir){
                estacionesAleatorias();
                dibujarEstaciones();
                globalPositionStr=dir;
                callback();
            });



        },function onError(error) {
            //console.log(error)
        }
    );
}


/////////////////////////////////////////////////////////////////////////////

//var routeMarkerArray = [];

var mostrandoRuta=false;

function calcRoute(start,end) {

    var request = {
        origin: start,
        destination: end,

        /*waypoints: waypts,
        optimizeWaypoints: true,*/

        travelMode: google.maps.TravelMode.DRIVING
    };

    //var currentZoom=map.getZoom();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);

           //map.setZoom(currentZoom);
            mostrandoRuta=true;
            cargarPasos(response.routes[0].legs[0])
        }
    });

}
function limpiarRuta(){
    directionsDisplay.setMap(null);
    mostrandoRuta=false;
    pasosOcultar();
}
function routeFromGeoToStation(stationId){
    var directionFrom =geoMarker.getPosition() ; // new google.maps.LatLng(p[2],p[3]);
    var directionTo = Estaciones[stationId].marker.getPosition(); //getMarker(stationId).getPosition();
    calcRoute(directionFrom,directionTo);
}

function PositionToDir(latlng,callback){
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                callback(results[1].formatted_address)
            } else {
                alert('No se encuentra');
            }
        } else {
            alert('Error: ' + status);
        }
    });
}

function DirToPosition(dir,callBack){
    var address = paisActual + ', ' + dir;
    geocoder.geocode( {"address":address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
            callBack(results[0].geometry.location);
        } else {
            callBack(null);
        }
    });
}

/*function routeFromGeoToDir(direction,errorCallback){
    var address = paisActual + ', ' + direction;
    geocoder.geocode( {"address":address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
            //map.setCenter(results[0].geometry.location);//center the map over the result

            var directionFrom = geoMarker.getPosition();// getMarker(stationId).getPosition(); // new google.maps.LatLng(p[2],p[3]);
            var directionTo = results[0].geometry.location;
            calcRoute(directionFrom,directionTo);

        } else {
            errorCallback();
        }
    });
}*/
function routeFromDirToDir(dir1,dir2){
    DirToPosition(dir1,function(pos1){
        if(pos1!=null){
            /*globalLat=pos1.k;
            globalLon=pos1.A;
            updateGeolocMarker(globalLat, globalLon);
            globalPositionStr = $('#txDesde').val();*/

            DirToPosition(dir2,function(pos2){
                if(pos2!=null){
                    calcRoute(pos1,pos2);
                }else{
                    //no se encuentra dir 2
                    /*centerMap(pos1.k,pos1.A);
                    limpiarRuta();*/
                    alert('no se encuentra direccion 2')
                }
            })
        }else{
            //no se encuentra dir 1
            alert('no se encuentra direccion 1')
        }
    })
}




/////////////////////////////////////////////////////////////////////////////////

function resizeMap(){
    $('#container').height(document.body.clientHeight);

    if(document.body.clientWidth>1024)
        $('#googleMap').height(document.body.clientHeight-169);
    else
        $('#googleMap').height(document.body.clientHeight-60);

    $('#container').width(document.body.clientWidth);
    $('#googleMap').width(document.body.clientWidth);


    ////////////////////////////////////////////////////////////////////////////
    $('div.detail-bg').height(document.body.clientHeight-175);

     /* $('div.detail').height(document.body.clientHeight-303);
    var h=$('div.detail').height();
    if(h>480){
        $('div.detail').css('top',75+((h-480)/2)+'px');
        $('div.detail').height(480);
    }else{
        $('div.detail').css('top','75px');
    }*/

    //////////////////////////////////////////////

    if(document.body.clientWidth>1024){
        $.each(Paises, function(index, value) {

            $($('.menu-pais').children()[index]).html('<img src="'+value.icon+'" />'+value.nombre)
        });
        $('.sec1 .pais ').html('<img src="'+$('img',$('.menu-pais div.selected')).attr('src')+'" />' /*+ $('.menu-pais div.selected').html()*/ );
        //$('.sec1 .pais img').show();
    }else{
        $.each(Paises, function(index, value) {
            $($('.menu-pais').children()[index]).html(value.abreviatura)
        });
        $('.sec1 .pais').html($('.menu-pais div.selected').html());

    };

    //$('.sec1 .pais img').attr('src',$('img',this).attr('src'));
    ///////////////////////////////////////////////////////////////////////////

}
$(window).resize(function() {
    resizeMap()
});




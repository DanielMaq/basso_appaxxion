
var alturaModalPasos;

function eventosPasos(){
    $('.pasos .encabezado').click(function(){
        if($(this).hasClass('closed')){
            $('.pasos').animate({height:alturaModalPasos});
            $(this).removeClass('closed');
        }else{
            $('.pasos').animate({height:$(this).height()+38});
            $(this).addClass('closed');
        }
    });
}
function pasosMostrar(){
    if(mostrandoRuta)
        $('.pasos').show()
}
function pasosOcultar(){
    $('.pasos').hide()
}

function pasosAbrir(){
    //if($('.pasos .encabezado').hasClass('closed')){
        $('.pasos').css('height','auto');
        $('.pasos .encabezado').removeClass('closed');
    //}
}
function pasosCerrar(){
    if( $('.pasos .encabezado').is(':visible')){
        if( ! $('.pasos .encabezado').hasClass('closed') ){
            $('.pasos').animate('height',$('.pasos .encabezado').height()+38);
            $('.pasos .encabezado').addClass('closed');
        }
    }

}

function pasosTitulo(titulo){
    $('.pasos .encabezado .titulo').html(titulo);
}

function pasosRecorrido(recorrido){
    $('.pasos .encabezado .recorrido').html(recorrido);
}

function pasosLimpiar(){
    $('.pasos .lista').html('<div></div>');
}

function pasosAgregar(num,texto,tipo){
    var res='<div class="item">';
    res += '<img src="img/step-'+tipo+'.png" />';
    res += '<span>'+num+'.</span>';
    res += '<div>'+texto+'</div>';
    res += '</div>';
    $('.pasos .lista > div').append(res);
}

function pasosDestino(destino){
    $('.pasos .pie .titulo').html(destino);


    if($('.pasos').height()>418){
        $('.pasos .lista > div').slimScroll({
            color: '#9E1F64',
            size: '5px',
            height: 218 ,
            alwaysVisible: true /*,
             railVisible: true,
             railColor: '#222',
             railOpacity: 0.9*/
        });
    }
    alturaModalPasos=$('.pasos').height();

}

function cargarPasos(myRoute){
    //cargarPasos(response.routes[0].legs[0],directionType);


    pasosAbrir();

    pasosMostrar();
    pasosTitulo(myRoute.start_address);
    pasosRecorrido('Recorrido '+myRoute.distance.text+', '+myRoute.duration.text);
    pasosLimpiar();

    for (var i = 0; i<myRoute.steps.length; i++) {

        var ins=myRoute.steps[i].instructions;

        if(ins.contains('<b>izquierda</b>') || ins.contains('<b>noroeste</b>') || ins.contains('<b>suroeste</b>')){
            pasosAgregar(i+1,ins,'left');
        }else if(ins.contains('<b>derecha</b>') || ins.contains('<b>noreste</b>') || ins.contains('<b>sureste</b>')){
            pasosAgregar(i+1,ins,'right');
        }else{
            pasosAgregar(i+1,ins,'go');
        }

    }
    pasosDestino(myRoute.end_address);
    //pasosAbrir();
}

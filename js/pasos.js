
var alturaModalPasos;

function eventosPasos(){
    $('.pasos .encabezado').click(function(){
        if($(this).hasClass('closed')){
            $('.pasos').animate({height:alturaModalPasos},function(){/*$('#googleMap').hide();*/});
            $(this).removeClass('closed');


        }else{
            $('.pasos').animate({height:$(this).height()+38});
            $(this).addClass('closed');

            //$('#googleMap').show();
        }
    });

    $('.printer').click(pasosImprimir);
}
function pasosMostrar(){
    if(mostrandoRuta){
        $('.pasos').show();
        if(isMobile()){
            //$('#googleMap').hide();
            $('#container').css('background-color','#fff');
        }
    }
}

function pasosOcultar(){
    $('.pasos').hide();
    //$('#googleMap').show();
}

function pasosAbrir(){
    //if($('.pasos .encabezado').hasClass('closed')){
        $('.pasos').css('height','auto');
        $('.pasos .encabezado').removeClass('closed');

    //$('#googleMap').hide();

    //}
}
function pasosCerrar(){
    if( $('.pasos .encabezado').is(':visible')){
        if( ! $('.pasos .encabezado').hasClass('closed') ){
            $('.pasos').animate({height:$('.pasos .encabezado').height()+38});
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
        if(!isMobile()){
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

function pasosImprimir(){
    var html=$('div.lista').html();

    var ventimp = window.open(' ','popimpr');
    ventimp.document.write(html);

    $('.slimScrollDiv',ventimp.document).css('height','auto');
    $('.slimScrollDiv > div',ventimp.document).css('height','auto');

    ventimp.document.close();
    ventimp.print();
    ventimp.close();
}



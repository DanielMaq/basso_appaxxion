function ocultarMenu1(){ //Menu header
    if(document.body.clientWidth<=1024){
        $('ul.menu').animate({height:'0px'})
            .removeClass('abierto');
    }
}
function ocultarMenu3(){ //Menu filtros
    $('.bloque-filtro').hide();
    $('.sec1 .filtro').removeClass('abierto');
}


function ocultarMenu2(){ //Menu paises
    $('.menu-pais').hide();
    $('.sec1 .pais').removeClass('abierto');
}

function eventosGenerales(){
    $("body").mousemove(function (e){
        globalX = e.pageX;
        globalY = e.pageY;
    });

    $('.menu-btn').click(function(e){
        ocultarMenu2();
        ocultarMenu3();

        if($('ul.menu').hasClass('abierto')){
            ocultarMenu1();
        }else{
            $('ul.menu').animate({height:'136px'})
                .addClass('abierto');
        }
        e.stopPropagation();
    });

    $(document).click(function(){
        ocultarMenu1();
        ocultarMenu2();
        ocultarMenu3();

    });

}




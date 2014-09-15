function ocultarMenu1(){ //Menu header
    if(document.body.clientWidth<=1024){
        $('ul.menu').animate({height:'0px'})
            .removeClass('abierto');
    }
}

function ocultarMenu2(){ //Menu paises
    $('.menu-pais').hide();
    $('.sec1 .pais').removeClass('abierto');
}






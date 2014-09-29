function rnd(min,max){
    p = max - min;
    aleat = Math.random() * p;
    return min + aleat;
}

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};

function isMobile(){
    return document.body.clientWidth<=1024;
}


function ocultarMenu1(){ //Menu header
    if(isMobile()){
        $('ul.menu').animate({height:'0px'})
            .removeClass('abierto');
    }
}
function ocultarMenu3(){ //Menu filtros
    $('.bf-container').hide();
    $('.sec1 .filtro').removeClass('abierto');
    $('#googleMap').show();
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
        //hideDetail();
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




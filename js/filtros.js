
function cargarFiltros(){
    var res="";

    $.each(filtros, function(index, filtro) {
        res += '<div data-checked="1" data-filtro="'+index+'"><img src="'+filtro.icon+'" />'+filtro.nombre+'</div>';
    });

    $('.bf-items').html(res);

    $('.bf-items div').click(function(e){
        if($(this).attr('data-checked')=="1"){
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
            $('.bf-todos').css('background-image','url(img/unchecked.png)').attr('data-checked','0');
        }else{
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');

        }

        e.stopPropagation();
    })
}

function actualizarFiltros(){
    $('.bf-items div').each(function(){
        if(filtros[$(this).attr('data-filtro')].valor){
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');
        }else{
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
        }
    });
}

function filtrar(){
    $('.bf-items div').each(function(){
        if($(this).attr('data-checked')=="1"){
            filtros[$(this).attr('data-filtro')].valor=true;
        }else{
            filtros[$(this).attr('data-filtro')].valor=false;
        }
    });
    filtrarEstaciones();
    ocultarMenu3();
}

function eventosFiltro(){
    cargarFiltros()

    $('.filtro').click(function(e){
        ocultarMenu1();
        ocultarMenu2();
        hideDetail();
        hidePromocionesInicial();

        if($(this).hasClass('abierto')){
            ocultarMenu3()
        }else{
            $('.bloque-filtro').show();
            $(this).addClass('abierto');
            actualizarFiltros();
        }
        e.stopPropagation();
    });

    $('.bloque-filtro').click(function(e){ e.stopPropagation() } );

    $(' .bloque-filtro a.ok').click( filtrar);

    $(' a.cancel').click(function(e){
        ocultarMenu3()
    } );

    $('.bf-todos').click(function(e){
        if($(this).attr('data-checked')=="1"){
            $(this).css('background-image','url(img/unchecked.png)');
            $(this).attr('data-checked','0');
            $('.bf-items div')
                .css('background-image','url(img/unchecked.png)')
                .attr('data-checked','0');
        }else{
            $(this).css('background-image','url(img/checked.png)');
            $(this).attr('data-checked','1');
            $('.bf-items div')
                .css('background-image','url(img/checked.png)')
                .attr('data-checked','1');
        }

        e.stopPropagation();
    });
}
function showPromocionesInicial(ocultarChrome){
    if (typeof ocultarChrome == "undefined") {
        ocultarChrome = false;
    }

    if (ocultarChrome) {
        return;
    }

    $('div.detail-bg').show();
    $('div.promociones').show();
}

function hidePromocionesInicial(){
    $('div.promociones').hide();
    $('div.detail-bg').hide();
}

function eventosPromociones(){
    $('.promociones a.cerrar').click(function(){ hidePromocionesInicial() })
}

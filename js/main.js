$(document).ready(function(){

    //Animação do filtro de preço
    var currentValue = 0;
    var isDrag = false;
    var precoMax = 70000;
    var precoAtul = 0;

    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    })

    $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    })

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection();
            var elementoBase = $(this)
            var mouseX = e.pageX - elementoBase.offset().left;

            if(mouseX < 0)
                mouseX = 0;
            if(mouseX > elementoBase.width())
                mouseX = elementoBase.width();

            $('.pointer-barra').css('left', mouseX + 'px')
            currentValue = (mouseX / elementoBase.width()) * 100;
            $('.barra-preco-fill').css('width', currentValue+'%')

            precoAtul = (currentValue / 100) * precoMax
            precoAtul = formatarPreco(precoAtul)
            $('.preco_pesquisa').html('R$' + precoAtul);
        }
    })

    //Formatação dos preços
    function formatarPreco(precoAtul){
        precoAtul = precoAtul.toFixed(2);
        precoArr = precoAtul.split('.');

        var novoPreco = formatarTotal(precoArr);
        return novoPreco;
    }

    function formatarTotal(precoArr) {
        if(precoArr[0] < 1000){
            return precoArr[0] + ',' + precoArr[1]
        }else if(precoArr[0] < 10000){
            return precoArr[0][0] + '.' + precoArr[0].substr(1, precoArr[0].length) + ',' + precoArr[1];
        }else{
            return precoArr[0][0] + precoArr[0][1] + '.' + precoArr[0].substr(2, precoArr[0].length) + ',' + precoArr[1]
        }
    }



    function disableTextSelection(){
        $('body').css('user-select', 'none');
        $('body').css('-o-user-select', 'none')
        $('body').css('-webkit-user-select', 'none');
        $('body').css('-ms-user-select', 'none');
        $('body').css('-moz-user-select', 'none');
    }

    function enableTextSelection(){
        $('body').css('user-select', 'auto');
        $('body').css('-o-user-select', 'auto')
        $('body').css('-webkit-user-select', 'auto');
        $('body').css('-ms-user-select', 'auto');
        $('body').css('-moz-user-select', 'auto');
    }

    //Slider dos veiculos
    initSlider();
    navigateSlider();
    clickSlider();

    var maxIndex = Math.ceil($('.box-mini-img').length / 3) - 1;
    var curIndex = 0;

    function initSlider(){
        var amt = $('.box-mini-img').length * (100 / 3);
        var elScroll = $('.nav-galeria');
        var elSingle = $('.box-mini-img');
        elScroll.css('width', amt + '%');
        elSingle.css('width', (100 / 3) * (100 / amt) + '%');
    }

    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex){
                curIndex++;
                var elOff = $('.box-mini-img').eq(curIndex * 3).offset().left - $('.nav-galeria').offset().left;
                $('.box-nav').animate({
                    scrollLeft: elOff + 'px'
                })
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.box-mini-img').eq(curIndex * 3).offset().left - $('.nav-galeria').offset().left;
                $('.box-nav').animate({
                    scrollLeft: elOff + 'px'
                })
            }
        });
    }

    function clickSlider() {
        $('.box-mini-img').click(function(){
            $('.box-mini-img').css('background-color', 'white');
            $(this).css('background-color', 'black');
            var img = $(this).find('div').css('background-image');
            $('.foto-destaque').css('background-image', img)
        })

        $('.box-mini-img').eq(0).click();
    }

    $('[go=contato]').click(function(){
        $('#menu a').css('color', 'black');
        $(this).css('color', '#EB2D2D')
        $('html, body').animate({
            scrollTop: $('section#contato').offset().top
        })
        return false;
    })

    $('[go=home]').click(function(){
        $('#menu a').css('color', 'black');
        $(this).css('color', '#EB2D2D');
        $('html, body').animate({
            scrollTop: $('header').offset().top
        })
        return false;
    })

    if($('body').css('width').split("").filter(n => (Number(n) || n == 0)).join("") <= 820){
        $('#btn-mobile').click(function(){
            $('#hamburguer').toggleClass('active')
            $('#menu').stop().slideToggle();
        })
    }

    $('#menu li a').click(function(){
        $('#menu').stop().slideToggle();
        $('#hamburguer').toggleClass('active')
    })

    $(window).resize(function(){
        document.location.reload(true);
    })

    //Sistema de navegação

    navSlider();
    initDepoimentos();

    var amountDepoimentos = $('.box-depoimentos-single p').length;
    var indiceindex = 0

    function navSlider(){
        $('[next]').click(function(){
            indiceindex++;
            if(indiceindex >= amountDepoimentos)
                indiceindex = 0;
            $('.box-depoimentos-single p').hide();
            $('.box-depoimentos-single p').eq(indiceindex).fadeIn();
        })

        $('[prev]').click(function(){
            indiceindex--;
            if(indiceindex < 0)
                indiceindex = amountDepoimentos - 1;
            $('.box-depoimentos-single p').hide();
            $('.box-depoimentos-single p').eq(indiceindex).fadeIn();
        })
    }

    function initDepoimentos(){
        $('.box-depoimentos-single p').hide();
        $('.box-depoimentos-single p').eq(0).show();
    }
})
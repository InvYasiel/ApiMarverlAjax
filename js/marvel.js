/**
 * Comenzamos la aplicación haciendo tres consultas Ajax  y guardando dichas consultas en localStorage
 * @param  {} localStorage.getItem('marvelHeroes'
 * @param  {} ;if(localStorageMarvelHeroes==null
 * @param  {"https:beforeSend:function(} {$.ajax({url
 */
var localStorageMarvelHeroes = JSON.parse(localStorage.getItem('marvelHeroes'));
///Guardar en LocalStorage Los Heroes, que recogemos en la siguiente petición ajax
if (localStorageMarvelHeroes == null) {
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=413412e6bf46569e937dcd69e8869275",
        beforeSend: function () {
            $('#spinner').show();
        },
        success: function (data) {
            localStorageMarvelHeroes = data.data.results;
            localStorage.setItem("marvelHeroes", JSON.stringify(localStorageMarvelHeroes));
        },
        dataType: "json",
        complete: function () {
            $('#spinner').hide();
        }
    });
}

var localStorageMarvelComics = JSON.parse(localStorage.getItem('marvelComics'));
///Guardar en LocalStorage los comics, que recogemos en la siguiente petición ajax
if (localStorageMarvelComics == null) {
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=413412e6bf46569e937dcd69e8869275",
        beforeSend: function () {
            $('#spinner').show();
        },
        success: function (data) {
            localStorageMarvelComics = data.data.results
            localStorage.setItem("marvelComics", JSON.stringify(localStorageMarvelComics));
        },
        dataType: "json",
        complete: function () {
            $('#spinner').hide();
        }
    });
}

var localStorageMarvelSeries = JSON.parse(localStorage.getItem('marvelSeries'));
///Guardar en LocalStorage las series, que recogemos en la siguiente petición ajax
if (localStorageMarvelSeries == null) {
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/series?limit=100&apikey=413412e6bf46569e937dcd69e8869275",
        beforeSend: function () {
            $('#spinner').show();
        },
        success: function (data) {
            localStorageMarvelSeries = data.data.results
            localStorage.setItem("marvelSeries", JSON.stringify(localStorageMarvelSeries));
        },
        dataType: "json",
        complete: function () {
            $('#spinner').hide();
        }
    });
}
///Mostramos en la consola lo guardado en LocalStorage
console.log(localStorageMarvelHeroes);
console.log(localStorageMarvelComics);
console.log(localStorageMarvelSeries);


var contenedorSeries = document.getElementsByClassName('contenedor-series')[0]
var contenedorHeroes = document.getElementsByClassName('contenedor-heroes')[0];
var contenedorComics = document.getElementsByClassName('contenedor-comics')[0];
/**
 * Cargamos las series dinamicamente según la cantidad del array en localStorage
 * @param  {none;'contenedorHeroes.style='display:none;'contenedorSeries.style='display:flex;'contenedorSeries.innerHTML='';for(leti=0;i<localStorageMarvelSeries.length;i++} {contenedorComics.style='display
 */
function cargarSeries() {
    ///Dejamos de mostrar los otros contenedores y limpiamos el contenedor de series(se repite igual en los heroes como en los comics)
    contenedorComics.style = 'display: none;'
    contenedorHeroes.style = 'display: none;'
    contenedorSeries.style = 'display: flex; '
    contenedorSeries.innerHTML = '';
    ///For que genera las cartas automáticamente con una condición para no mostrar los elementos que no dispongan de una imagen (se repite tanto en los heroes como en los comics)
    for (let i = 0; i < localStorageMarvelSeries.length; i++) {
        if (localStorageMarvelSeries[i].thumbnail.path.indexOf('image_not_available') == -1 && localStorageMarvelSeries[i].thumbnail.path.indexOf('4c002e0305708') == -1) {
            var card = document.createElement('div');
            card.setAttribute('class', 'card2');
            card.setAttribute('id', 'card');

            var img = document.createElement('img');
            img.setAttribute('src', localStorageMarvelSeries[i].thumbnail.path + '.' + localStorageMarvelSeries[i].thumbnail.extension);
            img.setAttribute('class', 'card-img-top');
            img.setAttribute('alt', localStorageMarvelSeries[i].title);
            card.appendChild(img);

            var cardbody = document.createElement('div');
            cardbody.setAttribute('class', 'card-body');
            card.appendChild(cardbody);

            var h5 = document.createElement('h5');
            h5.setAttribute('class', 'card-title');
            h5.innerHTML = localStorageMarvelSeries[i].title;
            cardbody.appendChild(h5);

            var p = document.createElement('p');
            p.setAttribute('class', 'card-text more');
            p.innerHTML = localStorageMarvelSeries[i].description;
            cardbody.appendChild(p);

            var divBtn = document.createElement('div')
            divBtn.setAttribute('class', 'text-center')
            cardbody.appendChild(divBtn);
            ///este botón carga un modal con un formulario que está en el html (se hace lo mismo en comics como en héroes)
            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-primary');
            btn.setAttribute('data-toggle', 'modal');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('data-target', '#ModalSeries');
            btn.innerHTML = 'VOTAR';
            btn.addEventListener('click', function () {
                var input = document.getElementById('Series');
                input.value = localStorageMarvelSeries[i].title;

                var hidden = document.getElementById('idSeries');
                hidden.setAttribute('id-Series', localStorageMarvelSeries[i].id);
            }, false)

            btn.innerHTML = 'Votar';
            divBtn.appendChild(btn);
            contenedorSeries.appendChild(card);
        }
    }
    ///Función que  sirve para añadirle al p un leer más en y que oculte parte de la descripción. ( se repite tanto en héroes como en comics)
    leerMas();
    contenedorComics.innerHTML = '';
    contenedorHeroes.innerHTML = '';

    ///ocultamos el sistema de paginación de las páginas que no se muestran y llamamos a la función del paginado que filtra las cartas en páginas de 10 en 10 (se hace lo mismo tanto en comics como en Heroes)
    var pag = document.getElementById('pagination-2');
    pag.style = 'display:none;'
    var pag1 = document.getElementById('pagination-1');
    pag1.style = 'display:none;'
    var pag3 = document.getElementById('pagination-3');
    pag3.style = 'display:block;'
    cargarpag();
}



/**
 * Cargamos los Heroes dinamicamente según la cantidad del array en localStorage
 * @param  {none;'contenedorHeroes.style='display:flex;'contenedorSeries.style='display:none;'contenedorHeroes.innerHTML='';for(leti=0;i<localStorageMarvelHeroes.length;i++} {contenedorComics.style='display
 */
function cargarHeroes() {
    contenedorComics.style = 'display: none;'
    contenedorHeroes.style = 'display: flex;'
    contenedorSeries.style = 'display: none; '
    contenedorHeroes.innerHTML = '';
    for (let i = 0; i < localStorageMarvelHeroes.length; i++) {
        if (localStorageMarvelHeroes[i].thumbnail.path.indexOf('image_not_available') == -1 && localStorageMarvelHeroes[i].thumbnail.path.indexOf('4c002e0305708') == -1) {
            var card = document.createElement('div');
            card.setAttribute('class', 'card1');
            card.setAttribute('id', 'card');

            var img = document.createElement('img');
            img.setAttribute('src', localStorageMarvelHeroes[i].thumbnail.path + '.' + localStorageMarvelHeroes[i].thumbnail.extension);
            img.setAttribute('class', 'card-img-top');
            img.setAttribute('alt', localStorageMarvelHeroes[i].name);
            card.appendChild(img);

            var cardbody = document.createElement('div');
            cardbody.setAttribute('class', 'card-body');
            card.appendChild(cardbody);

            var h5 = document.createElement('h5');
            h5.setAttribute('class', 'card-title');
            h5.innerHTML = localStorageMarvelHeroes[i].name;
            cardbody.appendChild(h5);

            var p = document.createElement('p');
            p.setAttribute('class', 'card-text more');
            p.innerHTML = localStorageMarvelHeroes[i].description;
            cardbody.appendChild(p);

            var divBtn = document.createElement('div')
            divBtn.setAttribute('class', 'text-center')
            cardbody.appendChild(divBtn);

            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-primary');
            btn.setAttribute('data-toggle', 'modal');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('data-target', '#ModalHeroe');
            btn.innerHTML = 'VOTAR';
            btn.addEventListener('click', function () {
                var input = document.getElementById('Heroe');
                input.value = localStorageMarvelHeroes[i].name;

                var hidden = document.getElementById('idHeroe');
                hidden.setAttribute('id-Heroe', localStorageMarvelHeroes[i].id);
            }, false)

            btn.innerHTML = 'Votar';
            divBtn.appendChild(btn);
            contenedorHeroes.appendChild(card);
        }
    }
    leerMas();
    contenedorComics.innerHTML = '';
    contenedorSeries.innerHTML = '';
    var pag = document.getElementById('pagination-2');
    pag.style = 'display:none;'
    var pag3 = document.getElementById('pagination-3');
    pag3.style = 'display:none;'
    var pag1 = document.getElementById('pagination-1');
    pag1.style = 'display:block;'
    cargarpag();
}

/**
 * Cargamos los comic dinamicamente según la cantidad del array en localStorage
 * @param  {none;'contenedorComics.style='display:flex;'contenedorSeries.style='display:none;'contenedorComics.innerHTML='';for(leti=0;i<localStorageMarvelComics.length;i++} {contenedorHeroes.style='display
 */
function cargarComics() {
    contenedorHeroes.style = 'display: none;'
    contenedorComics.style = 'display: flex;'
    contenedorSeries.style = 'display: none; '
    contenedorComics.innerHTML = '';

    for (let i = 0; i < localStorageMarvelComics.length; i++) {
        if (localStorageMarvelComics[i].thumbnail.path.indexOf('image_not_available') == -1 && localStorageMarvelComics[i].thumbnail.path.indexOf('4c002e0305708') == -1) {
            var card = document.createElement('div');
            card.setAttribute('class', 'card');

            var img = document.createElement('img');
            img.setAttribute('src', localStorageMarvelComics[i].thumbnail.path + '.' + localStorageMarvelComics[i].thumbnail.extension);
            img.setAttribute('class', 'card-img-top');
            img.setAttribute('alt', localStorageMarvelComics[i].title);
            card.appendChild(img);

            var cardbody = document.createElement('div');
            cardbody.setAttribute('class', 'card-body');
            card.appendChild(cardbody);

            var h5 = document.createElement('h5');
            h5.setAttribute('class', 'card-title');
            h5.innerHTML = localStorageMarvelComics[i].title;
            cardbody.appendChild(h5);

            var p = document.createElement('p');
            p.setAttribute('class', 'card-text more');
            p.innerHTML = localStorageMarvelComics[i].description;
            cardbody.appendChild(p);

            var divBtn = document.createElement('div')
            divBtn.setAttribute('class', 'text-center')
            cardbody.appendChild(divBtn);

            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-primary');
            btn.setAttribute('data-toggle', 'modal');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('data-target', '#exampleModal');
            btn.title = 'Botón para votar por la película' + localStorageMarvelComics[i].title;
            btn.innerHTML = 'VOTAR';
            btn.addEventListener('click', function () {
                var input = document.getElementById('Comic');
                input.value = localStorageMarvelComics[i].title;

                var hidden = document.getElementById('IdMarvel');
                hidden.setAttribute('id-Comic', localStorageMarvelComics[i].id);
            }, false)

            btn.innerHTML = 'Votar';
            divBtn.appendChild(btn);
            contenedorComics.appendChild(card);
        }
    }

    leerMas();
    contenedorHeroes.innerHTML = '';
    contenedorSeries.innerHTML = '';
    var pag = document.getElementById('pagination-1');
    pag.style = 'display:none;'
    var pag3 = document.getElementById('pagination-3');
    pag3.style = 'display:none;'
    var pag2 = document.getElementById('pagination-2');
    pag2.style = 'display:block;'
    cargarpag();
}

/**
 * Función para votar por una serie
 * @param  {} {varidSerie=document.getElementById('idSeries'
 * @param  {} .getAttribute('id-Series'
 * @param  {} ;varemail=document.getElementById('emailSeries'
 * @param  {} .value;varnom=document.getElementById('Series'
 * @param  {} .valuevarnombre=document.getElementById('NombreSeries'
 * @param  {} .value;vartelefono=document.getElementById('TelefonoSeries'
 * @param  {email} .value;varUsuario={email
 * @param  {nombre} nombre
 * @param  {telefono} telefono
 * @param  {parseInt(idSerie} voto
 */
function votarSeries() {
    ///recogemos lo rellenado en el formulario (sucede lo mismo en votar por comics y heroes)
    var idSerie = document.getElementById('idSeries').getAttribute('id-Series');
    var email = document.getElementById('emailSeries').value;
    var nom = document.getElementById('Series').value
    var nombre = document.getElementById('NombreSeries').value;
    var telefono = document.getElementById('TelefonoSeries').value;
    ///creamos el objeto usuario que se guardará en el localStorage para saber que usuarios han votado (aunque el mismo usuario puede votar toda las veces que quiera, sucede lo mismo en votar por comics y heroes))
    var Usuario = {
        email: email,
        nombre: nombre,
        telefono: telefono,
        voto: parseInt(idSerie)
    }

    var arr = JSON.parse(localStorage.getItem('usuarios'));

    if (arr == null) {
        arr = [];
    }

    arr.push(Usuario);

    localStorage.setItem('usuarios', JSON.stringify(arr));
    ///Creamos el array de votos guardando los votos en localStorage condicionando que si existe la película solo se le sume un voto más (sucede lo mismo en votar por comics y heroes)
    var votosSeries = JSON.parse(localStorage.getItem('votosSeries'));
    if (votosSeries == null) {
        var votosSeries = []
    }


    var existe = false;
    for (let i = 0; i < votosSeries.length; i++) {
        /// Si esta, agregarle un voto
        if (votosSeries[i].id == idSerie) {
            votosSeries[i].votos++;
            existe = true;
        }
    }
    ///si no está crea añade al array el nuevo elemento al local Storage (sucede lo mismo en votar por comics y heroes)
    if (existe == false) {
        var obj = {
            id: idSerie,
            title: nom,
            votos: 1
        }
        votosSeries.push(obj);
    }

    localStorage.setItem("votosSeries", JSON.stringify(votosSeries));

}
/**
 * Función para votar por un comic 
 * @param  {} {varidComic=document.getElementById('IdMarvel'
 * @param  {} .getAttribute('id-Comic'
 * @param  {} ;varemail=document.getElementById('email'
 * @param  {} .value;varnom=document.getElementById('Comic'
 * @param  {} .valuevarnombre=document.getElementById('Nombre'
 * @param  {} .value;vartelefono=document.getElementById('Telefono'
 * @param  {email} .value;varUsuario={email
 * @param  {nombre} nombre
 * @param  {telefono} telefono
 * @param  {parseInt(idComic} voto
 */
function votarComic() {

    var idComic = document.getElementById('IdMarvel').getAttribute('id-Comic');
    var email = document.getElementById('email').value;
    var nom = document.getElementById('Comic').value;
    var nombre = document.getElementById('Nombre').value;
    var telefono = document.getElementById('Telefono').value;

    var Usuario = {
        email: email,
        nombre: nombre,
        telefono: telefono,
        voto: parseInt(idComic)
    }

    var arr = JSON.parse(localStorage.getItem('usuarios'));

    if (arr == null) {
        arr = [];
    }

    arr.push(Usuario);

    localStorage.setItem('usuarios', JSON.stringify(arr));

    var votosComics = JSON.parse(localStorage.getItem('votosComic'));
    if (votosComics == null) {
        var votosComics = []
    }


    var existe = false;
    for (let i = 0; i < votosComics.length; i++) {
        /// Si esta, agregarle un voto
        if (votosComics[i].id == idComic) {
            votosComics[i].votos++;
            existe = true;
        }
    }

    if (existe == false) {
        var obj = {
            id: idComic,
            title: nom,
            votos: 1
        }
        votosComics.push(obj);
    }

    localStorage.setItem("votosComic", JSON.stringify(votosComics));

}

/**
 * Función para votar por un heroe
 * @param  {} {varidHeroe=document.getElementById('idHeroe'
 * @param  {} .getAttribute('id-Heroe'
 * @param  {} ;varemail=document.getElementById('emailHeroe'
 * @param  {} .value;varnom=document.getElementById('Heroe'
 * @param  {} .valuevarnombre=document.getElementById('NombreHeroe'
 * @param  {} .value;vartelefono=document.getElementById('TelefonoHeroe'
 * @param  {email} .value;varUsuario={email
 * @param  {nombre} nombre
 * @param  {telefono} telefono
 * @param  {parseInt(idHeroe} voto
 */
function votarHeroes() {
    var idHeroe = document.getElementById('idHeroe').getAttribute('id-Heroe');
    var email = document.getElementById('emailHeroe').value;
    var nom = document.getElementById('Heroe').value
    var nombre = document.getElementById('NombreHeroe').value;
    var telefono = document.getElementById('TelefonoHeroe').value;

    var Usuario = {
        email: email,
        nombre: nombre,
        telefono: telefono,
        voto: parseInt(idHeroe)
    }

    var arr = JSON.parse(localStorage.getItem('usuarios'));

    if (arr == null) {
        arr = [];
    }

    arr.push(Usuario);

    localStorage.setItem('usuarios', JSON.stringify(arr));

    var votosHeroe = JSON.parse(localStorage.getItem('votosHeroe'));
    if (votosHeroe == null) {
        var votosHeroe = []
    }

    var existe = false;
    for (let i = 0; i < votosHeroe.length; i++) {
        if (votosHeroe[i].id == idHeroe) {
            votosHeroe[i].votos++;
            existe = true;
        }
    }
    if (existe == false) {
        var obj = {
            id: idHeroe,
            title: nom,
            votos: 1
        }
        votosHeroe.push(obj);
    }

    localStorage.setItem("votosHeroe", JSON.stringify(votosHeroe));

}
///función leer mas para reducir la descripcion en el p de las cartas sacada de internet
function leerMas() {
    var showChar = 100;
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";

    $('.more').each(function () {

        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

}
/**
 * Función para el paginado sacado de un ejemplo de clase a la cual le damos tres opciones 
 * @param  {} {jQuery(function($
 * @param  {} {functionpaginate(options
 * @param  {} {varitems=$(options.itemSelector
 * @param  {} ;varnumItems=items.length;varperPage=options.itemsPerPage;items.slice(perPage
 * @param  {} .hide(
 * @param  {} ;$(function(
 * @param  {} {$(options.paginationSelector
 * @param  {numItems} .pagination({items
 * @param  {perPage} itemsOnPage
 * @param  {'light-theme'} cssStyle
 * @param  {function(pageNumber} onPageClick
 */
function cargarpag() {
    
    jQuery(function ($) {
        function paginate(options) {
            var items = $(options.itemSelector);
            var numItems = items.length;
            var perPage = options.itemsPerPage;
            items.slice(perPage).hide();
            $(function () {
                $(options.paginationSelector).pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    cssStyle: 'light-theme',
                    onPageClick: function (pageNumber) {
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        items.hide()
                            .slice(showFrom, showTo).show();
                        return false;
                    }
                })
            });
        }
        paginate({
            itemSelector: ".contenedor-heroes .card1",
            paginationSelector: "#pagination-1",
            itemsPerPage: 10
        });
        paginate({
            itemSelector: ".contenedor-comics .card",
            paginationSelector: "#pagination-2",
            itemsPerPage: 10
        });
        paginate({
            itemSelector: ".contenedor-series .card2",
            paginationSelector: "#pagination-3",
            itemsPerPage: 10
        });
    });
}
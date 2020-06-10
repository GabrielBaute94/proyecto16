// BUSCAR PELÍCULA:
function searchMovie() {

    // Se oculta (en realidad se remueve) el <div> que
    // contiene el mensaje de bievenida:
    $("#welcome").remove();

    // Al comenzar la búsqueda, se muestra el loader y
    // el texto del botón pasa de "Buscar" a "Buscando".
    $("#not-loading").addClass("d-none");
    $("#loading").removeClass("d-none");

    // Se obtiene el texto ingresado por el usuario:
    var searched_movie = $("#input-movie").val();

    // Llamada AJAX:
    $.ajax({
        method: 'GET',
        url: 'https://private.omdbapi.com/?plot=full&apikey=bef9c583&t=' + searched_movie,
        dataType: "json",
        success: function (movie) {

            /**
             * En el parámetro 'movie' vienen los datos de la película en formato JSON.
             * jQuery automáticamente convierte dicho parámetro a un OBJETO JavaScript.
             * Luego es posible acceder a las propiedades del objeto usando
             * dot-notation (puntos) o bracket-notation (corchetes).
             * A continuación se usará dot-notation.
             */

            if (movie.Response == "False") {
                // En caso de no haber una película con el nombre buscado,
                // se muestra un mensaje de error:
                $("#no-movie").removeClass("d-none");
                $("#movie").addClass("d-none");
            }
            else {
                // Para probar, se muestra la película en la consola.
                console.log(movie);

                // Por las dudas, se quita mensaje de error.
                $("#no-movie").addClass("d-none");

                // Se muestra la película en la página:
                $("#movie").removeClass("d-none");
                $("h1").text(movie.Title);
                $("#director span").text(movie.Director);
                $("#awards").text(movie.Awards);
                $("#actors").text(movie.Actors);
                $("#country").text(movie.Country);
                $("#plot").text(movie.Plot);
                $("#image").attr("src", movie.Poster);
                $("#btn-website").attr("href", movie.Website);

                $("#ratings").html(""); // Se resetean los ratings (en caso de que ya hubiesen cargados).

                movie.Ratings.forEach(function (rating) {
                    var li = $("<li></li>");
                    li.text(rating.Source + " - " + rating.Value);
                    $("#ratings").append(li);
                });

            }

        },
        error: function (xhr, status, e) {
            // Se muestra un alert en caso de error:
            alert(e);
        },
        complete: function () {
            // Al terminar la búsqueda, se quita el loader y
            // el texto del botón pasa de "Buscando" a "Buscar".
            $("#not-loading").removeClass("d-none");
            $("#loading").addClass("d-none");
        }
    });

} // End - Search Movie


// Si usuario presiona en Enter:
$("#search-form").on("submit", function (event) {
    event.preventDefault(); // Se previene que se envie el formulario (y se recargue la página).
    searchMovie();
});

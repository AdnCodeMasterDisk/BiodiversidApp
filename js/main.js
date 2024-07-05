document.addEventListener("DOMContentLoaded", function() {
    // Renderizar animales principales
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper = document.querySelector('.mySwiper .swiper-wrapper');
            const animales = data.filter(item => item.especie === 'animal'); // Filtra solo los animales
            const primerosCuatroAnimales = animales.slice(0, 4); // Selecciona solo los primeros 4 animales

            primerosCuatroAnimales.forEach((animal) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide slide-animal'; // Clase adicional para estilos específicos
                slide.style.backgroundImage = `url(${animal.imagen})`;

                slide.innerHTML = `
                    <div class="layeranimal"></div>
                    <div class="contenidoanimal">
                        <div class="boxanimaltop">
                            <div class="boxfavoritostodos">
                                <span class="material-symbols-rounded" onclick="addToFavorites(${animal.index})">favorite</span>
                            </div>
                        </div>
                        <div class="animalboxbuttom">
                            <p class="nombreanimal">${animal.nombre}</p>
                            <div class="boxbtn" onclick="showDetailScreen(${animal.index})">
                                <a>Ver más</a>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });

            // Inicializar Swiper después de agregar los elementos
            new Swiper(".mySwiper", {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Renderizar plantas
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper2 = document.querySelector('.mySwiper2 .swiper-wrapper');
            const plantas = data.filter(item => item.especie === 'vegetal'); // Filtra solo las plantas
            const primerasCuatroPlantas = plantas.slice(0, 4); // Selecciona solo las primeras 4 plantas

            primerasCuatroPlantas.forEach((planta) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide slide-plant'; // Clase adicional para estilos específicos
                slide.style.backgroundImage = `url(${planta.imagen})`;

                slide.innerHTML = `
                    <div class="layerplantas"></div>
                    <div class="contenidoplantas">
                        <div class="boxplantastop">
                            <div class="boxfavoritostodos">
                                <span class="material-symbols-rounded" onclick="addPlantaToFavorites(${planta.index})">favorite</span>
                            </div>
                        </div>
                        <div class="plantasboxbuttom">
                            <p class="nombreplantas">${planta.nombre}</p>
                            <div class="boxbtn" onclick="showPlantDetail(${planta.index})">
                                <a>Ver más</a>
                            </div>
                        </div>
                    </div>
                `;
                swiperWrapper2.appendChild(slide);
            });

            // Inicializar Swiper después de agregar los elementos
            new Swiper(".mySwiper2", {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function showDetailScreen(index) {
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const animal = data.find(item => item.index === index && item.especie === 'animal'); // Busca solo animales
            if (animal) {
                document.getElementById('detalleNombre').innerText = animal.nombre;
                document.getElementById('detalleDescripcion').innerText = animal.descripcion;
                document.getElementById('locationtext').innerText = animal.departamento;
                document.getElementById('detartamento').innerText = animal.localidad;
                document.getElementById('detalleImagen').style.backgroundImage = `url(${animal.imagen})`;
                document.getElementById('ScreenDetail').classList.remove('hide');
                document.getElementById('ScreenPrinciapal').classList.add('hide');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showPlantDetail(index) {
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const planta = data.find(item => item.index === index && item.especie === 'vegetal'); // Busca solo plantas
            if (planta) {
                document.getElementById('detalleNombre').innerText = planta.nombre;
                document.getElementById('detalleDescripcion').innerText = planta.descripcion;
                document.getElementById('locationtext').innerText = planta.departamento;
                document.getElementById('detartamento').innerText = planta.localidad;
                document.getElementById('detalleImagen').style.backgroundImage = `url(${planta.imagen})`;
                document.getElementById('ScreenDetail').classList.remove('hide');
                document.getElementById('ScreenPrinciapal').classList.add('hide');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function hideDetailScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}

function HidedetaillScreen(){
    const screendetaill = document.getElementById("ScreenDetail");
    const screenPrincipal = document.getElementById("ScreenPrinciapal");

    screenPrincipal.classList.remove("hide");
    screendetaill.classList.add("hide");
}

function addToFavorites(index) {
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const favorito = data.find(favorito => favorito.index === index);
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.index === index)) {
                favorites.push(favorito);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Especie añadida a favoritos.');
            } else {
                alert('Esta especie ya está en favoritos.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function addPlantaToFavorites(index) {
    fetch('../js/especies.json')
        .then(response => response.json())
        .then(data => {
            const favorito = data.find(favorito => favorito.index === index);
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.index === index)) {
                favorites.push(favorito);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Especie añadida a favoritos.');
            } else {
                alert('Esta especie ya está en favoritos.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

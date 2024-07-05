
//slider horizontal home swipe
document.addEventListener("DOMContentLoaded", function() {
    // Renderizar animales principales
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper = document.querySelector('.mySwiper .swiper-wrapper');
            const animales = data.filter(item => item.especie === 'animal'); // Filtra solo los animales
            const primerosCuatroAnimales = animales.slice(0, 5); // Selecciona solo los primeros 4 animales

            primerosCuatroAnimales.forEach((animal) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide slide-animal'; // Clase adicional para estilos específicos
                slide.style.backgroundImage = `url(${animal.imagen})`;

                const favoriteButton = document.createElement('span');
                favoriteButton.className = 'material-symbols-rounded';
                favoriteButton.textContent = 'favorite';
                favoriteButton.addEventListener('click', () => {
                    console.log(`Adding animal ${animal.index} to favorites`);
                    addToFavorites(animal.index);
                });

                const detailButton = document.createElement('div');
                detailButton.className = 'boxbtn';
                detailButton.innerHTML = '<a>Ver más</a>';
                detailButton.addEventListener('click', () => showDetailScreen(animal.index));

                //diseño
                slide.innerHTML = `
                    <div class="layeranimal"></div>
                    <div class="contenidoanimal">
                        <div class="boxanimaltop">
                            <div class="boxfavoritostodos"></div>
                        </div>
                        <div class="animalboxbuttom">
                            <p class="nombreanimal">${animal.nombre}</p>
                        </div>
                    </div>
                `;

                slide.querySelector('.boxfavoritostodos').appendChild(favoriteButton);
                slide.querySelector('.animalboxbuttom').appendChild(detailButton);
                swiperWrapper.appendChild(slide);
            });

            // Swiper después de agregar los elementos
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

    // Renderizado de las plantas
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper2 = document.querySelector('.mySwiper2 .swiper-wrapper');
            const plantas = data.filter(item => item.especie === 'vegetal'); 
            const primerasCuatroPlantas = plantas.slice(0, 5); 

            primerasCuatroPlantas.forEach((planta) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide slide-plant'; // Clase adicional para estilos específicos
                slide.style.backgroundImage = `url(${planta.imagen})`;

                const favoriteButton = document.createElement('span');
                favoriteButton.className = 'material-symbols-rounded';
                favoriteButton.textContent = 'favorite';
                favoriteButton.addEventListener('click', () => {
                    console.log(`Adding plant ${planta.index} to favorites`);
                    addPlantaToFavorites(planta.index);
                });

                const detailButton = document.createElement('div');
                detailButton.className = 'boxbtn';
                detailButton.innerHTML = '<a>Ver más</a>';
                detailButton.addEventListener('click', () => showPlantDetail(planta.index));

                //diseño carta
                slide.innerHTML = `
                    <div class="layerplantas"></div>
                    <div class="contenidoplantas">
                        <div class="boxplantastop">
                            <div class="boxfavoritostodos"></div>
                        </div>
                        <div class="plantasboxbuttom">
                            <p class="nombreplantas">${planta.nombre}</p>
                        </div>
                    </div>
                `;

                slide.querySelector('.boxfavoritostodos').appendChild(favoriteButton);
                slide.querySelector('.plantasboxbuttom').appendChild(detailButton);
                swiperWrapper2.appendChild(slide);
            });

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


//Screen de deatalles de cada item de naimales
function showDetailScreen(index) {
    fetch('/api/especies')
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

//Screen de deatalles de cada item de plantas
function showPlantDetail(index) {
    fetch('/api/especies')
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

//ocultar detalles
function hideDetailScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}

//Afuncion favoritos dentro de un localstorage
function addToFavorites(index) {
    console.log(`addToFavorites called with index: ${index}`);
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched for addToFavorites:', data);
            const favorito = data.find(favorito => favorito.index == index);  
            if (!favorito) {
                console.error(`No item found with index: ${index}`);
                return;
            }
            console.log('Found favorito:', favorito);

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            console.log('Current favorites:', favorites);

            // Verificación adicional para asegurarnos de que fav no es null
            const indexExists = favorites.some(fav => fav && fav.index == index);
            console.log(`Does index ${index} exist in favorites?`, indexExists);

            if (!indexExists) {
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
    console.log(`addPlantaToFavorites called with index: ${index}`);
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched for addPlantaToFavorites:', data);
            const favorito = data.find(favorito => favorito.index == index);  
            if (!favorito) {
                console.error(`No item found with index: ${index}`);
                return;
            }
            console.log('Found favorito:', favorito);

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            console.log('Current favorites:', favorites);

            // Verificación adicional para asegurarnos de que fav no es null
            const indexExists = favorites.some(fav => fav && fav.index == index);
            console.log(`Does index ${index} exist in favorites?`, indexExists);

            if (!indexExists) {
                favorites.push(favorito);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Especie añadida a favoritos.');
            } else {
                alert('Esta especie ya está en favoritos.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function cleanFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav !== null);  // Elimina valores null
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

document.addEventListener("DOMContentLoaded", function() {
    cleanFavorites();
});
document.addEventListener("DOMContentLoaded", function() {
    renderFavorites();
});

function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const container = document.querySelector('.listadotodos');
    container.innerHTML = '';  // Limpiar el contenedor antes de volver a renderizar

    favorites.forEach((favorito) => {
        const item = document.createElement('div');
        item.className = 'itemtodos';

        item.innerHTML = `
            <div class="boximagentodos" style="background-image: url(${favorito.imagen});"></div>
            <div class="boxcontenttodos">
                <div class="boxtodostext">
                    <p class="nombretodos">${favorito.nombre}</p>
                    <a href="" class="linkvertodos" onclick="showDetailScreen(${favorito.index}); return false;">Ver</a>
                </div>
                <div class="boxfavoritostodos">
                    <span class="material-symbols-rounded" onclick="removeFromFavorites(${favorito.index})">close</span>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function removeFromFavorites(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(animal => animal.index !== index);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();  // Vuelve a renderizar los favoritos actualizados
}

function showDetailScreen(index) {
    const data = JSON.parse(localStorage.getItem('favorites')) || [];
    const favorito = data.find(animal => animal.index === index);

    if (favorito) {
        document.getElementById('detalleNombre').innerText = favorito.nombre;
        document.getElementById('detalleDescripcion').innerText = favorito.descripcion;
        document.getElementById('locationtext').innerText = favorito.departamento;
        document.getElementById('detartamento').innerText = favorito.localidad;
        document.getElementById('detalleImagen').style.backgroundImage = `url(${favorito.imagen})`;
        document.getElementById('ScreenDetail').classList.remove('hide');
        document.getElementById('ScreenPrinciapal').classList.add('hide');
    } else {
        console.error('favorito no esta en localStorage');
    }
}

function HidedetaillScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}
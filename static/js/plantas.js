
//lsiatdo cn paginacion de los elemetos de la base de datos filtrados por vegetales y mostrando 9 por seccion
const itemsPerPage = 9; // Número de elementos por página
let currentPage = 1;
let plantas = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            plantas = data.filter(item => item.especie === 'vegetal'); // Filtra solo las plantas
            renderPage(currentPage);
            renderPagination();
        })
        .catch(error => console.error('Error fetching data:', error));
});

function renderPage(page) {
    const container = document.querySelector('.listadotodos');
    container.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const pageItems = plantas.slice(startIndex, endIndex);

    if (pageItems.length === 0) {
        container.innerHTML = '<p>No hay plantas para mostrar.</p>';
        return;
    }

    pageItems.forEach((planta) => {
        const item = document.createElement('div');
        item.className = 'itemtodos';
        item.innerHTML = `
                    <div class="boximagentodos" style="background-image: url(${planta.imagen});"></div>
                    <div class="boxcontenttodos">
                        <div class="boxtodostext">
                            <p class="nombretodos">${planta.nombre}</p>
                            <a href="" class="linkvertodos" onclick="showDetailScreen(${planta.index}); return false;">Ver</a>
                        </div>
                        <div class="boxfavoritostodos" onclick="addToFavorites(${planta.index})">
                            <span class="material-symbols-rounded">favorite</span>
                        </div>
                    </div>
                `;
        container.appendChild(item);
    });
}

function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(plantas.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('span');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerText = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            renderPage(currentPage);
            renderPagination();
        });
        paginationContainer.appendChild(pageItem);
    }

    // Previous button
    const prevButton = document.createElement('span');
    prevButton.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerText = 'Previous';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
            renderPagination();
        }
    });
    paginationContainer.insertBefore(prevButton, paginationContainer.firstChild);

    // Next button
    const nextButton = document.createElement('span');
    nextButton.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
}

function showDetailScreen(index) {
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
function HidedetaillScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}
// favortios
function addToFavorites(index) {
    fetch('/api/especies')
        .then(response => response.json())
        .then(data => {
            const planta = data.find(item => item.index === index && item.especie === 'vegetal'); // Busca solo plantas
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.some(fav => fav.index === index)) {
                favorites.push(planta);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Planta añadida a favoritos.');
            } else {
                alert('Esta planta ya está en favoritos.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
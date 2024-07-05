
//listado cn paginacion de los elemetos de la base de datos filtrados por aniamles y mostrando 9 por pagina

document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const itemsPerPage = 9;
    let animals = [];

    function fetchAnimals() {
        fetch('/api/especies')
            .then(response => response.json())
            .then(data => {
                animals = data.filter(item => item.especie === 'animal'); // Filtra solo los animales
                renderPage(currentPage);
                renderPagination();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderPage(page) {
        const container = document.querySelector('.listadotodos');
        container.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const pageItems = animals.slice(startIndex, endIndex);

        if (pageItems.length === 0) {
            container.innerHTML = '<p>No hay animales para mostrar.</p>';
            return;
        }

        pageItems.forEach((animal) => {
            const item = document.createElement('div');
            item.className = 'itemtodos';
            item.innerHTML = `
                <div class="boximagentodos" style="background-image: url(${animal.imagen});"></div>
                <div class="boxcontenttodos">
                    <div class="boxtodostext">
                        <p class="nombretodos">${animal.nombre}</p>
                        <a href="" class="linkvertodos" onclick="showDetailScreen(${animal.index}); return false;">Ver</a>
                    </div>
                    <div class="boxfavoritostodos" onclick="addToFavorites(${animal.index})">
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

        const totalPages = Math.ceil(animals.length / itemsPerPage);

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
        prevButton.innerText = 'Anterior';
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
        nextButton.innerText = 'Siguiente';
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
                renderPagination();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    fetchAnimals();
});

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

function HidedetaillScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}


// render todos los articeles
document.addEventListener("DOMContentLoaded", function() {
    fetch('static/data/articulos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.listadotodos');
            data.forEach((animal) => {
                const item = document.createElement('div');
                item.className = 'itemtodosblog';

                item.innerHTML = `
                    <div class="boximagentodos" style="background-image: url(${animal.imagen});"></div>
                    <div class="boxcontenttodos">
                        <div class="boxtodostext">
                            <p class="nombretodos">${animal.nombre}</p>
                            <a href="" class="linkvertodos" onclick="showDetailScreen(${animal.index}); return false;">Ver</a>
                        </div>
                    </div>
                `;
                container.appendChild(item);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function showDetailScreen(index) {
    fetch('static/data/articulos.json')
        .then(response => response.json())
        .then(data => {
            const animal = data.find(animal => animal.index === index);
            document.getElementById('detalleNombre').innerText = animal.nombre;
            document.getElementById('detalleDescripcion').innerText = animal.descripcion;
            document.getElementById('detalleImagen').style.backgroundImage = `url(${animal.imagen})`;
            document.getElementById('ScreenDetail').classList.remove('hide');
            document.getElementById('ScreenPrinciapal').classList.add('hide');
        })
        .catch(error => console.error('Error fetching data:', error));
}

function HidedetaillScreen() {
    document.getElementById('ScreenDetail').classList.add('hide');
    document.getElementById('ScreenPrinciapal').classList.remove('hide');
}

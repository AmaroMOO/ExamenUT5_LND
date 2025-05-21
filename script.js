window.onload = function() {
    fetch('cincoinicial.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "application/xml");
            mostrarEquipo(xml, document.getElementById('equipo1'));
        });

    fetch('cincoinicial.json')
        .then(response => response.json())
        .then(data => mostrarEquipoJSON(data.equipo, document.getElementById('equipo2')));
};

function mostrarEquipo(xml, container) {
    const equipo = xml.querySelector('equipo');
    const nombre = equipo.querySelector('nombre').textContent;
    const escudo = equipo.querySelector('escudo').textContent;
    const jugadores = equipo.querySelectorAll('jugador');

    container.innerHTML = `
        <img src="${escudo}" alt="Escudo" class="escudo">
        <div class="nombre-equipo">${nombre}</div>
        <table class="tabla-jugadores">
            <thead>
                <tr>
                    <th>NO.</th>
                    <th></th>
                    <th>JUGADOR</th>
                    <th>PTS</th>
                    <th>RT</th>
                    <th>AS</th>
                    <th>VAL</th>
                </tr>
            </thead>
            <tbody>
                ${Array.from(jugadores).map(j => `
                    <tr>
                        <td>${j.querySelector('dorsal').textContent}</td>
                        <td class="foto"><img src="${j.querySelector('foto').textContent}" class="foto-jugador" alt="Foto"></td>
                        <td style="text-align:left">${j.querySelector('nombre').textContent}</td>
                        <td>${j.querySelector('puntos').textContent}</td>
                        <td>${j.querySelector('rebotes').textContent}</td>
                        <td>${j.querySelector('asistencias').textContent}</td>
                        <td>${j.querySelector('valoracion').textContent}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="text-align:right">Totales</td>
                    <td>${suma(jugadores, 'puntos')}</td>
                    <td>${suma(jugadores, 'rebotes')}</td>
                    <td>${suma(jugadores, 'asistencias')}</td>
                    <td>${suma(jugadores, 'valoracion')}</td>
                </tr>
            </tfoot>
        </table>
    `;
}

function mostrarEquipoJSON(equipo, container) {
    const nombre = equipo.nombre;
    const escudo = equipo.escudo;
    const jugadores = equipo.jugadores;

    container.innerHTML = `
        <img src="${escudo}" alt="Escudo" class="escudo">
        <div class="nombre-equipo">${nombre}</div>
        <table class="tabla-jugadores">
            <thead>
                <tr>
                    <th>NO.</th>
                    <th></th>
                    <th>JUGADOR</th>
                    <th>PTS</th>
                    <th>RT</th>
                    <th>AS</th>
                    <th>VAL</th>
                </tr>
            </thead>
            <tbody>
                ${jugadores.map(j => `
                    <tr>
                        <td>${j.dorsal}</td>
                        <td class="foto"><img src="${j.foto}" class="foto-jugador" alt="Foto"></td>
                        <td style="text-align:left">${j.nombre}</td>
                        <td>${j.puntos}</td>
                        <td>${j.rebotes}</td>
                        <td>${j.asistencias}</td>
                        <td>${j.valoracion}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" style="text-align:right">Totales</td>
                    <td>${sumaJSON(jugadores, 'puntos')}</td>
                    <td>${sumaJSON(jugadores, 'rebotes')}</td>
                    <td>${sumaJSON(jugadores, 'asistencias')}</td>
                    <td>${sumaJSON(jugadores, 'valoracion')}</td>
                </tr>
            </tfoot>
        </table>
    `;
}

function suma(jugadores, campo) {
    let total = 0;
    jugadores.forEach(j => {
        total += parseInt(j.querySelector(campo).textContent, 10);
    });
    return total;
}

function sumaJSON(jugadores, campo) {
    return jugadores.reduce((total, j) => total + j[campo], 0);
}
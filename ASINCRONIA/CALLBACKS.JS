/*/
// EJERCICIO 1.

function ejercicio1() {
    function saludarDespuesDe(nombre, callback) {
        setTimeout(() => callback(nombre), 2000);
    }

    function mostrarSaludo(nombre) {
        console.log(`¡Hola, ${nombre}! ¿Cómo estás?`);
    }

    // Reto: tiempo configurable y callback con el error primero.
    function saludarConTiempo(nombre, segundos, callback) {
        if (segundos < 0) {
            callback(new Error('El tiempo no puede ser negativo'));
            return;
        }

        setTimeout(() => callback(null, nombre), segundos * 1000);
    }

    // La promesa exterior permite ejecutar el taller completo en orden.
    return new Promise((fin) => {
        saludarDespuesDe('Ana', (nombre) => {
            mostrarSaludo(nombre);

            saludarConTiempo('José', 1, (error, segundoNombre) => {
                if (error) console.error(error.message);
                else mostrarSaludo(segundoNombre);

                saludarConTiempo('Ana', -1, (errorTiempo) => {
                    if (errorTiempo) console.log(errorTiempo.message);
                    fin();
                });
            });
        });

        console.log('Esto se imprime primero');
    });
}

// EJERCICIO 2. Preparar y servir un desayuno usando callbacks


function ejercicio2() {
    function prepararPanqueques(callback) {
        console.log('Preparando panqueques...');
        setTimeout(() => callback('Panqueques listos para servir'), 3000);
    }

    function prepararJugo(callback) {
        console.log('Preparando jugo...');
        setTimeout(() => callback('Jugo de naranja listo para servir'), 1000);
    }

    function servirDesayuno(mensaje) {
        console.log(mensaje);
    }

    return new Promise((fin) => {
        prepararPanqueques((mensaje) => {
            servirDesayuno(mensaje);

            prepararJugo((mensajeJugo) => {
                servirDesayuno(mensajeJugo);
                fin();
            });
        });
    });
}

// EJERCICIO 3. 


function ejercicio3() {
    function descargarArchivo(nombre, callback) {
        console.log(`Descargando ${nombre}...`);

        setTimeout(() => {
            if (Math.random() < 0.3) {
                callback(new Error(`Falló la descarga de ${nombre}`));
                return;
            }

            callback(null, nombre);
        }, 4000);
    }

    function procesarArchivo(nombre, callback) {
        console.log(`Procesando archivo: ${nombre}...`);
        setTimeout(() => callback(null, 'Archivo procesado'), 2000);
    }

    function enviarCorreo(callback) {
        console.log('Enviando correo...');
        setTimeout(() => callback(null, 'Correo de confirmación enviado'), 1000);
    }

    return new Promise((fin) => {
        function terminarConError(error) {
            console.error(error.message);
            fin();
        }

        descargarArchivo('Documento', (error, nombre) => {
            if (error) return terminarConError(error);
            console.log(`${nombre} descargado correctamente`);

            procesarArchivo(nombre, (error, mensaje) => {
                if (error) return terminarConError(error);
                console.log(mensaje);

                enviarCorreo((error, confirmacion) => {
                    if (error) return terminarConError(error);
                    console.log(confirmacion);
                    console.log('Proceso terminado');
                    fin();
                });
            });
        });
    });
}


// EJERCICIO 4. Reescribir los ejercicios 1, 2 y 3 con promesas


// Estas funciones también se reutilizan en el ejercicio 6.
function esperar(milisegundos, resultado) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(resultado), milisegundos);
    });
}

function saludarDespuesDe(nombre, segundos) {
    if (segundos < 0) {
        return Promise.reject(new Error('El tiempo no puede ser negativo'));
    }

    return esperar(segundos * 1000, nombre);
}

function prepararPanqueques() {
    console.log('Preparando panqueques...');
    return esperar(3000, 'Panqueques listos para servir');
}

function prepararJugo() {
    console.log('Preparando jugo...');
    return esperar(1000, 'Jugo de naranja listo para servir');
}

function descargarArchivo(nombre) {
    console.log(`Descargando ${nombre}...`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(new Error(`Falló la descarga de ${nombre}`));
                return;
            }

            resolve(nombre);
        }, 4000);
    });
}

function procesarArchivo(nombre) {
    console.log(`Procesando archivo: ${nombre}...`);
    return esperar(2000, 'Archivo procesado');
}

function enviarCorreo() {
    console.log('Enviando correo...');
    return esperar(1000, 'Correo de confirmación enviado');
}

function ejercicio4() {
    // 4A. Saludo.
    const saludo = saludarDespuesDe('Ana', 2);
    console.log('Esto se imprime primero');

    return saludo
        .then((nombre) => {
            console.log(`¡Hola, ${nombre}! ¿Cómo estás?`);

            // 4B. Desayuno.
            return prepararPanqueques();
        })
        .then((mensaje) => {
            console.log(mensaje);
            return prepararJugo();
        })
        .then((mensaje) => {
            console.log(mensaje);

            // 4C. Descargar, procesar y notificar.
            return descargarArchivo('Documento');
        })
        .then((nombre) => {
            console.log(`${nombre} descargado correctamente`);
            return procesarArchivo(nombre);
        })
        .then((mensaje) => {
            console.log(mensaje);
            return enviarCorreo();
        })
        .then((confirmacion) => {
            console.log(confirmacion);
            console.log('Proceso terminado');
        })
        .catch((error) => console.error(error.message))
        .finally(() => console.log('Fin del intento'));
}

// EJERCICIO 5.

const ingredientes = [
    { nombre: 'Pollo', tiempo: 1500 },
    { nombre: 'Arroz', tiempo: 1000 },
    { nombre: 'Verduras', tiempo: 1200 },
    { nombre: 'Salsa', tiempo: 800 },
    { nombre: 'Especias', tiempo: 500 },
];

const cocineros = [
    { nombre: 'Laura', ingredientes: ['Pollo', 'Especias'] },
    { nombre: 'Andrés', ingredientes: ['Arroz'] },
    { nombre: 'Sofía', ingredientes: ['Verduras', 'Salsa'] },
];

function buscarIngrediente(nombre) {
    const ingrediente = ingredientes.find((item) => item.nombre === nombre);
    if (!ingrediente) throw new Error(`No existe el ingrediente ${nombre}`);
    return ingrediente;
}

function prepararIngrediente(ingrediente, quemado) {
    console.log(`Preparando ${ingrediente.nombre}...`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (ingrediente.nombre === quemado) {
                reject(new Error(`Se quemó el ingrediente ${quemado}`));
                return;
            }

            console.log(`${ingrediente.nombre} listo`);
            resolve(ingrediente.nombre);
        }, ingrediente.tiempo);
    });
}

function resumenCocinero(cocinero, tiempo) {
    return `${cocinero.nombre} terminó: ${cocinero.ingredientes.join(', ')} (${tiempo} ms)`;
}

function cocinarConPromesas(cocinero, quemado) {
    let tiempo = 0;

    const preparacion = cocinero.ingredientes.reduce((anterior, nombre) => {
        return anterior.then(() => {
            const ingrediente = buscarIngrediente(nombre);
            tiempo += ingrediente.tiempo;
            return prepararIngrediente(ingrediente, quemado);
        });
    }, Promise.resolve());

    return preparacion.then(() => resumenCocinero(cocinero, tiempo));
}

function ejercicio5() {
    console.time('Tiempo del pedido');

    return Promise.all(cocineros.map((persona) => cocinarConPromesas(persona)))
        .then((resultados) => {
            resultados.forEach((mensaje) => console.log(mensaje));
            console.log('Pedido listo');
        })
        .finally(() => console.timeEnd('Tiempo del pedido'))
        .then(() => {
            console.log('\nPrueba de error: se quema el arroz');

            // Ambas operaciones observan las mismas preparaciones.
            const tareas = cocineros.map((persona) => cocinarConPromesas(persona, 'Arroz'));

            const pedido = Promise.all(tareas)
                .catch((error) => console.log(`Pedido fallido: ${error.message}`));

            const detalle = Promise.allSettled(tareas);
            return Promise.all([pedido, detalle]);
        })
        .then(([, resultados]) => {
            resultados.forEach((resultado, indice) => {
                if (resultado.status === 'fulfilled') {
                    console.log(resultado.value);
                } else {
                    console.log(`${cocineros[indice].nombre} no terminó: ${resultado.reason.message}`);
                }
            });
        });
}

// EJERCICIO 6. 
async function cocinarConAwait(cocinero) {
    let tiempo = 0;

    // forEach no espera las promesas de sus callbacks.
    // for...of con await permite terminar un ingrediente antes de iniciar el siguiente.
    for (const nombre of cocinero.ingredientes) {
        const ingrediente = buscarIngrediente(nombre);
        await prepararIngrediente(ingrediente);
        tiempo += ingrediente.tiempo;
    }

    return resumenCocinero(cocinero, tiempo);
}

async function ejercicio6() {
    // 6A. Descargar, procesar y notificar.
    try {
        const nombre = await descargarArchivo('Documento');
        console.log(`${nombre} descargado correctamente`);
        console.log(await procesarArchivo(nombre));
        console.log(await enviarCorreo());
        console.log('Proceso terminado');
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log('Fin del intento');
    }

    // 6B. Cada cocinero sigue su receta y los tres trabajan al mismo tiempo.
    console.time('Tiempo del restaurante');

    try {
        const resultados = await Promise.all(cocineros.map(cocinarConAwait));
        resultados.forEach((mensaje) => console.log(mensaje));
        console.log('Pedido listo');
    } catch (error) {
        console.error('Error en el pedido:', error.message);
    } finally {
        console.timeEnd('Tiempo del restaurante');
    }
}

// RETO INTEGRADOR. Reporte de ventas y artículos

const ventas = [
    { id: 1, idarticulo: 101, cantidad: 2, fecha: '2024-08-01' },
    { id: 2, idarticulo: 102, cantidad: 1, fecha: '2024-08-01' },
    { id: 3, idarticulo: 103, cantidad: 3, fecha: '2024-08-02' },
    { id: 4, idarticulo: 101, cantidad: 4, fecha: '2024-08-02' },
    { id: 5, idarticulo: 101, cantidad: 1, fecha: '2024-08-03' },
    { id: 6, idarticulo: 104, cantidad: 1, fecha: '2024-08-03' },
    { id: 7, idarticulo: 102, cantidad: 7, fecha: '2024-08-04' },
    { id: 8, idarticulo: 101, cantidad: 1, fecha: '2024-08-04' },
    { id: 9, idarticulo: 102, cantidad: 1, fecha: '2024-08-05' },
    { id: 10, idarticulo: 103, cantidad: 2, fecha: '2024-08-05' },
];

const articulos = [
    { idarticulo: 101, nombre: 'Artículo A' },
    { idarticulo: 102, nombre: 'Artículo B' },
    { idarticulo: 103, nombre: 'Artículo C' },
    { idarticulo: 104, nombre: 'Artículo D' },
];

function obtenerVentasCallback(callback) {
    setTimeout(() => callback(null, [...ventas]), 500);
}

function obtenerArticuloCallback(id, callback) {
    setTimeout(() => {
        const articulo = articulos.find((item) => item.idarticulo === id);

        if (!articulo) {
            callback(new Error(`El artículo ${id} no existe`));
            return;
        }

        callback(null, articulo);
    }, 300);
}

function agruparVentas(registros) {
    const ventasPorArticulo = registros.reduce((totales, venta) => {
        const id = venta.idarticulo;
        totales[id] = (totales[id] ?? 0) + venta.cantidad;
        return totales;
    }, {});

    return Object.entries(ventasPorArticulo)
        .map(([id, cantidad]) => ({ id: Number(id), cantidad }))
        .filter((item) => item.cantidad > 3)
        .sort((a, b) => b.cantidad - a.cantidad);
}

function lineaReporte(articulo, cantidad) {
    return `${articulo.nombre} (id=${articulo.idarticulo}) vendió ${cantidad} unidades`;
}

// Versión 1. Callbacks de error primero.
function reporteCallbacks(callback) {
    obtenerVentasCallback((error, registros) => {
        if (error) return callback(error);

        const grupos = agruparVentas(registros);
        const lineas = [];
        let pendientes = grupos.length;
        let fallo = false;

        if (pendientes === 0) return callback(null, []);

        grupos.forEach(({ id, cantidad }, indice) => {
            obtenerArticuloCallback(id, (errorArticulo, articulo) => {
                if (fallo) return;

                if (errorArticulo) {
                    fallo = true;
                    callback(errorArticulo);
                    return;
                }

                lineas[indice] = lineaReporte(articulo, cantidad);
                pendientes--;

                if (pendientes === 0) callback(null, lineas);
            });
        });
    });
}

// Versión 2. Promesas. promisify adapta los callbacks de error primero.
const { promisify } = require('node:util');
const obtenerVentas = promisify(obtenerVentasCallback);
const obtenerArticulo = promisify(obtenerArticuloCallback);

function consultarLinea({ id, cantidad }) {
    return obtenerArticulo(id)
        .then((articulo) => lineaReporte(articulo, cantidad));
}

function reportePromesas() {
    return obtenerVentas()
        .then(agruparVentas)
        .then((grupos) => Promise.all(grupos.map(consultarLinea)));
}

// Versión 3. Async/await y try/catch.
async function reporteAsync() {
    try {
        const registros = await obtenerVentas();
        const grupos = agruparVentas(registros);
        const lineas = await Promise.all(grupos.map(consultarLinea));
        lineas.forEach((linea) => console.log(linea));
    } catch (error) {
        console.error(`Falló el reporte: ${error.message}`);
    }
}

// Prueba de error. allSettled conserva las consultas exitosas.
async function reporteParcial() {
    const grupos = agruparVentas(await obtenerVentas());
    const resultados = await Promise.allSettled(grupos.map(consultarLinea));

    resultados.forEach((resultado, indice) => {
        if (resultado.status === 'fulfilled') {
            console.log(resultado.value);
        } else {
            console.log(`No se encontró el artículo ${grupos[indice].id}`);
        }
    });
}

async function retoIntegrador() {
    console.log('Reporte con callbacks');
    const lineasCallback = await promisify(reporteCallbacks)();
    lineasCallback.forEach((linea) => console.log(linea));

    console.log('\nReporte con promesas');
    const lineasPromesa = await reportePromesas();
    lineasPromesa.forEach((linea) => console.log(linea));

    console.log('\nReporte con async/await');
    await reporteAsync();

    ventas.push({ id: 11, idarticulo: 105, cantidad: 6, fecha: '2024-08-06' });

    try {
        console.log('\nArtículo 105 con Promise.all');
        await reporteAsync();

        console.log('\nArtículo 105 con Promise.allSettled');
        await reporteParcial();
    } finally {
        ventas.pop(); // Retira la venta de prueba.
    }
}

// EJERCICIO 7. 

async function obtenerJSON(url, opciones) {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP ${respuesta.status}`);
    }

    return respuesta.json();
}

function formatoMoneda(valor, moneda) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: moneda,
        currencyDisplay: 'code',
    }).format(valor);
}

async function ejercicio7() {
    try {
        const url = new URL('https://api.coingecko.com/api/v3/simple/price');
        url.search = new URLSearchParams({
            ids: 'bitcoin,ethereum',
            vs_currencies: 'usd,cop',
            include_24hr_change: 'true',
        });

        const datos = await obtenerJSON(url);

        for (const nombre of ['bitcoin', 'ethereum']) {
            const moneda = datos[nombre];

            if (!Number.isFinite(moneda?.usd) || !Number.isFinite(moneda?.cop)) {
                throw new Error(`Faltan precios de ${nombre}`);
            }

            console.log(`${nombre}: ${formatoMoneda(moneda.usd, 'USD')} / ${formatoMoneda(moneda.cop, 'COP')}`);
        }

        const btc = datos.bitcoin.usd_24h_change;
        const eth = datos.ethereum.usd_24h_change;

        if (!Number.isFinite(btc) || !Number.isFinite(eth)) {
            console.log('Faltan datos para comparar las últimas 24 horas.');
            return;
        }

        console.log(`Cambio en 24 h: Bitcoin ${btc.toFixed(2)} %, Ethereum ${eth.toFixed(2)} %`);

        if (btc === eth) {
            console.log('Ambas monedas tuvieron la misma variación.');
        } else if (Math.max(btc, eth) <= 0) {
            console.log('Ninguna moneda subió en las últimas 24 horas.');
        } else {
            console.log(`La moneda que más subió fue ${btc > eth ? 'Bitcoin' : 'Ethereum'}.`);
        }
    } catch (error) {
        console.error('Error al consultar los precios:', error.message);
    }
}

// EJERCICIO 8.
function cargarClave(nombre) {
    require('dotenv').config({ quiet: true });
    const clave = process.env[nombre];

    if (!clave) throw new Error(`Falta ${nombre} en el archivo .env`);
    return clave;
}

async function ejercicio8(titulo = 'Interestelar') {
    try {
        const axios = require('axios');
        const clave = cargarClave('TMDB_API_KEY');

        const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: { api_key: clave, query: titulo, language: 'es-MX' },
            timeout: 10000,
        });

        const pelicula = data.results[0];

        if (!pelicula) {
            console.log('No se encontró la película');
            return;
        }

        console.log(`Título: ${pelicula.title}`);
        console.log(`Año: ${pelicula.release_date?.slice(0, 4) || 'Sin fecha'}`);
        console.log(`Sinopsis: ${pelicula.overview || 'Sin sinopsis disponible'}`);
    } catch (error) {
        console.error('Error al buscar la película:', error.response?.data?.status_message ?? error.message);
    }
}
/*/
// EJERCICIO 9. 


async function buscarNoticias(palabraClave) {
    const axios = require('axios');
    const clave = cargarClave('NEWS_API_KEY');

    const { data } = await axios.get('https://newsapi.org/v2/everything', {
        headers: { 'X-Api-Key': clave },
        params: { q: palabraClave, language: 'es', pageSize: 5 },
        timeout: 10000,
    });

    return { tema: palabraClave, noticias: data.articles, total: data.totalResults };
}

async function ejercicio9(temaA = 'café', temaB = 'tecnología') {
    try {
        const resultados = await Promise.all([
            buscarNoticias(temaA),
            buscarNoticias(temaB),
        ]);

        for (const { tema, noticias, total } of resultados) {
            console.log(`\n${tema}: ${total} resultados`);

            if (noticias.length === 0) console.log('No se encontraron noticias');

            for (const noticia of noticias) {
                console.log(`Título: ${noticia.title}`);
                console.log(`Medio: ${noticia.source?.name || 'Sin medio'}`);
                console.log(`Fecha: ${noticia.publishedAt?.slice(0, 10) || 'Sin fecha'}\n`);
            }
        }

        const [primero, segundo] = resultados;

        if (primero.total === segundo.total) {
            console.log('Los dos temas tienen la misma cantidad de resultados.');
        } else {
            const mayor = primero.total > segundo.total ? primero : segundo;
            console.log(`"${mayor.tema}" tiene más resultados (${mayor.total}).`);
        }
    } catch (error) {
        console.error('Error al consultar noticias:', error.response?.data?.message ?? error.message);
    }
}


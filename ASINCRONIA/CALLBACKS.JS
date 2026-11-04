/*/
function saludarDespuesDe(nombre, callback) {
    setTimeout(() => {
        callback (nombre);   
    }, 2000);
}
function mostrarSaludo(nombre) {
    console.log(`¡Hola, ${nombre}! ¿Cómo estás?`);
}
saludarDespuesDe('Ana', mostrarSaludo);
console.log('Esto se imprime primero');

function mostrarSaludo(nombre) { 
console.log(`¡Hola, ${nombre}! ¿Cómo estás?`); 
}  saludarDespuesDe('Ana', mostrarSaludo); console.log('Esto se imprime primero'); 





function prepararPanqueques(callback) {
    console.log('Preparando panqueques...');
    setTimeout(() => {
        callback('¡Los panqueques están listos para servir!');
    }, 3000);
}

function prepararJugo(callback) {
    console.log('Preparando jugo...');
    setTimeout(() => {
        callback('¡El jugo de naranja está listo!');
    }, 1000);
}

function servirDesayuno(mensaje) {
    console.log(mensaje);
}
prepararPanqueques((mensaje) => {
    servirDesayuno(mensaje);
    prepararJugo((mensaje) => {
        servirDesayuno(mensaje);
    });
});


function descargarArchivo(nombre, callback) {
    console.log(`Descargando ${nombre}...`);

    setTimeout(() => {
        if (Math.random() < 0.3) {
            callback(`Falló la descarga de ${nombre}`);
        } else {
            callback(null, `${nombre} descargado correctamente`);
        }
    }, 4000);
}

function procesarArchivo(nombre, callback) {
    console.log('Procesando archivo...');

    setTimeout(() => {
        callback(null, 'Archivo procesado');
    }, 2000);
}

function enviarCorreo(callback) {
    console.log('Enviando correo...');

    setTimeout(() => {
        callback(null, 'Correo de confirmación enviado');
    }, 1000);
}

// Ejecutar el proceso
descargarArchivo('Documento', (error, resultado) => {

    if (error) {
        console.log(error);
        return;
    }

    console.log(resultado);

    procesarArchivo('Documento', (error, resultado) => {
        console.log(resultado);

        enviarCorreo((error, resultado) => {
            console.log(resultado);
            console.log('Proceso terminado');
        });
    });
});



function saludarDespuesDe(nombre, segundos) {
    return new Promise((resolve, reject) => {
        if (segundos < 0) {
            reject(new Error('El tiempo no puede ser negativo'));
            return;
        }

        setTimeout(() => {
            resolve(nombre);
        }, segundos * 1000);
    });
}

function mostrarSaludo(nombre) {
    console.log(`¡Hola, ${nombre}! ¿Cómo estás?`);
}

saludarDespuesDe('Ana', 2)
    .then(mostrarSaludo)
    .catch(error => console.log(error.message));

console.log('Esto se imprime primero');



function prepararPanqueques() {
    return new Promise((resolve) => {
        console.log('Preparando panqueques...');

        setTimeout(() => {
            resolve('¡Los panqueques están listos para servir!');
        }, 3000);
    });
}

function prepararJugo() {
    return new Promise((resolve) => {
        console.log('Preparando jugo...');

        setTimeout(() => {
            resolve('¡El jugo de naranja está listo!');
        }, 1000);
    });
}

function servirDesayuno(mensaje) {
    console.log(mensaje);
}

prepararPanqueques()
    .then(mensaje => {
        servirDesayuno(mensaje);
        return prepararJugo();
    })
    .then(mensaje => {
        servirDesayuno(mensaje);
    })
    .catch(error => console.log(error.message));



function descargarArchivo(nombre) {
    return new Promise((resolve, reject) => {
        console.log(`Descargando ${nombre}...`);

        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(new Error(`Falló la descarga de ${nombre}`));
            } else {
                resolve(`${nombre} descargado correctamente`);
            }
        }, 4000);
    });
}

function procesarArchivo(nombre) {
    return new Promise((resolve) => {
        console.log('Procesando archivo...');

        setTimeout(() => {
            resolve('Archivo procesado');
        }, 2000);
    });
}

function enviarCorreo() {
    return new Promise((resolve) => {
        console.log('Enviando correo...');

        setTimeout(() => {
            resolve('Correo de confirmación enviado');
        }, 1000);
    });
}

// Ejecutar el proceso
descargarArchivo('Documento')
    .then(resultado => {
        console.log(resultado);
        return procesarArchivo('Documento');
    })
    .then(resultado => {
        console.log(resultado);
        return enviarCorreo();
    })
    .then(resultado => {
        console.log(resultado);
        console.log('Proceso terminado');
    })
    .catch(error => {
        console.log(error.message);
    })
    .finally(() => {
        console.log('Fin del intento');
    });
/*/


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

// Preparar un ingrediente
const prepararIngrediente = (ingrediente) => {
    return new Promise((resolve, reject) => {
        console.log(`Preparando ${ingrediente.nombre}...`);

        setTimeout(() => {
            console.log(`${ingrediente.nombre} listo`);
            resolve(ingrediente.nombre);
        }, ingrediente.tiempo);
    });
};

// Cocinar los ingredientes de cada cocinero en secuencia
const cocinar = (cocinero) => {
    let tiempo = 0;

    const preparaciones = cocinero.ingredientes.map(nombre => {
        const ingrediente = ingredientes.find(i => i.nombre === nombre);
        tiempo += ingrediente.tiempo;
        return ingrediente;
    });

    return preparaciones.reduce((promesa, ingrediente) => {
        return promesa.then(() => prepararIngrediente(ingrediente));
    }, Promise.resolve())
    .then(() => {
        return `${cocinero.nombre} terminó: ${cocinero.ingredientes.join(', ')} (${tiempo} ms)`;
    });
};

// Cocineros trabajan en paralelo
console.time('Tiempo total');

Promise.all(cocineros.map(cocinar))
    .then(resultados => {
        resultados.forEach(resultado => console.log(resultado));
        console.log('Pedido listo');
    })
    .catch(error => {
        console.log('Error en el pedido:', error.message);
    })
    .finally(() => {
        console.timeEnd('Tiempo total');
    });

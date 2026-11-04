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
/*/


function prepararPanqueques(callback) {
    console.log('Preparando panqueques...');
    setTimeout(() => {
        callback('¡los panqueques estan listos!');
    }, 3000)};
function servirDesayuno(mensaje) {
    console.log(mensaje);
}
prepararPanqueques(servirDesayuno); 

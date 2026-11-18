**Ejercicio 3.** Usé tres niveles de callbacks y tres comprobaciones `if (error)`, una al descargar, otra al procesar y otra al enviar el correo. Si falla la descarga, el `return` detiene el proceso.

**Ejercicio 4.** Al pasar de callbacks a promesas, eliminé las tres comprobaciones `if (error)`. Ahora, si falla un paso, el rechazo llega a un solo `.catch()`, que muestra el error.

**Ejercicio 5.** Calculé que el pedido tarda unos dos segundos porque Laura y Sofía tardan dos segundos cada una y Andrés tarda uno, pero los tres empiezan juntos. Si se quema el arroz, `Promise.all` indica que falló el pedido y `Promise.allSettled` permite ver que Laura y Sofía terminaron y Andrés falló.

**Reto integrador.** Con callbacks usé un contador para saber cuándo habían llegado todos los artículos. Con `Promise.all`, la espera es automática. El reporte tarda aproximadamente 1.400 ms si hago las consultas en secuencia y 800 ms si busco los tres artículos al mismo tiempo. La relación es de uno a muchos porque varias ventas pueden compartir el mismo `idarticulo`.

**Consumo de APIs.** Con `fetch` revisé `respuesta.ok` porque el servidor puede responder con un error HTTP, como 404, y la promesa aun así se cumple. Axios envía esos errores al `catch` de forma predeterminada. Si la consulta tiene éxito y devuelve una lista vacía, el programa muestra que no hubo resultados.
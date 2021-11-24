/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('todo');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
/*
    Si detecto enemigos en una room que no sea mía, pongo una bandera amarilla con nombre 01, 001, 0001 (el primer nombre que esté libre)
    Si detecto enemigos en una room que no sea mía, mis bichos se van a las flechitas entre la flagRoom y myRoom a esperar. Así la torreta de myRoom les puede curar
    Variables globales
    El miner puede que no necesite container...   
    Los creeps eligen "myContainer" al nacer, y por ejemplo los upgraders deben recorger energia de un contenedor cercano, pero no del de los mineros
X   Guardar en memoria, para cada habitacion, los recursos droppeados, y hacer que al menos el hauler elija recoger de ahí antes que cualquier otra cosa
    Los harvesters también podrían coger energía de los containers, en lugar de farmear, pero lo malo es que luego upgradean, y sería mucho gasto
    las torretas reparan hasta quedarse sin energía, a pesar de que se supone que han de para al superar el 50% de energia
    Ticks to live se guarda en la bandera una sola vez al crearla, y si creep.tickstolive < tickBandera -> Creo un bicho
    Crear tropa!
*/
    
};
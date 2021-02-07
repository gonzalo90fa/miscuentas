/*
 * ------ JS Functions ------
 * ------ Made by GMA Software ------
 * ------ 2020-11-29 ------
 * ------ Updated at 2020-12-26 --------
 * {
 * numberFormat()
 * }
 */
function show_hide(selector, newDisplay, withAnim, fadeInAnim, fadeOutAnim, wait = 750) {
    /*
     * Muestra u oculta cualquier elemento o grupo de elementos. Permite especificar el "display"
     * que tendrá el elemento al mostrarse. También permite activar la colocación de animaciones CSS por clase,
     * tanto al mostrar como al ocultar.
     * ----- VARIABLES -----
     * withAnim: true/false (Activar o desactivar las animaciones).
     * fadeInAnim: .claseCSS (animación CSS al mostrar).
     * fadeOutAnim: .claseCSS (animación CSS al ocultar).
     * wait: 0000s (cantidad de ms que tarda en colocar "display:none" 
     * ( es importante para que las animaciones sean completadas antes de que el elemento se oculte ), por defecto es 750).
     */
    let element = document.querySelector(selector);
    let display = element.style.display;
    if (display != 'none'){
        // Se oculta
        if(withAnim == true){
            element.removeClass(fadeInAnim).addClass(fadeOutAnim);
            setTimeout(() => {
                element.style.display = 'none';    
            }, wait);
        }else{
            element.style.display = 'none';
        }
    }else{
        // Se muestra
        if(withAnim == true){
            element.removeClass(fadeOutAnim).addClass(fadeInAnim);
            setTimeout(() => {
                element.style.display = newDisplay;
            }, wait);
        }else{
            element.style.display = newDisplay;
        }
    }
}
function rightClickEvent(selector,f){
    // Agrega un evento al hacer click derecho al elemento 
    document.querySelector(selector).addEventListener('mousedown',function(e){
        if(e.which == 3){
            f(e);
        }
    });
}
function fileNameInUrl(){
    /*
     * Obtiene y devuelve el nombre del archivo en el que está el usuario basandose en la url.
     */
    var rutaAbsoluta = window.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    return rutaRelativa;  
}
function numberFormat(number, cantDecimales = false, roundDecimals = true, puntoDecimal = ',', separadorMiles = '.'){
    /*
     * cantDecimales: cantidad de decimales que se mostrarán (Si es false se mostrarán todos, este es el valor por defecto)
     * roundDecimals: Redondear los decimales (true/false, true por defecto)
     */
    
     // number --> entrada
    //Cantidad de decimales y redondeo
    let n = parseFloat(number);
    if(cantDecimales != false){
        if(roundDecimals == true){
            n = n.toFixed(2);
            // n --> Decimal redondeado
        }else{
            for(let i = 1; i <= cantDecimales; i++){
                n = n*10;
            }
            n = parseInt(n);
            for(let i = 1; i <= cantDecimales; i++){
                n = n/10;
            }
            // n --> Decimal NO redondeado
        }
    }
    n = n.toString();
    // Se separan el valor entero del decimal
    let entero_y_decimal = n.split('.');
    let entero = entero_y_decimal[0];
    let decimal = entero_y_decimal[1];
    // entero y decimal como array
    let enteroArray = [];
    for (let index = 0; index < entero.length; index++) {
        enteroArray[index] = entero[index];
    }
    let decimalArray = [];
    if(decimal != undefined && decimal != null && decimal != ''){
        for (let index = 0; index < decimal.length; index++) {
            decimalArray[index] = decimal[index];
        }
    }
    // Se separa el entero en grupos de a tres
    let gruposEnteros = [];
    let contador = 1; // Identificador del grupo
    let separador = 1; // Identificador de cada dígito del grupo (1-3)
    let cantSeparadores = Math.trunc(enteroArray.length / 3);
    for (let index = enteroArray.length-1; index >= 0; index--) {
        if(contador == 1){
            gruposEnteros[separador-1] = enteroArray[index];
            contador++;
        }else if(contador == 2){
            gruposEnteros[separador-1] = enteroArray[index] + gruposEnteros[separador-1];
            contador++;
        }else if(contador == 3){
            // Se agrega al tercer dígito del grupo un separador a su izquierda
            gruposEnteros[separador-1] = separadorMiles + enteroArray[index] + gruposEnteros[separador-1];
            contador = 1;
            separador++;
        }        
    }
    // Se guardan todos grupos del entero en un solo String "enteroFinal"
    let enteroFinal = '';
    for (let index = gruposEnteros.length-1; index >= 0; index--) {
        enteroFinal = enteroFinal + gruposEnteros[index];
    }
    // enteroFinal --> Entero ya formateado
    if(enteroFinal[0] == separadorMiles){
        enteroFinal = enteroFinal.substring(1);
    }
    // Se concatena el entero y los decimales y se les agrega un separador
    let numeroFinal
    if(decimal != undefined && decimal != null && decimal != ''){
        numeroFinal = enteroFinal + puntoDecimal + decimal;
    }else{
        numeroFinal = enteroFinal;
    }
    // numeroFinal --> Número completo formateado (Salida)
    return numeroFinal;
}
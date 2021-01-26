<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis cuentas</title>
    <!-- estilos generales -->
    <link rel="stylesheet" href="src/index.css">
    <link rel="stylesheet" href="src/css-classes/colors.css">
    <!-- estilos particulares -->
    <link rel="stylesheet" href="src/components/Navigation/Navigation.css">
    <!-- estilos de componentes -->
    <link rel="stylesheet" href="src/components/AgregarDinero/AgregarDinero.css"></link>
    <link rel="stylesheet" href="src/components/AddMenu/AddMenu.css">
</head>
<body>
    <header class="mainHeader">
        <nav class="Navigation">
            <ul>
               <li><img class="navIcon" src="./src/media/img/iconos/home-white-18dp.svg" alt="icon_home"></img></li>
               <li><img class="navIcon" src="./src/media/img/iconos/sync_alt-white-18dp.svg" alt="icon_records"></img></li>
               <li onclick="AddMenu()"><img class="navIcon good-bg" id="navIcon_2" src="./src/media/img/iconos/add-white-18dp.svg" alt="icon_add"></img></li>
               <li><img class="navIcon" src="./src/media/img/iconos/signal_cellular_alt-white-18dp.svg" alt="icon_analytics"></img></li>
               <li><img class="navIcon" src="./src/media/img/iconos/settings-white-18dp.svg" alt="icon_settings"></img></li>
            </ul>
        </nav>
    </header>
    <div id="div-datosPrincipales"></div>
    <div id="div-AddMenu"></div>
    <div id="div-FormulariosAgregar"></div>
    
    <script src="src/modules/gma_functions.js"></script>
    <script src="src/components/DatosPrincipales/DatosPrincipales.js"></script>
    <script src="src/components/AddMenu/AddMenu.js"></script>
    <script src="src/components/AgregarDinero/AgregarDinero.js"></script>
    <script src="src/App.js"></script>
</body>
</html>
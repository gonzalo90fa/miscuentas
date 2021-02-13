function Navigation() {
  const HTML = `
    <header class="mainHeader">
      <nav class="Navigation">
          <ul>
            <li><img class="navIcon" src="./src/media/img/iconos/home-white-18dp.svg" alt="icon_home"></img></li>
            <li onclick="showRecordsSection('#div-sections')"><img class="navIcon" src="./src/media/img/iconos/sync_alt-white-18dp.svg" alt="icon_records"></img></li>
            <li onclick="ITE_menu()"><img class="navIcon good-bg" id="navIcon_2" src="./src/media/img/iconos/add-white-18dp.svg" alt="icon_add"></img></li>
            <li><img class="navIcon" src="./src/media/img/iconos/signal_cellular_alt-white-18dp.svg" alt="icon_analytics"></img></li>
            <li><img class="navIcon" src="./src/media/img/iconos/settings-white-18dp.svg" alt="icon_settings"></img></li>
          </ul>
      </nav>
    </header>
  `;
  document.getElementById('div-header').innerHTML = HTML;
}

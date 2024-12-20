import Map from 'https://cdn.skypack.dev/ol/Map.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import {Attribution, defaults as defaultControls} from 'https://cdn.skypack.dev/ol/control.js';

const attribution = new Attribution({
  collapsible: false,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  controls: defaultControls({attribution: false}).extend([attribution]),
  target: 'map',
  view: new View({
    center: [0, 0], // Gunakan EPSG:3857
    zoom: 2,
  }),
});

function checkSize() {
  const small = map.getSize()[0] < 600;
  attribution.setCollapsible(small);
  attribution.setCollapsed(small);
}

map.on('change:size', checkSize);
checkSize();

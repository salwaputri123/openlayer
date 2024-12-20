import Feature from 'https://cdn.skypack.dev/ol/Feature.js';
import Map from 'https://cdn.skypack.dev/ol/Map.js';
import Point from 'https://cdn.skypack.dev/ol/geom/Point.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import {Icon, Style} from 'https://cdn.skypack.dev/ol/style.js';
import {StadiaMaps, Vector as VectorSource} from 'https://cdn.skypack.dev/ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'https://cdn.skypack.dev/ol/layer.js';

const iconFeature = new Feature({
  geometry: new Point([0, 0]),
});

const vectorSource = new VectorSource({
  features: [iconFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const rasterLayer = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_toner',
  }),
});

const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const gifUrl = 'data/globe.gif';
const gif = gifler(gifUrl);
gif.frames(
  document.createElement('canvas'),
  function (ctx, frame) {
    if (!iconFeature.getStyle()) {
      iconFeature.setStyle(
        new Style({
          image: new Icon({
            img: ctx.canvas,
            opacity: 0.8,
          }),
        }),
      );
    }
    ctx.clearRect(0, 0, frame.width, frame.height);
    ctx.drawImage(frame.buffer, frame.x, frame.y);
    map.render();
  },
  true,
);

// change mouse cursor when over icon
map.on('pointermove', function (e) {
  const hit = map.hasFeatureAtPixel(e.pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});

################################
WMS layers, sources and features
################################


*****
About
*****
`leaflet.wms`_ is a Leaflet plugin for working with Web Map services.
It provides single-tiled, untiled and non-tiled layers, shared WMS
sources, and ``GetFeatureInfo``-powered identify.

- http://heigeo.github.io/leaflet.wms/
- https://github.com/heigeo/leaflet.wms

.. _leaflet.wms: https://github.com/heigeo/leaflet.wms


This work has been supported by the Flanders Environment Agency (VMM)
on behalf of the CORONA-EU project.

http://shiny.irceline.be/examples/


***********************
IRCELINE RIOIFDM layers
***********************

About
=====
Display multiple WMS layers from http://geo.irceline.be/wms.

- https://source.irceline.be/corona-eu/opendataviewer/blob/master/requirements.md
- https://source.irceline.be/corona-eu/opendataviewer/blob/master/geo.irceline.be/www/pm25_anmean_rioifdm_EN.html#L68-87

Analysis
========
The list of layer prefix labels is ``bc``, ``no2``, ``pm10`` and ``pm25``.


``leaflet.wms`` snippets
========================

Tile layer
----------
https://github.com/heigeo/leaflet.wms#lwmstilelayer
::

    var pm25_rioifdm = L.tileLayer.wms("http://geo.irceline.be/rioifdm/wms", {
            layers: 'rioifdm:pm25_anmean_2017_atmostreet_vl',
        transparent: true,
        format: 'image/png',
            tiled: true,
        opacity: 0.7,
        maxZoom: 19
    });

    var layers_rioifdm_anmean = new L.Control.Layers({
            "Fijn stof PM<sub>10</sub> interpolatie 2017": pm10_rioifdm,
            "Fijn stof PM<sub>2,5</sub> interpolatie 2017": pm25_rioifdm,
            "Stikstofdioxide (NO<sub>2</sub>) interpolatie 2017": no2_rioifdm,
            "Black Carbon (BC) interpolatie 2017": bc_rioifdm
        }, null, {collapsed: true, position: 'topright'}).addTo(map);

::

    map.removeLayer(pm25_rioifdm);


Legend
------
::

    var rioifdmLegend_PM25 = L.control({position: 'bottomleft'});
    rioifdmLegend_PM25.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info scale');
        div.innerHTML +=
        '<img src="https://www.irceline.be/air/legend/pm25_anmean_EN.svg" style="background-color:rgba(255,255,255,0.75);" alt="legend" >';
    return div;
    };

    rioifdmLegend_PM25.addTo(map);
    map.removeControl(rioifdmLegend_PM25);


Stations
--------
https://github.com/heigeo/leaflet.wms#lwmssource
::

    var source = L.WMS.source("http://geo.irceline.be/annual/wms", {
            transparent: true,
            cql_filter: "network = 'Flanders'",
            format: 'image/png',
            tiled: true,
            opacity: 0.7,
            info_format: 'text/html',
            time: '2017'
    });
    var bc_station_anmean = source.getLayer("bc_anmean_station");
    var no2_station_anmean = source.getLayer("no2_anmean_station").addTo(map);
    var pm10_station_anmean = source.getLayer("pm10_anmean_station");
    var pm25_station_anmean = source.getLayer("pm25_anmean_station");


All at once
-----------
https://source.irceline.be/corona-eu/opendataviewer/blob/master/geo.irceline.be/www/pm25_anmean_rioifdm_EN.html#L68-87
::

    var source = L.WMS.source("http://geo.irceline.be/annual/wms", {
        transparent: true,
            format: 'image/png',
            opacity: 0.7,
            info_format: 'text/html',
            time: showYear
    });

    var pm25_station_anmean = source.getLayer("annual:pm25_anmean_station").addTo(map);

    var pm25_rioifdm = L.tileLayer.wms("http://geo.irceline.be/rioifdm/wms", {
            layers: 'rioifdm:pm25_anmean_'+showYear,
        transparent: true,
        format: 'image/png',
        opacity: 0.7,
        maxZoom: 19
    }).addTo(map);

    var layers_pm25_anmean = new L.Control.Layers(null, {
            "Annual mean (interpolated)": pm25_rioifdm,
            "Measured annual mean": pm25_station_anmean
        }, {collapsed: false, position: 'topright'});

    map.addControl(layers_pm25_anmean);


    L.control.attribution({position: 'bottomleft'}).addTo(map);
    map.attributionControl.setPrefix('&copy; <a href="http://www.irceline.be/" target="_blank">IRCEL - CELINE</a> | &copy; <a href="https://vito.be" target="_blank">VITO</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> | <a href="http://leafletjs.com/" target="_blank">Leaflet</a>');

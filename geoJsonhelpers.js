var assert = require('assert');

const latLngToLinestring = (latLng) => {
    assertArrayCoordinatesLooksValid(latLng)
    return {
        type: 'LineString',
        coordinates: latLng
    }
}

const assertArrayCoordinatesLooksValid = (coordinates) => {
    assert(coordinates.length > 0)
    coordinates.forEach(coordinate => {
        if (coordinate.length != 2) {
            throw 'Coordinates array does not appear valid'
        }
    })
}

const convertDbObjects = (dbObjects) => {
    const geoJson = {
        type: 'FeatureCollection',
        features: []
    }
    dbObjects.forEach(dbObject => {
        const coordinates = convertLatLngString(dbObject.latLng)
        geoJson.features.push(
            {
                type: 'Feature',
                geometry: latLngToLinestring(coordinates),
                properties: {
                    name: dbObject.name,
                    id: dbObject.id,
                }
            }
        )
    })
    return geoJson
}

const convertLatLngString = (latLngString) => {
    newLatLng = []
    latLngString.split('|').forEach(
        coordiante => {
            const res = coordiante.split(',')
            newLatLng.push(res.map(str => parseInt(str)))
        }
    )
    return newLatLng
}

module.exports = {
    latLngToLinestring,
    convertDbObjects,
    convertLatLngString
}
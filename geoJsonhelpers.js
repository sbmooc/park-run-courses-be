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

const convertCourses = (courses) => {
    const geoJson = {
        type: 'FeatureCollection',
        features: []
    }
    courses.forEach(course=> {
        const coordinates = convertLatLngString(course.latLng)
        geoJson.features.push(
            {
                type: 'Feature',
                geometry: latLngToLinestring(coordinates),
                properties: {
                    name: course.name,
                    id: course.id,
                }
            }
        )
    })
    return geoJson
}

const convertEvents = (events) => {
    const geoJson = {
        type: 'FeatureCollection',
        features: []
    }
    events.forEach(event => {
        geoJson.features.push(
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [event.longitude, event.latitude]
                },
                properties: {
                    name: event.name,
                    id: event.id,
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

const convertLatLngToLngLat = (latlng) => {
    return latlng.map(corordinates => {return [corordinates[1], corordinates[0]]})
}

module.exports = {
    latLngToLinestring,
    convertCourses,
    convertEvents,
    convertLatLngString,
    convertLatLngToLngLat
}
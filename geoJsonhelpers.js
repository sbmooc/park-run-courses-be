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
        if (coordinate.length != 2){
            throw 'Cordinates array does not appear valid'
        }
    })
}

const convertDbObject = () => {
    console.log('hello')
}

module.exports = {
    latLngToLinestring,
    convertDbObject
}
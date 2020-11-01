const { latLngToLinestring } = require('../geoJsonhelpers')

validGeoJsonGeometry = {
    type: 'LineString',
    coordinates: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
    ]
}

validLatLngArray = [[1, 2], [2, 3], [3, 4], [4, 5]]
invalidLatLngArray = [[1, 2], [2, 3, 4], [3, 4], [4, 5]]

test('expect a valid LatLng array to convert to valid geoJson', () => {
    expect(latLngToLinestring(validLatLngArray)).toEqual(validGeoJsonGeometry);
});

test('expect an invalid LatLng array to throw an error', () => {
    expect(() => latLngToLinestring(invalidLatLngArray)).toThrow();
});
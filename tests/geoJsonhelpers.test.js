const { latLngToLinestring, convertDbObjects, convertLatLngString } = require('../geoJsonhelpers')

const validGeoJsonGeometry = {
    type: 'LineString',
    coordinates: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
    ]
}

// TODO use actual sequalize models, this is ropey af
const testCourse = {
    name: 'TestCourse',
    id: 1,
    eventId: 2,
    latLng: "1,2|2,3|3,4|4,5"
    
}

const testCourseCollection = [
    {
        name: 'TestCourse1',
        id: 1,
        eventId: 2,
        latLng: [
            [1, 2], [2, 3], [3, 4], [4, 5]
        ]
    },
    {
        name: 'TestCourse2',
        id: 2,
        eventId: 2,
        latLng: [
            [1, 2], [2, 3], [3, 4], [4, 5]
        ]
    },
    {
        name: 'TestCourse3',
        id: 3,
        eventId: 2,
        latLng: [
            [1, 2], [2, 3], [3, 4], [4, 5]
        ]
    }
]

const validGeoJsonOneCourse = {
    type: 'FeatureCollection',
    features: [{
        geometry: {
            type: 'LineString',
            coordinates: [[1,2], [2,3], [3, 4], [4, 5]]
        }
    }
    ]
}

latLngString = "1,2|2,3|3,4|4,5"
validLatLngArray = [[1, 2], [2, 3], [3, 4], [4, 5]]
invalidLatLngArray = [[1, 2], [2, 3, 4], [3, 4], [4, 5]]

test('expect a valid LatLng array to convert to valid geoJson', () => {
    expect(latLngToLinestring(validLatLngArray)).toEqual(validGeoJsonGeometry);
});

test('expect an invalid LatLng array to throw an error', () => {
    expect(() => latLngToLinestring(invalidLatLngArray)).toThrow();
});

test('convert a latLng string into an array of coordinates', () => {
    expect(convertLatLngString(latLngString)).toEqual(validLatLngArray);
})

test('convert a Course object GeoJson', () => {
    expect(convertDbObjects([testCourse])).toEqual(validGeoJsonOneCourse)
})

test('convert multiple Course objects to valid GeoJson', () => {
    expect(convertDbObjects(testCourseCollection)).toEqual(validGeoJsonThreeCourses)
})
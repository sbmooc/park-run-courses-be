const {  latLngToLinestring, convertCourses, convertEvents, convertLatLngString, convertLatLngToLngLat} = require('../geoJsonhelpers')

const validGeoJsonGeometry = {
    type: 'LineString',
    coordinates: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
    ]
}

// TODO use actual sequalize models, this is a super ropey approach 
const testCourse = {
    name: 'TestCourse',
    id: 1,
    eventId: 2,
    lnglat: "1,2|2,3|3,4|4,5"
    
}

const testCourseCollection = [
    {
        name: 'TestCourse1',
        id: 1,
        eventId: 2,
        lnglat: '1,2|2,3|3,4|4,5'
        
    },
    {
        name: 'TestCourse2',
        id: 2,
        eventId: 2,
        lnglat: '1,2|2,3|3,4|4,5'
    },
    {
        name: 'TestCourse3',
        id: 3,
        eventId: 2,
        lnglat: '1,2|2,3|3,4|4,5'
    }
]

const validGeoJsonOneCourse = {
    type: 'FeatureCollection',
    features: [{
        geometry: {
            type: 'LineString',
            coordinates: [[1,2], [2,3], [3, 4], [4, 5]]
        },
        type: 'Feature',
        properties: {
            id: 1,
            name: 'TestCourse'
        }
    }
    ]
}

const validGeoJsonThreeCourses = {
    type: 'FeatureCollection',
    features: [
        {
        geometry: {
            type: 'LineString',
            coordinates: [[1,2], [2,3], [3, 4], [4, 5]]
        },
        type: 'Feature',
        properties: {
            id: 1,
            name: 'TestCourse1'
        }
    },
        {
        geometry: {
            type: 'LineString',
            coordinates: [[1,2], [2,3], [3, 4], [4, 5]]
        },
        type: 'Feature',
        properties: {
            id: 2,
            name: 'TestCourse2'
        }
    },
        {
        geometry: {
            type: 'LineString',
            coordinates: [[1,2], [2,3], [3, 4], [4, 5]]
        },
        type: 'Feature',
        properties: {
            id: 3,
            name: 'TestCourse3'
        }
    }
    ]
}

const testEvent = {
    name: 'TestEvent',
    id: 1,
    latitude: 2,
    longitude: 1
}

const testEventCollection = [
    {
        name: 'TestEvent1',
        id: 1,
        longitude: 1,
        latitude: 2,
    },
    {
        name: 'TestEvent2',
        id: 2,
        longitude: 3,
        latitude: 4,
    },
    {
        name: 'TestEvent3',
        id: 3,
        longitude: 5,
        latitude: 6
    }
]

const validGeoJsonOneEvent = {
    type: 'FeatureCollection',
    features: [
        {
        geometry: {
            type: 'Point',
            coordinates: [1, 2]
        },
        type: 'Feature',
        properties: {
            id: 1,
            name: 'TestEvent'
        }
    }
    ]
}

const validGeoJsonThreeEvents = {
    type: 'FeatureCollection',
    features: [
        {
        geometry: {
            type: 'Point',
            coordinates: [1, 2]
        },
        type: 'Feature',
        properties: {
            id: 1,
            name: 'TestEvent1'
        }
    },
        {
        geometry: {
            type: 'Point',
            coordinates: [3, 4]
        },
        type: 'Feature',
        properties: {
            id: 2,
            name: 'TestEvent2'
        }
    },
        {
        geometry: {
            type: 'Point',
            coordinates: [5, 6]
        },
        type: 'Feature',
        properties: {
            id: 3,
            name: 'TestEvent3'
        }
    }
    ]
}


latLngString = "1.5,2.5|-0.2,1.3|-1.3,4|4,5"
validLatLngArrayWithFloats = [[1.5, 2.5], [-0.2,1.3], [-1.3, 4], [4, 5]]
validLatLngArray = [[1, 2], [2, 3], [3, 4], [4, 5]]
invalidLatLngArray = [[1, 2], [2, 3, 4], [3, 4], [4, 5]]

test('expect a valid LatLng array to convert to valid geoJson', () => {
    expect(latLngToLinestring(validLatLngArray)).toEqual(validGeoJsonGeometry);
});

test('expect an invalid LatLng array to throw an error', () => {
    expect(() => latLngToLinestring(invalidLatLngArray)).toThrow();
});

test('convert a latLng string into an array of coordinates', () => {
    expect(convertLatLngString(latLngString)).toEqual(validLatLngArrayWithFloats);
})

test('convert a Course object to valid GeoJson', () => {
    expect(convertCourses([testCourse])).toEqual(validGeoJsonOneCourse)
})

test('convert multiple Course objects to valid GeoJson', () => {
    expect(convertCourses(testCourseCollection)).toEqual(validGeoJsonThreeCourses)
})

test('convert a Event object to valid GeoJson', () => {
    expect(convertEvents([testEvent])).toEqual(validGeoJsonOneEvent)
})

test('convert multiple Events objects to valid GeoJson', () => {
    expect(convertEvents(testEventCollection)).toEqual(validGeoJsonThreeEvents)
})

test('convert latLng to lngLat', () => {
    expect(convertLatLngToLngLat([[1,2], [3,4], [5,6]])).toEqual([[2, 1], [4, 3], [6, 5]])
})
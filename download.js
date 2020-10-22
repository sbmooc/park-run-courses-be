const tiny = require('tiny-json-http')
var url = 'https://images.parkrun.com/events.json'
const db = require('./models')

const filter_uk_events=(response)=>{
    response.features = response.features.filter(
        feature => feature.properties.countrycode == 97
    ).filter(
        feature => feature.properties.seriesid == 1
    )
    save_events_to_db(response)
}

const save_events_to_db=(events)=>{
    for (var event of events.features){
        db.Event.create(
            {
                name: event.properties.EventLongName,
                latitude: event.geometry.coordinates[0],
                longitude: event.geometry.coordinates[1]
            }
        )
    }
}

const download_all_events = (err, response) =>{
    if (err){
        console.error(err)
    }
    else {
        return filter_uk_events(response.body.events)
    }
}

tiny.get({url}, download_all_events)
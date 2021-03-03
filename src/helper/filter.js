const {locationModel, stylesModel} = require("../model/index")

module.exports = {
    styles: async (style) => {
        let filter = {$and:[]}
        const array = []
        let object = {}
        for(key in style) {
            object = {styles:style[key]}
            array.push(object)
        }
        filter.$and = array
        return filter
    },
    locations: async (location) => {
        let filter = {$and:[]}
        const array = []
        let object = {}
        for(key in location) {
            object = {locations:location[key]}
            array.push(object)
        }
        filter.$and = array
        return filter
    },
    both: async (id) => {
        const styles = await stylesModel.find()
        const locations = await locationModel.find()
        let filter = {$and:[]}
        let listLocations = {$and:[]}
        let listStyles = {$and:[]}
        let object = {}
        for(key in id) {
            styles.forEach(el => {
                if(el.id === id[key]) {
                    object = {styles:id[key]}
                    listStyles.$and.push(object)
                }
            });
            locations.forEach(el => {
                if(el.id === id[key]) {
                    object = {locations:id[key]}
                    listLocations.$and.push(object)
                }
            });
        }
        filter.$and.push(listLocations)
        filter.$and.push(listStyles)
        return filter
    }
}
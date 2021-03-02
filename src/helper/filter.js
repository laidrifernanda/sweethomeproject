// const {packageModel,projectModel} = require("../model/index")

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
    both: async () => {
        const listStyle = await stylesModel.find()
        // console.log(listStyle[0]._id, "ini list style")
        listStyle.forEach(element => {
        console.log(element.id, "ini litst style")
        });
    }
}
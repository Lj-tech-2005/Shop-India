

const genrateUniqueName = (originalName) => {

    return Math.floor(Math.random() * 1000) + new Date().getTime() + originalName;


}


module.exports = { genrateUniqueName }
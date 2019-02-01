const image = require('./fetch-image.js');

fetchImage = async (name) => {
    let d = await image(name);
    console.log(d);
}

console.log(fetchImage('abject'));
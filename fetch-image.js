const rp = require('request-promise');
const cheerio = require('cheerio');
const urls = 'http://wordinfo.info/webroot/words/images/';

checkForImage = (name) => {
    return new Promise((resolve, reject) => {
        rp(urls)
            .then(function (html) {
                const $ = cheerio.load(html);
                let param = 'a:contains(' + name + '.jpg)';
                let data = $(param).toArray()[0];
                resolve(data.attribs);
            })
            .catch((error) => {
                reject('Error in retreiving the image', error)
            });
    })
}

module.exports = checkForImage;
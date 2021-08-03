const Datastore = require('nedb-promises');
const { getFilename } = require('../utils');

const getDatabase = async (filename = getFilename()) => {
    const database = Datastore.create(`${process.env.TASKO_INS_DIR.concat('/', filename)}`);
    await database.load();
    return database;
}
module.exports = getDatabase;
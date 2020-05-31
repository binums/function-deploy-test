const MongoClient = require( 'mongodb' ).MongoClient

const auth = {
    user: process.env.user,
    password: process.env.password
}

let db = null

const dbConnect = async () => {
    if ( db ) return db
    const client = await MongoClient.connect( `mongodb://peggycdba01.documents.azure.com:10255/?ssl=true`, {
        auth: auth,
        useUnifiedTopology: true
    } )
    db = client.db( 'peggydb01' )
    return db
}

module.exports = async function ( context ) {
    try {
        const database = await dbConnect()
        let myData = await database.collection( 'c01' ).find().toArray()
        context.res = {
            body: {
                items: myData
            }
        }
    } catch ( err ) {
        context.log( JSON.stringify( err ) )
        context.res = {
            status: 500,
            body: {
                message: "Oops, this is emparassing.... not really!!!!"
            }
        }
    }
}
const {MongoClient} = require("mongodb");

module.exports = {
    selectedDB: null,
    async connect(){
        try{
            const resp = await MongoClient.connect(process.env.MONGO_DB);
            this.selectedDB = resp.db("pets");
            console.log("DB connected Successfully");
        }
        catch(err){
            console.log("Error on Db connecting")
        }
    }
    
}
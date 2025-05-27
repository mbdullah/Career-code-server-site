const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsryxpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const jobCollection = client.db('Career_Code').collection('jobs');

    // Jobs Api

    app.get('/jobs', async(req, res)=> {
      const cursor = jobCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    app.get('/jobs/:id' , async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await jobCollection.findOne(query)
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My career code server site is running!");
});

app.listen(port, () => {
  console.log(`My career code server listening on port ${port}`);
});

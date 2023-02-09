import express from "express"; 
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors";
import bodyParser from "body-parser";
import p from "http-proxy-middleware";

import routers from "./routers/mainRouter";

const app = express();

app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));
app.use(bodyParser.json({limit: "20mb", extended: true}));

app.use(cors());

routers(app);

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>app.listen(process.env.PORT || 5000, ()=>{
        console.log(`you are listening on port and connect mongodb success!`)
    }))
    .catch(err => console.error(err));
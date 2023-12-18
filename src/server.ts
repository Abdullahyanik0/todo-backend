import express, {Express} from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./index"


const server: Express = express();
const cookies = require("cookie-parser");
const bodyParser = require('body-parser');

server.use(cookies());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(express.urlencoded({extended: false}));
server.use(express.json());

const PORT: string | number = process.env.PORT || 4000;


server.use(cors({credentials: true, origin: 'http://localhost:3000'}));
server.use(routes);
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});


const uri: string = `mongodb+srv://mervesanli:NNXXjDpivrvd4fnm@cluster0.yl6wisx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).then(() => {

        server.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`)
            }
        )
    }
).catch(error => {
    console.log(error);
});
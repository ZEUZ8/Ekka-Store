const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const nocache = require("nocache");
require('dotenv').config();
const  connecting  = require("./config/connection")
const { adminChek } = require("./middlewares/authMiddle");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/products");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const addCategory = require("./routes/addCategory");
const custormersRouter = require("./routes/customers");
const user = require("./routes/userRoutes");
const { errorpage } = require("./controllers/userController");

//connecting
const url = process.env.dbURI
connecting(url,function start(){
  app.listen("https://ekka-store.onrender.com")
})

// middleware
app.use(nocache());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// view engine
app.set("view engine", "ejs");


// routes
app.get("/admin",adminChek,adminAuthRoutes);
app.use(adminAuthRoutes)
app.use(addCategory);
app.use(custormersRouter);

app.use("/", authRoutes, user, productRoutes);
//for error pages
app.use('*',errorpage)

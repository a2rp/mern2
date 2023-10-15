require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = process.env.PORT || 1198;

const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");

// middlewares
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

// connect to mongodb and then start server
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB is  connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});

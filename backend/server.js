require("dotenv").config();
const express = require("express"); //for building api server
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expensesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const FactureRoutes = require("./routes/FactureRoutes");


const app = express();

//Middleware to handle cors
app.use(cors({
    origin: process.env.CLIENT_URL || "*", //whitelist my client URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/factures", FactureRoutes);




const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorMiddleware")
const cookieParser = require("cookie-parser");
const protect = require("./middlewares/authMiddleware");
const helmet = require("helmet");
const morgan = require("morgan");
// const generelRoutes = require("./routes/generelRoutes");
// const clientRoutes = require("./routes/clientRoutes");
// const salesRoutes = require("./routes/salesRoutes");
// const managementRoutes = require("./routes/managementRoutes");
const roleRoutes = require("./routes/roleRoute");
const productRoutes = require("./routes/ProductRoutes");
const productCatRoutes = require("./routes/productCatRoute");
const productSubCatRoutes = require("./routes/ProductSubCatRoutes");
const productSubSubCatRoutes = require("./routes/ProductSubSubCatRoutes");
// const Products = require("./routes/ProductRoute");
const customerRoutes = require("./routes/customerRoute");
const orderRoutes = require("./routes/OrderRoutes");
const contentRoutes = require("./routes/contentRoutes");
const galleryRoutes = require("./routes/GalleryCatMasterRoutes");
const galleryDetailsRoutes = require("./routes/GalleryMasterRoutes");
const StocksRoutes = require("./routes/StockRoutes");
const CouponRoutes = require("./routes/couponRoutes");


// const menuRoutes = require("./routes/menuRoutes");



// DATA IMPORTS
const User = require("./models/User");


// MIDDLEWARES
connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy : "cross-origin"
}));
app.use(morgan("common"));
app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.use("/gallery-images", express.static("./uploads/Gallery"));
app.use("/products", express.static("./uploads/Products"));


// Routes Middleware
app.use("/api" ,userRoute);
app.use("/api" ,roleRoutes);
app.use("/category" ,productCatRoutes);
app.use("/subcategory" ,productSubCatRoutes);
app.use("/subsubcategory" ,productSubSubCatRoutes);
app.use("/product" , productRoutes);
app.use("/customer" , customerRoutes);
app.use("/content" , contentRoutes);
app.use("/gallery" , galleryRoutes);
app.use("/gallerydetails" , galleryDetailsRoutes);
app.use("/orders" , orderRoutes);
app.use("/stocks" , StocksRoutes);
app.use("/coupons" , CouponRoutes);
// app.use("/api" , menuRoutes);
// app.use("/general" ,generelRoutes);
// app.use("/client" ,clientRoutes);
// app.use("/sales" ,salesRoutes);
// app.use("/management" ,managementRoutes);

// Error Middleware
app.use(errorHandler);
app.use(protect);

// ROUTES
app.get("/",(req,res)=>{
   res.send("Home Page");
});
app.listen(port,()=>{
    console.log("Server Started on", port);
});


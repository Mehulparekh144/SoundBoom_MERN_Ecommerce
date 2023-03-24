const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(
    "sk_test_51MmwJQSAU8cKS4C0R1N5oHxtbGB4hBrfoWjXUH3lhB2LFRYlrdZXeIEt9zjn0QQSB0QLUAaIIREcIUGgxThxtTH700uN3t6nw7"
);
const cors = require("cors");
require("dotenv").config();
const Product = require("./models/Product");
const User = require("./models/User.js");
const uuid = require("uuid");

//Use
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://127.0.0.1:8000",
    })
);
app.use(express.json());
app.use(cookieParser());
//Variables
const bcryptSalt = bcrypt.genSaltSync(10);

//Connections
app.listen(4000, () => {
    console.log("Server running on http://localhost:" + 4000);
});
mongoose.connect(process.env.MONGO_URL);

//Functions
function isAuthenticatedData(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            req.cookies.token,
            process.env.SECRET_KEY,
            {},
            async (err, data) => {
                if (err) throw err;
                resolve(data);
            }
        );
    });
}

//ROUTES

//Product
//get all products
app.get("/api/products", async (req, res) => {
    const data = await Product.find();
    res.json(data);
});

//Add Products
app.post("/api/products", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);
    const { name, desc, favourite, price, type, image } = req.body;
    if (userDoc.role === "admin") {
        const product = await Product.create({
            name,
            desc,
            favourite,
            price,
            type,
            image,
        });

        res.json(product);
    }
});

//Delete Product
app.delete("/api/product/(:id)", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);
    if (userDoc.role === "admin") {
        await Product.findByIdAndDelete({
            _id : req.params.id
        });

        return res.json("Success")
    }
    else{
        return res.status(403).json("access denied")
    }
});

//Update Product
app.put("/api/product/(:id)", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);
    const {name , desc , image , price , type } = req.body
    if (userDoc.role === "admin") {
        const product = await Product.findByIdAndUpdate({
            _id : req.params.id
        },{
            name : name , desc : desc , image : image , price : price , type : type
        });

        return res.json(product)
    }
    else{
        return res.status(403).json("access denied")
    }
});

//User
//register
app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        return res.status(409).json({ success: false, message: "User exists" });
    }
    try {
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        return res.json({ success: true, newUser });
    } catch (err) {
        return res.status(404).json({ success: false, message: err });
    }
});

//login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passwordCompare = bcrypt.compareSync(password, userDoc.password);
        if (passwordCompare) {
            jwt.sign(
                {
                    email: userDoc.email,
                    id: userDoc._id,
                },
                process.env.SECRET_KEY,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(userDoc);
                }
            );
        } else {
            res.status(401).json({
                success: false,
                message: "Wrong credentials",
            });
        }
    } else {
        res.status(409).json({ success: false, message: "User doesnt exists" });
    }
});

//logout
app.get("/api/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

//profile
app.get("/api/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id, role } = await User.findById(
                userData.id
            ).select("-password");
            res.json({ name, email, _id, role });
        });
    } else {
        res.json(null);
    }
});

// Add Cart Items
app.post("/api/cart/add", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id)
    const cart = req.body;
    
    const totalPrice= cart.reduce((acc,item)=>{
        return acc + (item.quantity * item.price)
    },0) + 2

    const cartItem = {
        cart : cart ,
        price : totalPrice , 
        time: new Date(Date.now()).toISOString() 
    }

    try {
        await User.findOneAndUpdate({
            _id : userDoc._id ,
        },
        {
            $push : {cart : cartItem}
        }, {new:true})

        return res.json(userDoc)
    } catch (error) {
        return res.status(404).json(error)
        
    }

});

//Payment
app.post("/api/create-checkout-session", async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.desc,
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        };
    });
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["US", "IN"] },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: { amount: 200, currency: "inr" },
                    display_name: "Free shipping",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 5 },
                        maximum: { unit: "business_day", value: 7 },
                    },
                },
            },
        ],
        line_items,
        mode: "payment",
        success_url: `${process.env.BASE_URL}/checkout-success?payment_status=success`,
        cancel_url: `${process.env.BASE_URL}/payment`,
    });


    res.send({ url: session.url , success : session.success_url , cancel : session.cancel_url });
});


//Get Cart Items
app.get("/api/cart", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);

    if (userDoc.cart.length > 0) {
        return res.json(userDoc.cart);
    }
});

//Get users

app.get("/api/users", async (req, res) => {
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);
    if (userDoc.role === "admin") {
        const allUsers = await User.find();
        return res.json(allUsers);
    } else {
        return res.status(401).json("Access denied");
    }
});

//Remove user
app.delete("/api/removeuser/(:id)", async (req, res) => {
    const id = req.params.id;
    const userData = await isAuthenticatedData(req);
    const userDoc = await User.findById(userData.id);
    if (userDoc.role === "admin") {
        try {
            await User.deleteOne({ _id: id });
            await User.save;
            res.json(`Userid : ${id} Deleted`);
        } catch (error) {
            res.status(404).json(error);
        }
    } else {
        return res.status(401).json("Access denied");
    }
});

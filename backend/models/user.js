const {Schema,model}=require("mongoose");
var {createHmac,randomBytes} = require("crypto");
const { type } = require("os");
const UserSchema= new Schema({
    username:{
        type:String,
        required:true,
       unique:true,
    },
    email:{
          type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    salt:{
        type:String,
    },
    subscriptions:{
        type:[
            {
        endpoint:String,
        expirationTime:Date,
        keys:{
            p256dh:String,
            auth:String,
        },
    },
        ],
        default:[],

    },
});

UserSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password"))return;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
    next();
})

const USER=model("user",UserSchema);

module.exports=USER;


// profilepic:{
//  type:String,
//         default:"/images/image.png",

//     }
//     ,
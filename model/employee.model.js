const mongoose=require("mongoose")

const empSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    department:{
        type:String,
        enum:["Tech","Marketing","Operations"],
        default:"Tech"
    },
    salary:Number
},
{
    versionKey:false
})

const EmpModel=mongoose.model("employee",empSchema)

module.exports={
    EmpModel
}
const express = require("express");
const { EmpModel } = require("../model/employee.model");

const dashRouter = express.Router();

// Pagination, Sorting, Filtering, and Searching
dashRouter.get("/dashboard", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        let query = {};

        // Filtering by Department
        if (req.query.department) {
            query.department = req.query.department;
        }

        // Searching by First Name
        if (req.query.firstName) {
            query.firstName = { $regex: req.query.firstName, $options: "i" };
        }

        // Sorting by Salary
        const sortField = req.query.sort || "salary";
        const sortOrder = req.query.order === "desc" ? -1 : 1;
        const sort = { [sortField]: sortOrder };

        const employees = await EmpModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalEmployees = await EmpModel.countDocuments(query);

        res.status(200).json({
            employees,
            totalPages: Math.ceil(totalEmployees / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Filter by Department
dashRouter.get("/employees/department/:department", async (req, res) => {
    try {
        const { department } = req.params;
        const employees = await EmpModel.find({ department });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search by First Name
dashRouter.get("/employees/search", async (req, res) => {
    try {
        const { firstName } = req.query;
        const employees = await EmpModel.find({
            firstName: { $regex: firstName, $options: "i" },
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout
dashRouter.get("/logout", async (req, res) => {
    try {
        // Remove JWT token from local storage or session
        // Redirect to login route
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    dashRouter,
};











// const express=require("express");
// const { EmpModel } = require("../model/employee.model");


// const dashRouter=express.Router();


// dashRouter.get("/dashboard",async(req,res)=>{
//     let users=await EmpModel.find();
//     res.status(200).json(users);
// })

// dashRouter.post("/employees",async(req,res)=>{
//     const {email}=req.body;
//     let emp=await EmpModel.findOne({email})
//     if(emp){return res.json("User Already exists")}
//     try {
//         let newEmp=new EmpModel(req.body);
//         await newEmp.save();
//         res.status(200).json({msg:"New emp added.."})
//     } catch (error) {
        
//     }
// })

// dashRouter.patch("/employees/:id",async(req,res)=>{
//     const {id}=req.params;
//    try {
//     await EmpModel.findByIdAndUpdate({_id:id},req.body)
//     res.json({msg:`emp with userid ${id} updated`})

//    } catch (error) {
//     res.status(400).json({error:error.message})
//    } 
// })

// dashRouter.delete("/employees/:id",async(req,res)=>{
//     const {id}=req.params;
//    try {
//     await EmpModel.findByIdAndDelete({_id:id})
//     res.status(202).json({msg:`emp with ID:${id} has been Deleted`})
//    } catch (error) {
//     res.status(400).json({error:error.message})
//    }
    
// })



// module.exports={
//     dashRouter
// }
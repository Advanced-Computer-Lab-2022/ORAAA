const { text } = require('express')
const asyncHandler=require('express-async-handler')
const Data =require('../Models/dataModel')

//@desc get my data
//@route GET /api/website
//@access private
const getdata = asyncHandler(async(req,res) =>{
    const data = await Data.find() 
    res.status(200).json(data)
})


//@desc set my data
//@route POST /api/website
//@access private
const setdata = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }  
    const data= await Data.create({text:req.body.text})
    res.status(200).json(data)
})


//@desc update my data
//@route PUT /api/website/:id
//@access private
const updatedata = asyncHandler(async(req,res) =>{
    const data= await Data.findById(req.params.id)
    
    if(!data){
        res.status(400)
        throw new Error('data not found')
    }
    const updateData= await Data.findByIdAndUpdate(req.params.id,req.body,{new:true})

     res.status(200).json(updateData)
})


//@desc delete my data
//@route DELETE /api/website/:id
//@access private
const deletedata = asyncHandler(async(req,res) =>{
    const data= await Data.findById(req.params.id)
    
    if(!data){
        res.status(400)
        throw new Error('data not found')
    }
    await data.remove()
    res.status(200).json({id:req.params.id})
})



module.exports= {
    getdata, 
    setdata,
    updatedata,
    deletedata,
}
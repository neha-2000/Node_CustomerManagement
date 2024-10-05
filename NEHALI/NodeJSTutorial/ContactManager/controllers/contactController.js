//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts=(req,res)=>{
    res.status(403).json({"message":"Get All contacts"});
}


//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact=(req,res)=>{
    console.log("req",req.body)
    const{name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({message:"Create Contact"})
}

//@desc Get single contact
//@route GET /api/contacts/:id
//@access public
const getContact=(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});
}


//@desc Update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact=(req,res)=>{
    res.status(200).json({message:`Update contact for id : ${req.params.id}`})
}


//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact=(req,res)=>{
    res.status(200).json({message:`Contact deleted for ${req.params.id}`})
}



module.exports={getContacts,getContact,createContact,getContact,updateContact,deleteContact}
const validator = require('validator')

const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
     if(!firstName || !lastName){
        throw new Error("Name is not valid")
     }
    else if (!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Please enter string password")
    }

}

const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","gender","age","emailId","photoUrl","about","skills"]
    const isEditAllowed =Object.keys(req.body).every(field=>allowedEditFields.includes(field))
    return isEditAllowed;
}

const validateNewPasswordStrength=(req)=>{
    const {password}=req.body

 if (!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password")
    }

}
module.exports={validateSignUpData,validateEditProfileData,validateNewPasswordStrength}
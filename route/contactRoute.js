const router = require('express').Router();
const nodemailer = require('nodemailer');


router.post('/contact', (req, res)=>{

let data = req.body;



if(data.name.length===0 || data.email.length===0 || data.message.length===0){
    return res.json({msg:'please fill all the fields'})
}



// smtp is protocol for transporting every email providers support this protocol
let smtpTransport = nodemailer.createTransport({

 service:'Gmail',
//  the connect port
port:465,


// for authenticate
auth:{
    user:'odkolas@gmail.com',
    pass:'file@mou@21'
}

})


let mailOptions = {
    from:data.email,
    to:'odkolas@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
    <h3>Informations</h3>
    <ul>
     <li>Name: ${data.name}</li>
     <li>Name: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    
    
    `
}

smtpTransport.sendMail(mailOptions, (err)=>{

try {
   
    if (err) return res.status(400).json({msg:'Please fill all the fields'})

 
        res.status(200).json({msg:'Message was send succesfully'}) 

        smtpTransport.close();
   

} catch (err) {
   if (err) return res.status(500).json({msg:'There is server error, try again'}) 
}


})


});


module.exports = router;
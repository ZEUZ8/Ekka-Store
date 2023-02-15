const AccountSID = "AC80815df9fb1dcbd548a3db59b8f58c7d";
const ServiceSID = "VA4fd96d19d8a0ded60b863c490ece9914";
const AuthToken = "69d8c9e9ef5a3410be6c9a9cdab0d67f";
const twilio = require('twilio')(AccountSID,AuthToken)

const User = require('../models/User')

const verify_get = (req,res)=>{
    res.render('user/otp')
}

let password 

const verify_post = async (req, res) => {
    const Token =  req.cookies.jwt;
    const mobile = req.body.mobile

    console.log(userData.mobile)
    if(Token){
        res.redirect('/login')
    }else{
            if(await User.findOne({mobile:mobile})){
                res.render('user/verify')
            }
            else{
                // console.log(mobile)
                twilio.verify.v2
                .services(ServiceSID)
                .verifications.create({ to:`+91${mobile}`, channel: "sms" })
                .then((verification) => {
                    res.render("user/otpVerify",{mobile});
                    
                } )
                .catch(err=>{
                    console.log(err)
                    redirect('user/signup')
                })
            }
    }
};

const otpVerifyPost = async (req, res) => {
    console.log("user up here sldfjl;ksajdlfjlasjdfljal;dsgl;jlgh;lsdlfjlkadjlfjaldjfl;kasdlkfkjdlkfjgldjsflk")
    const enterOtp = req.body.userOtp
    const mobile = req.params.mobile
    console.log(mobile);
        twilio.verify.v2
            .services(ServiceSID)
            .verificationChecks.create({ to: `+91${mobile}`, code: enterOtp })
            .then((verification_check) => {
                console.log(verification_check.status);
                // resolve(verification_check);
                res.redirect("/")
            })
            .catch(err =>{
                console.log(err)
                res.redirect('/signup')
            })

};





// .then(async (varification_check) => {
//     if (varification_check.status == "approved") {
//         console.log("userData saved");
//         res.redirect("/signup");
//     } else {
//         req.redirect("/verify");
//     }
// });



// function verifyotp(mobile, otp) {
//     return new Promise((resolve, reject) => {
//         client.verify.v2
//             .services(ServiceSID)
//             .verificationChecks.create({ to: `+91 ${mobile}`, code: otp })
//             .then((verification_check) => {
//                 console.log(verification_check.status);
//                 resolve(verification_check);
//             });
//     });
// }


module.exports ={
    verify_get,
    verify_post,
    otpVerifyPost,
}
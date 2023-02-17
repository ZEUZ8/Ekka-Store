const AccountSID = process.env.AccountSID;
const ServiceSID = process.env.ServiceSID;
const AuthToken = process.env.AuthToken;
const twilio = require('twilio')(AccountSID,AuthToken)

const User = require('../models/User')

const verify_get = (req,res)=>{
    res.render('user/otp')
}

let password 

const verify_post = async (req, res) => {
    const Token =  req.cookies.jwt;
    const mobile = req.body.mobile
    if(Token){
        res.redirect('/login')
    }else{
        console.log("in the first else cse and wirting")
            if(await User.findOne({mobile:mobile})){
                res.render('user/verify')
            }
            else{
                console.log("function entered the eflse case")
                // console.log(mobile)
                twilio.verify.v2
                .services(ServiceSID)
                .verifications.create({ to:`+91${mobile}`, channel: "sms" })
                .then((verification) => {
                    console.log("falso the otp sended to the number")
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
    const {mobile,password} = req.params.mobile
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


const otp_sendForPassword = async (req, res) => {
    const Token =  req.cookies.jwt;
    const mobile = req.body.mobile
    if(Token){
        res.redirect('/login')
    }else{
        console.log("in the first else cse and wirting")
            if(await User.findOne({mobile:mobile})){
                console.log("function entered the eflse case")
                // console.log(mobile)
                twilio.verify.v2
                .services(ServiceSID)
                .verifications.create({ to:`+91${mobile}`, channel: "sms" })
                .then((verification) => {
                    console.log("falso the otp sended to the number")
                    res.render("user/otpVerify",{mobile});
                    
                } )
                .catch(err=>{
                    console.log(err)
                    redirect('user/signup')
                })
               
            }
            else{
                res.json({numberError:true})
            }
    }
};



const otp_verifyForPassword = async (req, res) => {
    const Token =  req.cookies.jwt;
    const mobile = req.body.mobile
    if(Token){
        res.redirect('/login')
    }else{
        console.log("in the first else cse and wirting")
            if(await User.findOne({mobile:mobile})){
                res.render('user/verify')
            }
            else{
                console.log("function entered the eflse case")
                // console.log(mobile)
                twilio.verify.v2
                .services(ServiceSID)
                .verifications.create({ to:`+91${mobile}`, channel: "sms" })
                .then((verification) => {
                    console.log("falso the otp sended to the number")
                    res.render("user/otpVerify",{mobile});
                    
                } )
                .catch(err=>{
                    console.log(err)
                    redirect('user/signup')
                })
            }
    }
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
    otp_sendForPassword,
    otp_verifyForPassword
}
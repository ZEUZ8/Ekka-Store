const AccountSID = "AC80815df9fb1dcbd548a3db59b8f58c7d";
const ServiceSID = "VA4fd96d19d8a0ded60b863c490ece9914";
const AuthToken = "VA4fd96d19d8a0ded60b863c490ece9914";

const client = require("twilio")(AccountSID, AuthToken);

// client.verify.v2.services.create({ friendlyName: "GIGANT ELEKTRA" }).then(() => console.log("OTP Ready"));

function sendotp(mobile) {
    console.log(mobile+"i am jher")
    client.verify
        .services(ServiceSID)
        .verifications.create({ to:`+91 ${mobile}`, channel: "sms" })
        .then((verification) =>  console.log("otp sended to the user and waiting for the user otp input") );
   ;
    
}

function verifyotp(mobile, otp) {
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(ServiceSID)
            .verificationChecks.create({ to: `+91 ${mobile}`, code: otp })
            .then((verification_check) => {
                console.log(verification_check.status);
                resolve(verification_check);
            });
    });
}


const local_app = function () {}

// * ———————————————————————————————————————————————————————— * //
// * 	init
// *
// *	gets called upon starting enduro.js production server
// *	@param {express app} app - express app
// *	@return {nothing}
// * ———————————————————————————————————————————————————————— * //
local_app.prototype.init = function (app) {
	// express app available here
	// don't forget these routes will be available on production server server (defaults to localhost:5000)
	const bodyParser = require('body-parser');
	const nodemailer = require('nodemailer');
  
	app.use(bodyParser.urlencoded({ extended: true }));
  
	app.post('/contact', function(req, res) {
	  var body = req.body;
	  var firstName = body.firstName;
	  var lastName = body.lastName;
	  var email = body.email;
	  var message = body.message;
  
	  var composedMessage = {
		text: 'Hey Person!\n\n' +
		  `${firstName} ${lastName} has contacted you through your website. Here is their contact information and message: \n\n` +
		  `First Name: ${firstName} \n` +
		  `Last Name: ${lastName} \n` +
		  `Email Address: ${email} \n` +
		  `Message: ${message} \n\n`,
		subject: 'Website Inquiry'
	  };
  
	  var nodemailer = require('nodemailer');

	  let transporter = nodemailer.createTransport({
        host: 'mail.webified.pl',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'kontakt@webified.pl', // generated ethereal user
            pass: 'Kmiotek666!' // generated ethereal password
		},
		tls: {
            rejectUnauthorized:false
        }
    });
	  
	  var mailOptions = {
		from: firstName,
		to: 'kamilzajac@int.pl',
		subject: 'Sending Email using Node.js',
		text: message
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
});
}


module.exports = new local_app()

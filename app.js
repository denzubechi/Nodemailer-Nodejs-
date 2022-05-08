const express = require('express')
var exphbs = require('express-handlebars')
const path = require("path")
const nodemailer = require('nodemailer')

const app = express();
var hbs = exphbs.create({ /* config */})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false}))

//static folder
app.use('/public', express.static(path.join(__dirname,'/public')))

app.get('/', (req, res) => {
    res.render('contact');
});
app.post('/send',(req,res)=>{
    const output = `
    <p>you have a new request</p>
    <h3>Contact Details</h3>
    <ul> 
        <li>Name : ${req.body.name}</li>
        <li>company : ${req.body.company}</li>
        <li>email : ${req.body.email}</li>
        <li>phone : ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'email username',
            pass:'Your email password'
        }
    }) 
    const mailOptions = {
        from:'officialsam371@gmail.com',
        to: 'chukwumasamuel371@gmail.com',
        subject:'Node request',
        html: output
    };
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
        res.render('contact', {msg: 'email has been sent'})
    })
})

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});
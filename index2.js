const express = require('express');

const path = require('path');
const app = express();
const moment = require('moment');
const uuid = require('uuid'); 



const members1 = [
    {
        name: 'John Doe',
        id: 1,
        email:'jd@gmail.com',
        status: 'active',
    },
    {
        name: 'Maria Hague',
        id: 2,
        email:'mh@gmail.com',
        status: 'active',
    },
    {
        name: 'Anita jackson',
        id: 3,
        email:'aj@gmail.com',
        status: 'active',
    }];
    const logger = (req, res, next) => {
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
        next();
    };
    app.use(logger);
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));

// } );

app.get('/api/members1/:id', (req,res)=> {
    const found = members1.some(member => member.id === parseInt(req.params.id));

    if(found){
    res.json(members1.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(405).json({msg:'Member not found'});
    }
 });

 app.post('/',(req,res)=> {
    const myMember = {
        id: uuid.v4(),
        name:req.body.name,
        status:'active',
        email:req.body.email
    };
        if(!myMember.name || !myMember.email){
            return res.status(400).json({msg:'Please include name and emial'})
        }
        members1.push(myMember);
        res.json(members1);
    
 });
// app.get('/api/members1', (req,res) => {
//     res.json(members1);
// })

// app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server is up and running on port ${PORT}`));
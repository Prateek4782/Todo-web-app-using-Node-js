const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://prateek:prateek@cluster0.yu4vtay.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('MongoDb is Connected')
})
const userSchema = new mongoose.Schema({
    title:"String",
    description:"String",
    date: { type: Date, default: Date.now }
})
app.get('/', async (req,res)=>{
    const User = mongoose.model('todo', userSchema)
    let data = await User.find()
    res.render('home', {users:data})
})

app.get('/todo-list',async(req,res)=>{
    const User = mongoose.model('todo', userSchema)
    let data =await User.find()

    res.render('todo-list', {users:data})
})
app.get('/index',(req,res)=>{
    res.render('index')
})
app.post('/add-todo',(req,res)=>{
    const User = mongoose.model('todo', userSchema)
    let data = new User({
        title:req.body.title,
        description:req.body.description
    })
    data.save()
    console.log(data)
    res.redirect('/')
})

app.post('/go-add',(req,res)=>{
    res.render('index')
})

app.post('/delete',async(req,res)=>{
    const User = mongoose.model('todo', userSchema)
    let data =await User.deleteOne({description:req.body.description})
    res.redirect('/todo-list')
})
app.post('/edit',async(req,res)=>{
const User = mongoose.model('todo', userSchema)
let data = await User.findOne({description:req.body.description})
res.render('edit', {users:data})
})
app.post('/update-user', async (req, res) => {
    const User = mongoose.model('todo', userSchema);
    const data = await User.updateOne(
      { description: req.body.oldDescription },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          date:new Date()
        }
      }
    );
    console.log(data);
    res.redirect('/');
  });
  
app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})

if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config()
}


const express=require('express')
const app=express();
const expressLayouts=require('express-ejs-layouts')
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
const indexRouter=require('./routes/index')

const mongoose=require('mongoose');
mongoose.createConnection(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true
})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.on('open',()=>console.log('connected to mongoose'))
app.use('/',indexRouter)
app.listen(process.env.PORT||3000)
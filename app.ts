
import { error } from "console";
import express, { NextFunction, Request,response,Response } from "express"
const app = express();
const port = 3000 ;


// parser
app.use(express.json());
app.use(express.text())
// Middleware
const logger =(req:Request, res:Response, next:NextFunction) =>{
    console.log(req.url, req.method,req.hostname );
    next();
}
// Router 
const UserRouter = express.Router()
const CourseRouter = express.Router();

app.use('/api/v1/users',UserRouter)
app.use('/api/v1/courses',CourseRouter)

UserRouter.get('/create-user',(req:Request,res:Response)=>{
    const user = req.body;
    console.log(user);
    res.json({
        success:true,
        message:"User created successfully ",
        data: user
    })
})

CourseRouter.post('/createCourse',(req:Request,res:Response)=>{
    const course = req.body;
    console.log(course);
    res.json({
        success:true,
        message:"this is courses",
        data:course
    })
})
 app.get('/:userId',logger,async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.params.userId);
    try{
        res.send(req.body)
    }catch(err){
        console.log(err);
        next(err)
    }
    
 })
 app.post('/',(req:Request,res:Response)=>{
    console.log(req.body);
    res.send("Got data")
 })
//  method error 

app.all("*",(req:Request,res:Response)=>{
    res.status(404).json({
        success:false,
        message:"Not found this Router "
    })
})
// Global error Handler
app.use((error:any, req:Request,res:Response, next:NextFunction)=>{
    console.log(error);
    if(error){
        res.status(404).json({
            success:false,
            message:"failed to send from global handler "
        })
    }
})


export default app;
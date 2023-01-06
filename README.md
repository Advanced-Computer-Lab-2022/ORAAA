# ORAAA
This web application is developed as part of a university project.

Table of Contents:
1. Project Description
2. Installations
3. How to Run
4. Testing
5. Credits
6. License


## Project Description
This is a worldwide **Online Learning Platform** where anyone could sign up and watch prerecorded courses. The purpose of this web application is to create an organized studying system that is easy to navigate. This platform does not only include the recorded courses but also content-based quizzes.

## Installations
We used the **MERN Stack** format and these are the main packages you need to install beforehand:
```bash
npm install nodemon
npm install mongoose
npm install express
npm install react
npm install axios
npm install git
```
You will find the rest of the packages we installed in the **package.json** file, one includes the frontend packages and the other includes the backend packages.
## How to Run
In order to run the code you need to write the following commands in your terminal:

(to run the backend)
```bash
npm run server
```
(to run the frontend)
```bash
npm run start
```
You will be redirected to your default search engine on your computer, Google Chrome for example, with the website up and running.

## Testing
Throughout the code we used **Postman** in order to check our get/post/put/delete methods. We made sure that the outcome was visible in the database (MongoDB).
*Try this code sample to check on Postman whether the login data is saved in the database or not.*
This is an example of how we connect our **server.js** file to the routes:
```javascript
const express = require('express')
const app = express()        app.use('/api/common',require('./routes/commonRoutes'))
```
This is an example of a **route**:
```javascript
const express = require('express')
const router=express.Router()
const {login}=require('../controllers/commonControllers')
const {protect} = require('../middleWare/authMiddleware')

router.post('/login',login)
module.exports=router
```
This is the body of one of the **post** methods:
```javascript
//@desc  login
//@route POST /api/common/Login
//@access public
const login = asyncHandler(async(req,res)=>{
    const {userName,password} = req.body

    const Ninstructor = await Oinstructor.findOne({userName})
    const Nadmin = await Oadmin.findOne({userName})
    const NcorporateTrainee = await OcorporateTrainee.findOne({userName})
    const NindividualTrainee = await OindividualTrainee.findOne({userName})
      
    if(Ninstructor && (await bcrypt.compare(password,Ninstructor.password))){
        
        res.json({
            name: Ninstructor.userName,
            token: generateToken(Ninstructor._id),
            typee: Ninstructor.instance,
            acceptedTerms:Ninstructor.acceptedTerms
        })



    }else if(Nadmin && (await bcrypt.compare(password,Nadmin.password))){
        res.json({
            name: Nadmin.userName,
            token: generateToken(Nadmin._id),
            typee: Nadmin.instance
        })


    }else if(NcorporateTrainee && (await bcrypt.compare(password,NcorporateTrainee.password))){
        res.json({
            name: NcorporateTrainee.userName,
            token: generateToken(NcorporateTrainee._id),
            typee: NcorporateTrainee.instance,
            enrolled:NcorporateTrainee.inrolledCourses?NcorporateTrainee.inrolledCourses:[]
        })


    }else if(NindividualTrainee && (await bcrypt.compare(password,NindividualTrainee.password))){
        res.json({
            name: NindividualTrainee.userName,
            token: generateToken(NindividualTrainee._id),
            typee: NindividualTrainee.instance,
            enrolled:NindividualTrainee.inrolledCourses.length? NindividualTrainee.inrolledCourses:[]
        })


    }else{
        res.status(400)
        throw new Error('Invalid userName or password')
    }
})
```
This is how your Postman window should look like when you run the code above *http://localhost=4000/api/common/login* and choose the POST method.
![POSTMAN]([https://imgbb.com/8jjTD42](https://imgbb.com/8jjTD42))
 

## Credits
These are some of the videos we used that helped us understand the MERN Stack and gave us a head start on our code:
```
https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA
https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY
https://www.youtube.com/watch?v=fgTGADljAeg
https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK
https://www.youtube.com/watch?v=mbsmsi7l3r4
https://www.youtube.com/watch?v=-RCnNyD0L-s
https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
```


## License 
Apache 2.0 https://img.shields.io/npm/l/apache

### Done By:

Abdullah El-Dahrawy 49-5825
Omar Khaled 49-8076
Aseel Khedr 49-0687
Ali El-Hennawi 49-0687
Rahma El-Shamy 49-0999

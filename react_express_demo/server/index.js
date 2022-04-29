const express = require('express');
const request = require('request');
const cors = require("cors");
const mysql = require('mysql');


//password encryption librry import
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const saltRounds = 10;

//cookie import 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { response } = require('express');

const app = express();

//connection
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'password',
    database:'imperial_health',
    timezone: '+04:00'
});

//auto parses info to json from front end
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'], //finds local host set to port
    methods: ["GET", "POST"], //enbles cookies for get and post requests
    credentials: true //this has to be set to true
}));


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//uses the cookie
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));




//creation of the session and cookie
app.use(session({
    key:"userId",
    secret: "senior",
    credentials: 'include',
    resave:false,
    saveUninitialized: false,
    cookie: {
        expires:  86400000,
        httpOnly:false
    },
}))



app.post('/register', (req,res,result) => {
    
    //grab username and password fields from front end
    //make sure var names are same as in front end (see register function username(THIS):username)
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const age = req.body.age; //added age param for DB
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    

    //check to see if inputs are empty if so display message

    db.query("SELECT * FROM user WHERE username = ?;", [username],(err,result) => {

        if(err) {
            console.log(err);
            res.send({err:err});
        } 

        if(result.length !== 0) {
            console.log('user exists already')
            res.send({message:'username taken'});
        } else {
            if(req.body.email === '' || req.body.password === '' || req.body.username === '' || req.body.age === '') {
    
                //sends message to console to be picked up from front end
                //console.log('user NOT registered');
                res.send({message:'One or more inputs are empty'})
        
                } else {
        
                    //ensures password is > 6
                    if(req.body.password.length < 6) {
                        //console.log('password must be greater than 6 characters');
                        res.send({message:'Password must be greater than 6 characters'});
                    } else {
        
                        //encrypts password, inside param it takes password then saltrounds, instead of passing password we pass hash
                        bcrypt.hash(password,saltRounds, (err, hash) => {
                            if(err) {
                                res.send({err:err});
                            }
        
                            
                            //console.log(date);
                            
                            //example here of hash being passed as password
                            db.query("INSERT INTO user (email, username, password, age, register_date) VALUES (?,?,?,?,?)", [email, username, hash,age,date],
                                (err,result) => {
                                    if(err) {
                                        res.send({err:err});
                                    }
                                }
                                
                            );
                            
                            //logs if user is registered
                            console.log('user registered'); 
                            //sends a message to console so it can be parsed to front end 
                            res.send({message:"User Registered!"});
                            
                        })
                    }
                    }
        }
    })
})

//lets the server know a session is in progress, loggedIn is set to TRUE, the user is set to the current session


app.get("/profile", (req,res) => {

    const userID = req.body.userID;

    if(req.session.user) {
        
        const user_id =  req.session.user[0].id;

        const history_query = db.query("SELECT * FROM user_history WHERE user_id = ?;",
        [user_id],
        (err,result) => {
            if(!err) {
                res.send({loggedIn: true, user: req.session.user, user_history: result});
            } 

            console.log('result from /profile: ', result);
        })

    } else {
        res.send({loggedIn: false});
    }
});

app.get("/diagnosis", (req,res) => {
    
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})

    } else {
        res.send({loggedIn: false});
    }
});

app.post('/login', (req,res) => {

    //grab username and password fields from front end
    //make sure var names are same as in front end (see register function username(THIS):username)

    const username = req.body.username;
    const password = req.body.password;
    var login_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if(req.body.username == '' || req.body.password == '') {
        console.log('one or more inputs are empty')
        res.send({message:'Username or password is empty'});
    } else {

      


        db.query("SELECT * FROM user WHERE username = ?;",
        [username],
        (err,result) => {

            
            //if there an err then log the error
            if(err) {
                console.log(err);
                res.send({err:err});
            }
            
            //if result has been returned (aka if it exists in DB)
            if(result.length > 0) {
                // res.send(result); //send the object 
                //compares encrypted passsword to current password
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        //start session AND cookie
                        req.session.user = result;

                        console.log('RESULT --> ',  req.session);
                        
                        console.log('username-->', result[0].username);
                        
                        res.send(result)

                        
                       
                    } else {
                        res.send({message: "username/password is incorrect..."});
                    }
                });
                //console.log('success!');
                console.log('SESSION ID', req.session.sessionID);
            } else { 
                res.send({message: "User does not exist"}); //error statement
                console.log('Username/Password is incorrect');
            }     
        }
    );
    }
})

app.get("/login", (req,res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
        
    } else {
        res.send({loggedIn: false});
    }
});

app.post('/diagnosis', (req,res) => {

    //res.send({test: "test"});

    //vars from front(state) end need to be sent here to back end
    
   
    const user_id = req.body.user_id;
    const selected_issue = req.body.singleIssue;
    const symptoms = req.body.symptoms;
    const specialist = req.body.specialist;
    const med_cond = req.body.med_cond;
    let date = req.body.date;
    let symptoms_string = symptoms.toString();
    let specialist_JSON = JSON.stringify(specialist);
    let illness_desc = req.body.illness_desc;
    let illness_treatment = req.body.illness_treatment;
    
    date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    


    var arr = [];
    for(let i =0; i < specialist.length; i++) {
        arr.push(specialist[i].Name);
    }

    var specialistToString = arr.toString();
    
    db.query("INSERT INTO user_history (user_id, selected_issue,medical_condition,saved_date,specialist,symptoms,illness_description,illness_treatment) VALUES (?,?,?,?,?,?,?,?)", [user_id, selected_issue, med_cond,date,specialistToString, symptoms_string,illness_desc,illness_treatment],
        (err, result) => {
            if(err) {
                console.log('an error occured')
                res.send({err:err});
                console.log(err);
            } else {
                console.log('success!');
                console.log(date);
            }

        })
})

// app.get('/diagnosis', (req,res) => {
//     if(req.session.user) {
//         console.log('user logged');
//         res.send({message: 'test message'});
//     }
// })

app.get('/logout', (req,res) => {    

    var user_session = req.session.user;
    
    if(req.session.user) {
        req.session.destroy(function(err) {
            
            
            //destory cookie
            res.clearCookie('userId');
            

            console.log('logged out!');
            res.send({message:"Logged out..."});
        })
       
    } else {
        console.log('no user logged in');
        console.log('USER: ', user_session);
    }
})

app.get('/check_session', (req,res) => {
    var user_session = req.session.user;

    

    if(user_session == undefined) {
        console.log('no session');
        //res.redirect('/logout');
    } else {
        console.log('session in progress');
        console.log(user_session);
    }
})

//SYMPTOMS
//const SYMPTOM_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdG8yNTI3QHlhaG9vLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNzAyOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjEtMDktMTAiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NDk4MDU2NTEsIm5iZiI6MTY0OTc5ODQ1MX0.TW7fVxVlxerwzcfZAURaGVIUOdQXxPhx5TLldnN67u8';
const SYMPTOM_URL = 'https://healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRjbGFwcHN5QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNzk2NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjItMDQtMjIiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2NTExODI5MzcsIm5iZiI6MTY1MTE3NTczN30.yKUcq2jUg8qhMbrp0VZm-_7659UaZTYZ4u_0yEZVlAs&format=json&language=en-gb';

app.get("/symptoms", (req,res) => {
    request(SYMPTOM_URL,
        function(error,response,body) {
            
            if(!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                var symptom_data = parsedBody;
                res.send(JSON.stringify(symptom_data));
            }
           
        }
    );
})



app.listen(5000, () => {console.log("App listening on port 5000")});




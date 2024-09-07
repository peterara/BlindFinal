const express=require("express");
const request=require("request");
const bodyparser=require("body-parser");
const https=require("https");

const app=express();
app.use(express.static("images"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  var username=req.body.Username;
  var email=req.body.Email;
  var password=req.body.Password;
  console.log(username);
  console.log(email);
  console.log(password);

  var data={
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:username,
      USERNAME:email
    }
  };

  var json=JSON.stringify(data);
  const url='https://us10.api.mailchimp.com/3.0/lists/825861cabd/members';

  const options = {
    method:"post",
    auth:"neeraj1:da030ee6bd351845fd9a1d67b851a77d-us10"

  };
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.send("User is Subsscribed");
  }
  else{
    res.send("there is some problem while sighning you up");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(json);
request.end();

});
app.listen(3000,function(){
  console.log("server is ready");
});

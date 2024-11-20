Other APIS
POST / contactUs
Inquiry {
timeframe  
 country  
 state  
 city  
 firstname  
 lastname  
 contactNumber
email  
 message  
}
save this in DB and send Email to Admin and User Both

GET / contactUs

Fetch All Inquiries (Newest 1st)

POST / subscribe
model Subscriptions {
email  
}
Save Subscribe to DB and send Email to User

GET / subscribe
fetch list of emails

IMPORTANT APIS

POST /make transaction
You will get
{
UserData:{
name  
 email  
 phoneNo  
 companyName  
 address:{
country  
 streetAddress  
 apartment  
 city  
 state  
 pinCode
}
},
ProductData:[
{
productId,
quantity
}
]
,
transactionData:{
amount
transactionState
transactionIdentifier
dateTime
errorMessage
}
}

check user exist with same email if yes then update user data else create user with data
User model will look like this
User{
name  
 email  
 phoneNo  
 companyName  
 purchasesItems
[
{
productId:Id of Product,
quantity,
transactionId: transactionIdentifier of Transaction
}

]
address:{
country  
 streetAddress  
 apartment  
 city  
 state  
 pinCode
}
}

Then Create a Transaction Record
model of Transaction Record will look like this

model Transaction {
transactionid  
 email email of user  
 amount  
 products:[
{
productId,
quantity
}
]
transactionState (error or success)
transactionIdentifier optional (it will be there is transaction state is success)
dateTime Date default(now())
errorMessage optional (it will be there is transaction state is error)
}

and then
update purchasesItems of User

POST /login
get email with req.body , send otp to email and send hashed otp to user as response

POST /checkOTP
get otp and hashed otp and email with req.body
if both matched then
make a new user with that email,
while setting other attributes as blank/null
and return token

GET /getUser
get token in header and return userdata

POST /product
add Product to DB
Product Model will Look like this
model Product {
id  
 name  
 imgsrc  
 diffrentby  
 Factor  
 cost
description
}
make sure that
if product exist with same name then the diffrentby has to same for new record

GET /product/:id
if id == "all" then return all records without description
else
return that one record with all data

PUT /product/:id
get new data from req.body and replace it with product in db

Local Changes
Save User Cart and User Shipping Address

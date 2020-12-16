<h1 style='font-size:50px'>Particle IOT Project</h1>

<img src='./particle.png'></img>
<p> Connect my particle to my wifie network</p>

<hr>
dotenv.config()

var db_credentials = new Object();
db_credentials.user = 'jotnajoa'
db_credentials.host = 'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa'
db_credentials.password = process.env.AWSRDW_PW,
db_credentials.port = 5432;
<hr>

<p> setting my connection</p>


var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

<p> Create a table for data collection</p>
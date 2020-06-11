var async = require('async');
var express = require("express");
var app = express();
var server = app.listen(process.env.PORT || 8080, function () {
var port = server.address().port;

var Connection = require('tedious').Connection;  
    var config = {  
        server: 'localhost',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'nishant', //update me
                password: 'nishant1'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'calender'  //update me
        }
    }; 

    
    console.log("App now running on port", port);
 });
    
    /*var connection = new Connection(config);  
    connection.on('connect', function(err) {  
         console.log("Connected");  
        executeStatement();
        });
      */
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES; 
   
    
    app.get('/', function (req, res) {     
        var result;
        var connection = new Connection(config);  
        connection.on('connect', function(err) 
        {  
            console.log("Connected");  
            read();
        });
   
  
        function read() {  
            request = new Request("SELECT * from [dbo].[events] ", function(err) {  
            if (err) {  
            console.log(err);}  
            });  
            var result = "";  
            request.on('row', function(columns) {  
            columns.forEach(function(column) {  
            if (column.value === null) {  
                //console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            }); 
            console.log("Getting Results"); 
            console.log(result);   
            
            });  
  
            request.on('done', function(rowCount, more) {  
                //console.log(rowCount + ' rows returned');  
            });  
            connection.execSql(request);
        }//exec
        res.send('GET request to the homepage');
        console.log(result);
        res.send(result);
    });
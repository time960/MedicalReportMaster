const { spawn } = require('child_process');
const fs =require('node:fs/promises');
const path=require( 'node:path');
module.exports.model_predict=async function(req, res){
    try{
      //  const model = await loadModel();
        // console.log(model);
    
        const data = req.body;
    
        //console.log("START",data);
        const pythonProcess = spawn('python', ['python_script.py', 'predict', JSON.stringify(data)]);
        console.log("Started");
        let prediction = 0;
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Model output: ${data}`);
            // if(data.length>0)
            return res.json({ prediction: JSON.parse(data)[0] });
       
        });
       
    }
    catch(err){
    console.log(err);
    }
    };

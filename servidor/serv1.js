const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alonso_24122005_",
    database: "grifo"
})


//buscar por trabajador
app.get("/trabajador/:nom", (req, res)=>{
    const nom = req.params.nom;
    db.query("call buscar_trabajador(?)", [nom], (err, results)=>{
        if(err){
            console.error(err);
            res.status(500).json({error: "error en el servidor."});
        }else{
            res.send(results[0]);
        }
    })
})


//buscar venta por dni
app.get("/venta/:denei", (req, res)=>{
    const denei=req.params.denei;
    db.query("CALL buscar_venta(?)", [denei], (err, results)=>{
        if (err){
            console.error(err);
            res.status(500).json({error: "Error en el servidor."})
        }else{
            res.send(results[0]);
        }
    })
})


//para el combobox
app.get("/gasolina", (req, res)=>{
    db.query("SELECT tipo FROM combustible", (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


app.get("/gasolina/:tipoGas", (req, res)=>{
    const tipoGas = req.params.tipoGas;
    db.query("call busq_gasolina(?)", [tipoGas], (err, results)=>{
        if(err){
            console.error(err);
            res.status(500).json({error: "error en el servidor."});
        }else{
            res.send(results[0]);
        }
    })
})



const puerto=3003;
app.listen(puerto, ()=>{
    console.log("Puerto activado.")
})
import Axios from "axios"
import { useEffect, useState } from "react";

function App1(){
    const [nom, setNom] = useState("");  //Trabajador
    const [listaTrab, setListaTrab] = useState([]);


    const[tipoGas, setTipoGas] = useState("");
    const[listaGas, setListaGas]=useState([]);
    const[listarbusquedaGas, setListarbusquedaGas]=useState([]);




    const buscarTrabajador = (nom) => {
        Axios.get(`http://localhost:3003/trabajador/${nom}`).then((res)=>{
            setListaTrab(res.data);
        })
    }

    const listarGasolinas = () => {
        Axios.get("http://localhost:3003/gasolina").then((res)=>{
            setListaGas(res.data);
        })
    }

    const buscarxGasolina = (tipoGas) => {
        Axios.get(`http://localhost:3003/gasolina/${tipoGas}`).then((res)=>{
            setListarbusquedaGas(res.data);
        })
    }

    useEffect(()=>{
        listarGasolinas();
    }, []);



    return(
        <div className="container p-2">
            <div className="row">
                <div className="col-xl-4">
                    <div className="form-group">
                        <label className="form-label">Nombre del trabajador: </label>
                        <input className="form-control" value={nom} onChange={(e)=>setNom(e.target.value)} required></input>
                    </div>
                    <button className="btn btn-primary mt-2" onClick={()=>buscarTrabajador(nom)}>Buscar trabajador</button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-xl-8">
                    <table class="table table-hover border">
                        <thead>
                            <th>Dni</th>
                            <th>Nombre</th>
                            <th>Turno</th>
                            <th>ver</th>
                        </thead>
                        <tbody>
                            {listaTrab.map((t, index)=>(
                                <tr key={index}>
                                    <td>{t.dni}</td>
                                    <td>{t.nombre}</td>
                                    <td>{t.turno}</td>
                                    <td><a href={`/venta/${t.dni}`}>venta</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-xl-4">
                    <label className="form-label">Tipo de gasolina </label>
                        <select
                            value={tipoGas}
                            onChange={(e) => {
                            const tipo = e.target.value;
                            setTipoGas(tipo);
                            buscarxGasolina(tipo)
                            }}
                        >
                        <option value="">Seleccione un tipo de gasolina</option>
                    {listaGas.map((g) => (
                        <option key={g.tipo} value={g.tipo}>
                        {g.tipo}
                        </option>
                        ))}
                    </select>
                    <table class="table table-hover mt-4 border">
                        <thead>
                            <th>Hora</th>
                            <th>Trabajador</th>
                            <th>Total</th>
                        </thead>
                        <tbody>
                            {listarbusquedaGas.map((ga, index)=>(
                                <tr key={index}>
                                    <td>{ga.nombre}</td>
                                    <td>{ga.hora}</td>
                                    <td>{ga.importe}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )


}
export default App1;
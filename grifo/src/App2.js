import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function App2(){
    const {denei} = useParams();
    const [listaVen, setListaVen] = useState([]);

    const buscarVenta = (denei) =>{
        Axios.get(`http://localhost:3003/venta/${denei}`).then((res)=>{
            setListaVen(res.data);
        })
    }

    useEffect(()=>{
        buscarVenta(denei);
    }, [denei])

    return (
    <div className="container mt-4">
      <h3>Ventas del trabajador:</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Tipo de combustible</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          {listaVen.map((v, index) => (
            <tr key={index}>
              <td>{v.hora}</td>
              <td>{v.tipo}</td>
              <td>{v.importe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="mt-2 btn btn-primary" href="/">Volver al inicio</a>
    </div>
  );
}
export default App2;
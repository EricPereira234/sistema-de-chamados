import "./dashboard.css";
import { useState } from 'react';
import { Link } from "react-router-dom";

//importando arquivos
import Title from '../../components/Title';
import Header from '../../components/Header';

//importando icones
import { FiEdit3, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";

export default function Dashboard() {

  const [chamado, setCamado] = useState(true);


  return (
    <>
      <Header />
      <div className="content">
        <Title name={'Atendimentos'} >
          <FiMessageSquare size={25} />
        </Title>

        {chamado.length === 0 ? (
          <div className="container dashboard" >
            <span>Nenum chamado registrado...</span>
            <Link to={'/new'} className="new" >
              <FiPlus size={25} color="#fff" />
              Novo chamado
            </Link>
          </div>

        ) : (
          <>

            <Link to={'/new'} className="new" >
                <FiPlus size={25} color="#fff" />
                Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col" >cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado</th>
                  <th scope="col">#</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="Cliente" > Sujeito </td>
                  <td data-label="Assunto" > Suporte </td>
                  <td data-label="Status" >
                    <span className="badge" style={{ backgroundColor: '#5cb85c' }}  > Em aberto</span>
                  </td>

                  <td data-label="Cadastrado" > 25/12/2021 </td>

                  <td data-label="#" >
                    <button className="action" style={{ backgroundColor: '#3583f6' }} >
                      <FiSearch color="#fff" size={17} />
                    </button>
                    <button className="action" style={{ backgroundColor: '#f6a935' }} >
                      <FiEdit3 color="#fff" size={17} />
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>

          </>

        )}

      </div>

    </>
  )
}
import "./dashboard.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { format } from "date-fns";



//importando arquivos
import Title from '../../components/Title';
import Header from '../../components/Header';
import Modal from "../../components/Modal";

//importando icones
import { FiEdit3, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";


import firebase from "../../services/firebaseConnection";

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');


export default function Dashboard() {

  const [chamado, setCamado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIstEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();


  useEffect(() => {
    loadChamados();

    return () => { }
  }, []);


  async function loadChamados() {
    await listRef.limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
      .catch(() => {
        toast.error('Chamados não encontrados');
        setLoadingMore(false);
      })

    setLoading(false);
  }

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente.nomeFantasia,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          status: doc.data().status,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyy'),
          complemento: doc.data().complemento
        })
      })

      //pegando o ultimo documento buscado
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];

      setCamado(chamado => [...chamado, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIstEmpty(true);
    }
    setLoadingMore(false);
  }


  //carregando mais chamados
  async function CarregaMais() {
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(4)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
  }

  //modal
  function togglePostModal(item) {
    setShowPostModal(!showPostModal)// trocando de true para false
    setDetail(item);
  }



  if (loading) {
    return (
      <>

        <Header />
        <div className="content">
          <Title name={'Atendimentos'} >
            <FiMessageSquare size={25} />
          </Title>
        </div>
        <div className="container dashboard" >
          <span>Buscando chamados....</span>
        </div>

      </>
    )
  }

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
                {chamado.map((item, index) => {

                  return (
                    <tr>
                      <td data-label="Cliente" > {item.cliente} </td>
                      <td data-label="Assunto" > {item.assunto} </td>
                      <td data-label="Status" >
                        <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}  >{item.status}</span>
                      </td>

                      <td data-label="Cadastrado" > {item.createdFormated} </td>

                      <td data-label="#" >
                        <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => togglePostModal(item)} >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link className="action" style={{ backgroundColor: '#f6a935' }} to={`/new/${item.id}`} >
                          <FiEdit3 color="#fff" size={17} />
                        </Link>
                      </td>
                    </tr>
                  )

                })}


              </tbody>

            </table>

            {!loadingMore && !isEmpty && <button className="btn-Chamados" onClick={CarregaMais} >Buscar Mais</button>}

          </>

        )}

      </div>

      {showPostModal && (
        <Modal 
          conteudo ={detail}
          close = {togglePostModal}
        />
      )}

    </>
  )
}
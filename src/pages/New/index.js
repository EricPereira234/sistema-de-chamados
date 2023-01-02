import "./new.css";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

//importando o firebase
import firebase from "../../services/firebaseConnection";

//importando arquivos
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";

//importando icones
import { FiPlus } from "react-icons/fi";

export default function New() {

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customersSelected, setCustomersSelected] = useState(0);

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
                .get()
                .then((snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })

                    if (lista.length === 0) {
                        toast.error('não existe empresa cadastrada !');
                        setCustomers([{ id: 1, nome: 'eric' }]);
                        setLoadCustomers(false);
                        return;
                    }

                    setCustomers(lista);
                    setLoadCustomers(false);

                })
                .catch((error) => {
                    setLoadCustomers(false);
                    setCustomers([{ id: 1, nome: 'eric' }]);
                })

        }

        loadCustomers()
    }, [])


    // funcão que salva os chamados
    async function hadleRegister(e) {
        e.preventDefault();
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customersSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success('Chamado criado com sucesso!');
            setComplemento('');
            setCustomersSelected(0);
        })
        .catch((erro)=>{
            toast.error('Erro ao cadastar chamado!');
        })
    }

    //chama quando troca o assunto
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }
    //chama quando troca o status
    function options(e) {
        setStatus(e.target.value);
    }

    //chamado quando troca o cliente
    function handleChageCustomers(e) {
        setCustomersSelected(e.target.value);
    }

    return (
        <>

            <Header />
            <div className="content">
                <Title name={'Novo Chamado'} >
                    <FiPlus size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile" onSubmit={hadleRegister} >
                        <label>Cliente</label>
                        {loadCustomers ? (
                            <input type={'text'} disabled={true} value={'Carregando...'} />
                        ) 
                        :
                            <select value={customersSelected} onChange={handleChageCustomers} >
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>

                        }


                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect} >
                            <option value='Supore'>Suporte</option>
                            <option value='Visita Técnica'>Visita Técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>


                        <label>Status</label>
                        <div className="status">
                            <input
                                type={'radio'}
                                name='radio'
                                value={'Aberto'}
                                onChange={options}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value={'Progresso'}
                                onChange={options}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value={'Atendido'}
                                onChange={options}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva seu problema (opcional)'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit" >Salvar</button>
                    </form>
                </div>
            </div>

        </>
    )
}
import "./new.css";
import { useState, useEffect, useContext } from "react";

//importando arquivos
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";

//importando icones
import { FiPlus } from "react-icons/fi";

export default function New(){

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    const { user } = useContext(AuthContext);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers ] = useState([]);

    useEffect(()=>{
        async function loadCustomers(){

        }

        loadCustomers()
    },[])



    function hadleRegister(e){
        e.preventDefault();
        alert('teste')
    }

    //chama quando troca o assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }
    //chama quando troca o status
    function options(e){
        setStatus(e.target.value);
    }

    return (
        <>
        
            <Header/>
            <div className="content">
                <Title name={'Novo Chamado'} >
                    <FiPlus size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile" onSubmit={hadleRegister} >
                        <label>Cliente</label>
                        <select>
                            <option key={1} value={1}>
                                Sujeito
                            </option>
                        </select>

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
                            onChange={(e)=>setComplemento(e.target.value)}
                        />

                        <button type="submit" >Salvar</button>
                    </form>
                </div>
            </div>
        
        </>
    )
}
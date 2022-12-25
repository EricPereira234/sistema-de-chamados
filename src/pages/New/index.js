import "./new.css";

//importando arquivos
import Header from "../../components/Header";
import Title from "../../components/Title";

//importando icones
import { FiPlus } from "react-icons/fi";

export default function New(){

    function hadleRegister(e){
        e.preventDefault();
        alert('teste')
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
                        <select>
                            <option value='Suport'>Suporte</option>
                            <option value='Visita Técnica'>Visita Técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>


                        <label>Status</label>
                        <div className="status">
                            <input
                                type={'radio'}
                                name='radio'
                                value={'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value={'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type={'radio'}
                                name='radio'
                                value={'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type='text'
                            placeholder='Descreva seu problema (opcional)'
                        />

                        <button type="submit" >Salvar</button>
                    </form>
                </div>
            </div>
        
        </>
    )
}
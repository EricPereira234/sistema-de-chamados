import "./Modal.css";

//importando icones
import { FiX } from "react-icons/fi";

export default function Modal({ conteudo, close }) {
    return (
        <>
            <div className="modal" >
                <div className="container">
                    <button className="close" onClick={close}>
                        <FiX size={23} color='#fff' />
                        Voltar
                    </button>

                    <div>
                        <h2>Detalhes do chamado</h2>
                        <div className="row" >
                            <span>
                                Cliente: <a>{conteudo.cliente}</a>
                            </span>
                        </div>

                        <div className="row" >
                            <span>
                                Assunto: <a>{conteudo.assunto}</a> Criado em: <a>{conteudo.createdFormated}</a>
                            </span>
                        </div>

                        <div className="row" >
                            <span>
                                Status: <a>{conteudo.status}</a>
                            </span>
                        </div>

                        <div className="row" >
                            <span>
                                Complemento: <p>{conteudo.complemento}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
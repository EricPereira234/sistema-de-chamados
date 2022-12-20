import "./customers.css";
import { useState } from "react";

//importando arquivos
import Title from "../../components/Title";
import Header from "../../components/Header";

//importando icones
import { FiUser } from "react-icons/fi";

export default function Customers(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    
    return(
        <>
            <Header/>
            <div className="content" >
                <Title name={'Clientes'} > 
                    <FiUser size={25} />
                </Title>
                <div className="container" >
                    <form className="form-profile customers">
                        <label>Nome fantaisa</label>
                        <input type={'text'} value={nomeFantasia} onChange={(e)=>setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type={'text'} value={cnpj} onChange={(e)=>setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type={'text'} value={endereco} onChange={(e)=>setEndereco(e.target.value)} />

                        <button type="submit" >Cadastrar</button>
                    </form>
                </div>
            </div>
           
        </>
    )
}
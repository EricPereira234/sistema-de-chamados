import "./customers.css";
import { useState } from "react";
import { toast } from "react-toastify";

//importando arquivos
import Title from "../../components/Title";
import Header from "../../components/Header";

//importando o firebase 
import firebase from "../../services/firebaseConnection";

//importando icones
import { FiUser } from "react-icons/fi";

export default function Customers(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    //cadastrando clientes
   async function handleAdd (e) {
        e.preventDefault();
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.success('Cliente cadastrado com sucesso!');
            })
            .catch((erro)=>{
                toast.error('cliente não foi cadastrado! '+erro);
            })
        }else{
            toast.error('preencha todos os campos !');
        }
    }
    
    return(
        <>
            <Header/>
            <div className="content" >
                <Title name={'Clientes'} > 
                    <FiUser size={25} />
                </Title>
                <div className="container" >
                    <form className="form-profile customers" onSubmit={handleAdd} >
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
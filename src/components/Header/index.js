import { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";


//importando arquivos
import { AuthContext } from "../../contexts/auth";

//importando icones
import {FiHome, FiSettings, FiUser } from "react-icons/fi";


export default function Header(){
    const {user} = useContext(AuthContext);

    return(
        <div className="sidebar" >
            <div>
                <img src={user.avatarUrl === null? avatar : user.avatarUrl} alt='Foto Avatar' />
            </div>

            <Link to={'/dashboard'} >
                <FiHome color="#fff" size={24} />
                chamados
            </Link>
            <Link to={'/customers'} >
                <FiUser color="#fff" size={24} />
                clientes
            </Link>
            <Link to={'/profile'} >
                <FiSettings color="#fff" size={24} />
                congigurações
            </Link>
        </div>
    )
}

import "./profile.css";

//importando aquivos
import Header from "../../components/Header";
import Tilte from "../../components/Title";

//importando icones
import { FiSettings } from "react-icons/fi";

export default function Profile() {
    return (
        <div>
            <Header />
            <div className="content" >

                <Tilte name = "Meu perfil" >
                    <FiSettings size={25} />
                </Tilte>

            </div>
        </div>
    )
}
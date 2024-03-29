import "./profile.css";
import { useState, useContext } from "react";
import {toast} from "react-toastify";

//importando aquivos
import Header from "../../components/Header";
import Tilte from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../assets/avatar.png";

//importando icones
import { FiSettings, FiUpload } from "react-icons/fi";

//importando o firebase
import firebase from "../../services/firebaseConnection";

export default function Profile() {
    const {user, signOut, setUser, storageUser} = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avaterUrl);
    const [imageAvatar, setImageAvatar] = useState(null);


    //previl da imagem 
    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }else{
                toast.error('envie uma imagem do tipo jpeg ou PNG');
                setImageAvatar(null);
                return null;
            }
        }
    }

    //salvando imagem do perfil
     async function handleUpload(){
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async ()=>{
            toast.success('imagem enviada com sucesso!');

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then( async (url)=>{
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(()=>{
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    };

                    setUser(data);
                    storageUser(data);
                })

            })
        })
    }

   async function handleSave(e){
        e.preventDefault();

        if(imageAvatar == null && nome !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            }).then(()=>{
                let data = {
                    ...user,
                    nome: nome
                };
                setUser(data);
                storageUser(data);
                toast.success('alterado com sucesso!');
            })
        } else if(nome !== '' && imageAvatar !== null){
            handleUpload();
        }

    }


    return (
        <div>
            <Header />
            <div className="content" >

                <Tilte name = "Meu perfil" >
                    <FiSettings size={25} />
                </Tilte>

                <div className="container" >
                    <form className="form-profile" onSubmit={handleSave} >
                        <label className="label-avatar" >
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>
                            <input type='file' accept="image/*"  onChange={handleFile} /><br/>
                            { avatarUrl == null ?
                             <img src={avatar} width='250' height='250' alt='Foto de perfil do usurário' /> 
                             :
                             <img src={avatarUrl} width='250' height='250' alt='Foto de perfil do usurário' />
                            }
                        </label>

                        <label>Nome</label>
                        <input type={'text'} value={nome} onChange={(e)=>setNome(e.target.value)} />

                        <label>Email</label>
                        <input type={'text'} value={email} disabled={true}  />
                        <button type="submit" >Salvar</button>
                    </form>
                </div>

                <div className="container" >
                    <button className="btn-logout" onClick={()=> signOut()}>Sair</button>
                </div>

            </div>
        </div>
    )
}
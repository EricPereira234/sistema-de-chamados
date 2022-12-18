
import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

//importando os alerts
import {toast} from "react-toastify";

// criando o constext
export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');

  useEffect(()=>{

    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
  
      setLoading(false);
    }
    
    loadStorage();

  }, []);


  //fazendo login do usuario cadastrado
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value)=>{
      let uid = value.user.uid;

      const useProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: useProfile.data().nome,
        avatarUrl: useProfile.data().avatarUrl,
        email: value.user.email
      };
        
        toast.success(`Bem Vindo(a) de volta ${data.nome}`);
        setUser(data);
        storageUser(data);
        setNome(data.nome);
        setLoadingAuth(false);
    }).catch((error)=>{
      toast.error('usuáro não cadastrado!')
      setLoadingAuth(false);
    });
  }

 //função que salva usuarios
  async function signUp(email, password, nome){
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;

      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: nome,
        avatarUrl: null,
      })
      .then( () => {

        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };

        toast.success(`Seja bem-vindo(a) a plataforma ${data.nome}`);

        setUser(data);
        storageUser(data);
        setNome(data.nome);
        setLoadingAuth(false);

      })

    })
    .catch((error)=>{
      console.log(error);
      alert(error)
      setLoadingAuth(false);
    })

  }



  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  // deslogando o usuário
  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    toast.success(`Até Breve ${nome}`);
    setUser(null);
  }


  return(
    <AuthContext.Provider 
    value={{ 
      signed: !!user,  
      user, 
      loading, 
      signUp,
      signOut,
      signIn,
      loadingAuth,
      setUser,
      storageUser
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

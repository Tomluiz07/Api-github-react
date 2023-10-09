import "./styles.css"

import { useState } from "react"

import  background  from "../assets/background.png"

import { Header }  from "../Components/Header"

import ItemList  from "../Components/ItemList"



const Pages = () => {
  
  const [user, setUser] = useState('')
  const [currentUser, setcurrentUser] = useState(null);
  const [repos, setRepos ] = useState(null);
        
   const handleGetData = async () => {  
     const userData = await fetch(`https://api.github.com/users/${user}`)
     const newUser = await userData.json()
 
     if (newUser.name) {
       const { avatar_url, name, bio, login } = newUser;
       setcurrentUser({ avatar_url, name , bio, login})
 
       const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
        );
       const newRepos = await reposData.json();
 
       if(newRepos.length){
         setRepos(newRepos)
       }
     } 
    }
 
  
    return (
       <> 
        <Header/>  
       <section className="intro">  
                 
       <div className="img-logo">
         <img className="background" src={background}/>
       </div>
         
             
     <div className="container">      
       <div className="search">
         <input name="usuario" 
            value={user}
            placeholder="@usuario"
            onChange={event => setUser(event.target.value)}
          />
    
          <button onClick={handleGetData}>Buscar</button>    
    
      </div> 
  
    {currentUser?.name ?(
       <>
         <div className="perfil" >            
            <img src={currentUser.avatar_url} className="profile" alt="imagem-profile"/>           
            <div>
              <h3>{currentUser.name} </h3>
               <span>{currentUser.login}</span>
               <p>{currentUser.bio}</p>
            </div>
          </div>
        <div> 
           <hr/> 
        </div>
       </>
       ):null}
         {repos?.length ?( 
          
             <div className="repositories">
                <h1>Repositorios</h1>
               {repos.map(repo => (
                  <ItemList  title={repo.name} description={repo.description} />
               ))}
               
            </div>
      
          ):null}   
          </div>        
        </section>
   
      </>

    )

}


export default Pages;

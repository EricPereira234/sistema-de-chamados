import "./tilte.css";

export default function Tilte({children, name}){
    return(
        <div className="title" >
            {children}
            <span>{name}</span>
        </div>
    )
}
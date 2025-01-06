import {useState} from "react";
const User=(props)=>{
    const[count]=useState(0);
    return(
        <div className="user-card">
        <h2>Count={count}</h2>
        
        <h3>Name:{props.name}</h3>
        <h4>Location:Hyderabad</h4>
        <h4>Contact:@vishal2000</h4>

        </div>
    );

};
export default User;
import React from "react";
class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userinfo:{
                name:"dummy",
                location:"gygdj",
            }
        };
    }
    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/Vishal24682");
        const json=await data.json();
        this.setState({userinfo:json});
        console.log(json);
    }
    render(){
        const{name,location,avatar_url}=this.state.userinfo;
        return (
          <div className="user-card">
          <img src={avatar_url}/>
            <h3>Name:{name}</h3>
            <h4>Location:{location}</h4>
            <h4>Contact:@vishal2000</h4>
          </div>
        );
    }
}
export default UserClass;
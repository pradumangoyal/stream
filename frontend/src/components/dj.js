import React, { Component } from 'react'
import dj from './images/dj_emoji.gif'
import MessageAlertImage from './message_alert_reaction'
import DJName from './dj_name'

import dj_logo from './images/dj_logo.png'
export default class DJImage extends Component{
render(){
return(
<div className="dj">
<div className="djcontainer">
    <img src={dj} alt="dj" />
    <div className="djreaction"><MessageAlertImage /></div>
 </div>
    <div className="djname"><DJName /></div>
</div>
);

}

}

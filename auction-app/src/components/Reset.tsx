import axios from "axios";
import React from "react";

function Reset(){
    React.useEffect(() => {
        axios.post('http://localhost:4941/api/v1/reload')
            .then(res => {
                console.log(res);
            })
    }, []);
    return (<div>
        <h1>Reset</h1>
    </div>);
}
export default Reset
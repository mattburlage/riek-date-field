import React, { useState } from 'react'
import RIEDateField from "./RIEDateField";

function App() {
    let [date, setDate] = useState(new Date())

    return (
        <div style={{margin: '30px', textAlign: 'center'}}>
            Here it is: <br/><br/>
            <RIEDateField
                value={date}
                onChange={setDate}
            />
            <hr/>
            {date.toString()}
        </div>
    );
}

export default App;

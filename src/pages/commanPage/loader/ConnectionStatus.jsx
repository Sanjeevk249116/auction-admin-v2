import React from 'react'
import { PulseLoader } from 'react-spinners'

function ConnectionStatus() {
    return (
        <span
            className="flex gap-1 align-center lighten-4 p-1 red red-text "
            style={{
                borderBottomRightRadius: "10px"
            }}
        >
            <PulseLoader color="red" size={10} />

            <b>We are trying to connect you.</b>
        </span>
    )
}

export default ConnectionStatus


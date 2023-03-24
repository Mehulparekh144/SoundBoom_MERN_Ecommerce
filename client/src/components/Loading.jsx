import React from 'react'
import { Audio } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='h-[70vh] grid place-items-center '>
            <Audio
                height="100"
                width="100"
                color="#002B5B"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />

        </div>
    )
}

export default Loading

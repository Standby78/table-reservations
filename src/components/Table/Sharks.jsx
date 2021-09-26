import React from 'react';
import shark from './shark.png';

const Shark = () => (
    <>
        <path id="path" d="M-5,10a10,5 0 1,0 20,0a10,5 0 1,0 -20,0" stroke="none" fill="none" />
        <image href={shark} height="20" width="20">
            <animateMotion begin="0s" dur="6s" repeatCount="indefinite" rotate="auto" fill="freeze">
                <mpath xlinkHref="#path" />
            </animateMotion>
        </image>
        <image href={shark} height="20" width="20">
            <animateMotion begin="2s" dur="6s" repeatCount="indefinite" rotate="auto" fill="freeze">
                <mpath xlinkHref="#path" />
            </animateMotion>
        </image>
        <image href={shark} height="20" width="20">
            <animateMotion begin="4s" dur="6s" repeatCount="indefinite" rotate="auto" fill="freeze">
                <mpath xlinkHref="#path" />
            </animateMotion>
        </image>
    </>
);

export default Shark;

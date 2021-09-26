import React from 'react';

const Map = ({ svgTransform, tables }) => {
    return (
        <svg
            style={{
                transform: `scale(${svgTransform.zoom}) translate(${svgTransform.x}px,${svgTransform.y}px)`,
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 528 800"
        >
            <defs>
                <filter id="f009">
                    <feTurbulence
                        numOctaves="3"
                        seed="0"
                        type="turbulence"
                        baseFrequency=".04"
                        result="result91"
                    />
                    <feDisplacementMap
                        scale="6.6"
                        yChannelSelector="G"
                        xChannelSelector="R"
                        in="SourceGraphic"
                        in2="result91"
                    />
                </filter>
            </defs>
            <g
                className="currentLayer"
                filter="url(#f009)"
                stroke="#ad8570"
                fill="#4a90d6"
                fillOpacity="1"
                strokeOpacity="1"
                strokeWidth="5"
                strokeDasharray="none"
                strokeLinejoin="round"
                strokeLinecap="butt"
                strokeDashoffset=""
                fillRule="nonzero"
                opacity="1"
                markerMid=""
                markerEnd=""
            >
                <line y2="742.66325" x2="521.96787" y1="742.66325" x1="5.05463" />
                <line y2="743.14211" x2="4.98566" y1="607.26705" x1="4.98566" />
                <line y2="743.14212" x2="341.98454" y1="642.73995" x1="341.98454" />
                <line y2="743.14211" x2="522.48404" y1="587.76711" x1="522.48404" />
                <line y2="587.12327" x2="270.07662" y1="587.12327" x1="5.59517" />
                <line y2="502.66406" x2="261.42797" y1="502.66406" x1="5.05463" />
                <line y2="608.1426" x2="4.98566" y1="501.76737" x1="4.98566" />
                <line y2="512.64294" x2="317.41713" y1="426.26771" x1="317.41713" />
                <line y2="415.16444" x2="262.40112" y1="415.16444" x1="202.48647" />
                <line y2="502.64294" x2="202.4175" y1="462.29466" x1="202.4175" />
                <line y2="532.64294" x2="4.98566" y1="220.53858" x1="4.98566" />
                <line y2="587.64268" x2="262.4173" y1="536.36189" x1="262.4173" />
                <line y2="587.64268" x2="317.41717" y1="534.74027" x1="317.41717" />
                <line y2="502.64294" x2="262.41731" y1="385.26774" x1="262.41731" />
                <line y2="321.85378" x2="216.02268" y1="321.85378" x1="5.05463" />
                <line
                    transform="rotate(7.83143 14.6084 186.056)"
                    y2="149.83959"
                    x2="19.20299"
                    y1="222.27185"
                    x1="10.01382"
                />
                <line
                    transform="rotate(22.7228 41.5579 120.262)"
                    y2="84.04536"
                    x2="46.15254"
                    y1="156.47761"
                    x1="36.96337"
                />
                <line
                    transform="rotate(38.8692 85.6745 63.4008)"
                    y2="27.18488"
                    x2="90.26904"
                    y1="99.61714"
                    x1="81.07987"
                />
                <line
                    transform="rotate(61.0826 144.773 25.4599)"
                    y2="-9.74101"
                    x2="149.36746"
                    y1="60.66094"
                    x1="140.17829"
                />
                <line
                    transform="rotate(66.5208 210.675 9.19484)"
                    y2="-23.08364"
                    x2="221.3074"
                    y1="41.47337"
                    x1="200.04211"
                />
                <line
                    transform="rotate(82.058 252.951 5.72712)"
                    y2="-4.45935"
                    x2="254.24351"
                    y1="15.91359"
                    x1="251.65888"
                />
                <line y2="101.29264" x2="262.41731" y1="5.75147" x1="262.41731" />
                <line y2="101.77929" x2="334.64281" y1="101.77929" x1="261.61998" />
                <line y2="101.77354" x2="334.05223" y1="147.18464" x1="334.05223" />
                <line y2="163.1156" x2="261.61998" y1="147.18464" x1="334.05223" />
                <line y2="351.2921" x2="262.41731" y1="163.37647" x1="262.41731" />
                <line y2="286.64371" x2="155.13375" y1="321.77876" x1="155.13375" />
                <line y2="204.37789" x2="195.13365" y1="151.40504" x1="24.32325" />
                <line y2="587.12327" x2="522.50843" y1="587.12327" x1="302.89174" />
                <line y2="502.58913" x2="307.01171" y1="502.58913" x1="472.43026" />
                <line y2="501.96721" x2="262.4173" y1="511.76737" x1="262.4173" />
                <line y2="587.64268" x2="202.41745" y1="536.36189" x1="202.41745" />
                <line y2="501.96721" x2="202.41745" y1="521.76737" x1="202.41745" />
                <line y2="413.34587" x2="202.4175" y1="435.26775" x1="202.4175" />
                <line y2="426.64348" x2="313.82251" y1="426.64348" x1="325.4036" />
                <line y2="502.64295" x2="363.36295" y1="153.83598" x1="363.36295" />
                <line y2="321.85378" x2="262.50904" y1="321.85378" x1="245.59458" />
                <line y2="426.64348" x2="349.7143" y1="426.64348" x1="362.70078" />
                <line y2="606.92626" x2="341.98453" y1="587.0644" x1="341.98453" />
                <line y2="587.64267" x2="471.74108" y1="502.30791" x1="471.74108" />
            </g>
            <g
                className="currentLayer"
                filter="url(#f009)"
                stroke="#674a3a"
                fillOpacity="1"
                strokeOpacity="1"
                strokeWidth="1"
                strokeDasharray="none"
                strokeLinejoin="round"
                strokeLinecap="butt"
                strokeDashoffset=""
                fillRule="nonzero"
                opacity="1"
                markerMid=""
                markerEnd=""
            >
                {tables}
            </g>
        </svg>
    );
};

export { Map };

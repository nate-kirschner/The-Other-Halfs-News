import React from 'react';

export function NavBar(props) {

    let t;

    return (
        <div  class="nav-bar">
            <a><img id="navButtons"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Arrow_Blue_Left_001.svg/1200px-Arrow_Blue_Left_001.svg.png"
                //When clicked, scroll left once
                    onClick={() => props.onClick('left')}
                //When held, scroll continuously
                    onMouseDown={() => {
                        t = setInterval(() => props.onClick('left'), 300);
                    }}
                //When let go, stop scrolling
                    onMouseUp={() => clearInterval(t)} />
            </a>
            <a href="#slide-1">Left</a>
            <a href="#slide-2">Center Left</a>
            <a href="#slide-3">Center</a>
            <a href="#slide-4">Center Right</a>
            <a href="#slide-5">Right</a>
            <a><img id="navButtons"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Red_Arrow_Right.svg/1024px-Red_Arrow_Right.svg.png'
                    onClick={() => props.onClick('right')}
                    onMouseDown={() => {
                        t = setInterval(() => props.onClick('right'), 300);
                    }}
                    onMouseUp={() => clearInterval(t)} />
            </a>
        </div>
    );
}
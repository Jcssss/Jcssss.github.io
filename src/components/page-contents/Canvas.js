import React, { useEffect } from 'react';
import initParticleEffect from './ParticleEffect';

const Canvas = () => {
    useEffect(() => {
        initParticles();
    }, [])

    const initParticles = () => {
        initParticleEffect();
    }

    return (
        <canvas 
            id='canvas'
            style={{
                zIndex: -1,
                height: '100%',
                width: '100%',
                margin: '0px',
                position: 'fixed',
                top: '0px',
                left: '0px'
            }}
        ></canvas>
    );
};

export default Canvas;
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
        <canvas id='canvas'></canvas>
    );
};

export default Canvas;
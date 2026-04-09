import { useState, useEffect, useRef } from 'react';
import { WebGLTreeRenderer } from '../../utils/WebGL/WebGLTreeRenderer';

export function TestWebGL() {
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        try {
            // Instancie le renderer
            rendererRef.current = new WebGLTreeRenderer(canvasRef.current);

            // Initialise
            rendererRef.current.init();

            console.log('✅ WebGLTreeRenderer initialisé avec succès');
            console.log('Zoom:', rendererRef.current.getZoom());
            console.log('Pan:', rendererRef.current.getPan());

        } catch (error) {
            console.error('❌ Erreur WebGL:', error);
        }

        // Cleanup
        return () => {
            if (rendererRef.current) {
                rendererRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    color: 'white',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    zIndex: 1000,
                }}
            >
                <h3>Test WebGL Tree Renderer</h3>
                <p>Contrôles :</p>
                <ul>
                    <li>🖱️ Drag = Pan</li>
                    <li>🔍 Scroll = Zoom</li>
                    <li>Console = Check logs</li>
                </ul>
            </div>
        </div>
    );
}
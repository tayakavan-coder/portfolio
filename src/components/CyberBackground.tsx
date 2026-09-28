import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberBackgroundProps {
  colorTheme?: 'purple' | 'cyan' | 'green' | 'red';
  gridDensity?: 'high' | 'normal' | 'low';
}

export default function CyberBackground({ colorTheme = 'purple' }: CyberBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Set up Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070913, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color definitions based on theme
    let primaryColorHex = 0xa855f7; // purple
    let secondaryColorHex = 0x06b6d4; // cyan

    if (colorTheme === 'cyan') {
      primaryColorHex = 0x06b6d4;
      secondaryColorHex = 0x3b82f6;
    } else if (colorTheme === 'green') {
      primaryColorHex = 0x10b981;
      secondaryColorHex = 0x06b6d4;
    } else if (colorTheme === 'red') {
      primaryColorHex = 0xec4899;
      secondaryColorHex = 0xf43f5e;
    }

    // 1. Create Animated Particle Starfield / Data Nodes
    const particlesCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const colorPrimary = new THREE.Color(primaryColorHex);
    const colorSecondary = new THREE.Color(secondaryColorHex);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const mixedColor = colorPrimary.clone().lerp(colorSecondary, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture or Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // 2. Create Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(120, 40, primaryColorHex, secondaryColorHex);
    gridHelper.position.y = -10;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.35;
    scene.add(gridHelper);

    // 3. Floating Geometric Wireframe Objects (Cyber Orbs / Polyhedrons)
    const shapeGroup = new THREE.Group();
    scene.add(shapeGroup);

    const wireframeMat1 = new THREE.MeshBasicMaterial({
      color: primaryColorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const wireframeMat2 = new THREE.MeshBasicMaterial({
      color: secondaryColorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const IcosahedronGeo = new THREE.IcosahedronGeometry(3, 1);
    const icoMesh = new THREE.Mesh(IcosahedronGeo, wireframeMat1);
    icoMesh.position.set(-15, 8, -10);
    shapeGroup.add(icoMesh);

    const OctahedronGeo = new THREE.OctahedronGeometry(2.5, 0);
    const octMesh = new THREE.Mesh(OctahedronGeo, wireframeMat2);
    octMesh.position.set(16, 10, -15);
    shapeGroup.add(octMesh);

    const TorusGeo = new THREE.TorusGeometry(4, 0.5, 12, 30);
    const torusMesh = new THREE.Mesh(TorusGeo, wireframeMat1);
    torusMesh.position.set(0, -2, -20);
    torusMesh.rotation.x = Math.PI / 3;
    shapeGroup.add(torusMesh);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle cloud
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.015;

      // Pulse particle positions subtly
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particlesCount; i++) {
        const y = positionAttr.getY(i);
        positionAttr.setY(i, y + Math.sin(elapsedTime + i) * 0.01);
      }
      positionAttr.needsUpdate = true;

      // Animate floating geometry
      icoMesh.rotation.x = elapsedTime * 0.2;
      icoMesh.rotation.y = elapsedTime * 0.3;

      octMesh.rotation.y = elapsedTime * 0.25;
      octMesh.rotation.z = elapsedTime * 0.2;

      torusMesh.rotation.z = elapsedTime * 0.15;

      // Grid floating wave
      gridHelper.position.z = (elapsedTime * 4) % 3;

      // Mouse Parallax interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 15;
      camera.position.y = 5 - targetY * 15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      wireframeMat1.dispose();
      wireframeMat2.dispose();
    };
  }, [colorTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Cyber Overlay Gradients & Scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/80 via-transparent to-[#070913]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.12),transparent_70%)]" />
      <div className="absolute inset-0 scanlines opacity-20" />
    </div>
  );
}

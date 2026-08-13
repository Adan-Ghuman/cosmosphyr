"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function InteractiveStars({ count = 3000, mouseRef }: { count?: number, mouseRef: React.MutableRefObject<{x: number, y: number}> }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // spread stars in a wide volume
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40 - 10; 
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    return { positions, originalPositions, velocities };
  }, [count]);

  const mouse3D = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow global rotation
    pointsRef.current.rotation.z += 0.0005 * (delta * 60);

    if (mouseRef.current.x !== -9999) {
      mouse3D.current.set(mouseRef.current.x, mouseRef.current.y, 0.5);
      mouse3D.current.unproject(state.camera);
      mouse3D.current.sub(state.camera.position).normalize();
      
      // mouse3D is now the ray direction
      const rayDir = mouse3D.current;
      const camPos = state.camera.position;
      
      const posAttribute = pointsRef.current.geometry.attributes.position;
      const posArray = posAttribute.array as Float32Array;

      const dt = Math.min(delta, 0.1); 
      const fpsRatio = dt * 60;

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const px = posArray[idx];
        const py = posArray[idx + 1];
        const pz = posArray[idx + 2];
        
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];
        
        // Find where the mouse ray intersects the exact Z-plane of this star
        const t = (pz - camPos.z) / rayDir.z;
        const intersectX = camPos.x + t * rayDir.x;
        const intersectY = camPos.y + t * rayDir.y;
        
        const dx = px - intersectX;
        const dy = py - intersectY;
        const distSq = dx * dx + dy * dy; 
        
        const forceRadius = 4;
        
        if (distSq < forceRadius * forceRadius) {
           const dist = Math.sqrt(distSq);
           // Calculate repulsion force
           const force = (forceRadius - dist) / forceRadius;
           
           const angle = Math.atan2(dy, dx);
           velocities[idx] += Math.cos(angle) * force * 0.4 * fpsRatio;
           velocities[idx + 1] += Math.sin(angle) * force * 0.4 * fpsRatio;
        }
        
        // Spring back to original position
        const spring = 0.015;
        velocities[idx] += (ox - px) * spring * fpsRatio;
        velocities[idx + 1] += (oy - py) * spring * fpsRatio;
        velocities[idx + 2] += (oz - pz) * spring * fpsRatio;
        
        // Friction
        const friction = Math.pow(0.85, fpsRatio);
        velocities[idx] *= friction;
        velocities[idx + 1] *= friction;
        velocities[idx + 2] *= friction;
        
        posArray[idx] += velocities[idx] * fpsRatio;
        posArray[idx + 1] += velocities[idx + 1] * fpsRatio;
        posArray[idx + 2] += velocities[idx + 2] * fpsRatio;
      }
      
      posAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    if (meshRef.current && materialRef.current) {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Calculate scroll progress relative to window height (100vh)
      const progress = Math.min(scrollY / (vh * 0.8), 1.0);
      
      // Scale up the black hole as we scroll
      const scale = 1.0 + progress * 20.0;
      meshRef.current.scale.set(scale, scale, 1);
      
      // Fade out opacity as it grows
      materialRef.current.uniforms.uOpacity.value = 1.0 - progress;
    }
  });

  const uniforms = useMemo(() => ({
    uOpacity: { value: 1.0 }
  }), []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
      float d = distance(vUv, vec2(0.5));
      
      // The event horizon
      if (d < 0.25) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, uOpacity);
        return;
      }

      // Smooth falloff for the glowing aura
      float glow = 1.0 - smoothstep(0.25, 0.5, d);
      
      vec3 color = vec3(0.0);
      if (d < 0.26) {
         // Cyan/white edge (very soft)
         color = vec3(0.8, 1.2, 1.5);
      } else if (d < 0.29) {
         // Fades to app default primary blue (accent-ice)
         float t = (d - 0.26) / 0.03;
         color = mix(vec3(0.8, 1.2, 1.5), vec3(0.4, 0.6, 0.8), t);
      } else if (d < 0.38) {
         // Fades to deep blue
         float t = (d - 0.29) / 0.09;
         color = mix(vec3(0.4, 0.6, 0.8), vec3(0.05, 0.15, 0.3), t);
      } else {
         // Fades out into darkness
         float t = (d - 0.38) / 0.12;
         color = mix(vec3(0.05, 0.15, 0.3), vec3(0.01, 0.02, 0.05), t);
      }

      gl_FragColor = vec4(color * glow * uOpacity, glow * uOpacity);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      {/* A large plane facing the camera directly */}
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<{x: number, y: number}> }) {
  return (
    <>
      <color attach="background" args={["#010103"]} />

      <InteractiveStars count={4000} mouseRef={mouseRef} />

      <BlackHole />

      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  );
}

export default function BackgroundPattern() {
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none w-full h-full bg-[#030508]">
      <Canvas
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: false }} 
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}

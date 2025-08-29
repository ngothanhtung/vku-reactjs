import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';

import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';

export default function DaeExample() {
  return (
    <div>
      <Canvas
        style={{ height: '100vh', background: '#ffffff' }}
        camera={{ position: [0, 0, 5], fov: 100 }}
        shadows // Bật shadows
        gl={{
          antialias: true,
          toneMapping: 1, // THREE.NoToneMapping
          outputColorSpace: 'srgb', // Đảm bảo color space đúng
        }}
      >
        {/* Environment lighting cho màu sắc tự nhiên */}
        <Environment preset="sunset" />
        {/* Ánh sáng chính */}
        <ambientLight intensity={1} color="#ffffff" />
        {/* Dùng để chiếu sáng */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        <pointLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" castShadow />

        {/* Ánh sáng điểm phụ với màu lạnh */}
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#ffffff" />

        {/* Ánh sáng định hướng */}

        <directionalLight
          position={[-10, 10, 5]}
          intensity={1}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Controls */}
        {/* Dùng để điều khiển camera */}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          reverseOrbit={false}
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI * 0.75}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]} // Đặt target ở center
        />

        {/* Model with Suspense for loading */}
        <Suspense fallback={null}>
          <DaeModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

const DaeModel = () => {
  const collada = useLoader(ColladaLoader, '/assets/3d/BrainStem.dae');
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  // Thiết lập animations
  useEffect(() => {
    // Tìm animations trong scene
    const animations: THREE.AnimationClip[] = [];
    collada.scene.traverse((child) => {
      if (child.animations && child.animations.length > 0) {
        animations.push(...child.animations);
      }
    });

    if (animations.length > 0) {
      // Tạo AnimationMixer
      mixerRef.current = new THREE.AnimationMixer(collada.scene);

      // Phát tất cả animations
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play();
      });
    }
  }, [collada]);

  // Update animation trong mỗi frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Thêm rotation đơn giản nếu không có animations hoặc để tạo hiệu ứng
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3; // Quay chậm
    }
  });

  // Tự động căn giữa model
  const box = new THREE.Box3().setFromObject(collada.scene);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // Tính scale để model fit trong view
  const maxSize = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxSize; // Scale để model có kích thước 2 units

  // Scale and position the model appropriately
  return (
    <group ref={modelRef} scale={[scale, scale, scale]} position={[-center.x * scale, -center.y * scale, -center.z * scale]}>
      <primitive object={collada.scene} />
    </group>
  );
};

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

type ScrollValue = {
  get: () => number;
};

const RED = "#d51e1e";
const RED_HOT = "#FF4D6A";
const STEEL = "#17191F";
const INK = "#070707";

function createShurikenGeometry() {
  const shape = new THREE.Shape();
  const points = 4;
  const outerR = 0.58;
  const innerR = 0.16;
  const cutout = new THREE.Path();

  for (let i = 0; i < points; i++) {
    const outerAngle = (i / points) * Math.PI * 2 - Math.PI / 2;
    const innerAngle = ((i + 0.5) / points) * Math.PI * 2 - Math.PI / 2;
    const outerX = Math.cos(outerAngle) * outerR;
    const outerY = Math.sin(outerAngle) * outerR;
    const innerX = Math.cos(innerAngle) * innerR;
    const innerY = Math.sin(innerAngle) * innerR;

    if (i === 0) {
      shape.moveTo(outerX, outerY);
    } else {
      shape.lineTo(outerX, outerY);
    }

    shape.lineTo(innerX, innerY);
  }

  shape.closePath();
  cutout.absarc(0, 0, 0.08, 0, Math.PI * 2, false);
  shape.holes.push(cutout);

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSize: 0.015,
    bevelThickness: 0.02,
    bevelSegments: 2,
  });
}

function Shuriken({
  position,
  scale = 1,
  speed = 1,
  color = RED,
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null!);
  const geometry = useMemo(() => {
    const shuriken = createShurikenGeometry();
    shuriken.center();
    return shuriken;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    ref.current.rotation.z += delta * speed * 1.35;
    ref.current.rotation.x = Math.sin(time * speed * 0.35) * 0.35;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.65}>
      <group ref={ref} position={position} scale={scale}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color={color}
            metalness={0.86}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.18}
          />
        </mesh>
        <mesh geometry={geometry} scale={1.08}>
          <meshBasicMaterial color={color} transparent opacity={0.12} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 24;
      positions[i * 3 + 1] = (rand() - 0.5) * 16;
      positions[i * 3 + 2] = (rand() - 0.5) * 18 - 2;
    }
    const points = new THREE.BufferGeometry();
    points.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return points;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={RED_HOT}
        size={0.035}
        transparent
        opacity={0.58}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CircuitBand({ radius = 1.6, count = 18 }: { radius?: number; count?: number }) {
  const group = useRef<THREE.Group>(null!);
  const segments = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const length = i % 3 === 0 ? 0.38 : 0.2;
      return {
        angle,
        length,
        offset: i % 2 === 0 ? 0.02 : -0.02,
      };
    });
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    group.current.rotation.z = time * 0.08;
    group.current.rotation.x = Math.sin(time * 0.18) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 12, 128]} />
        <meshBasicMaterial color={RED} transparent opacity={0.5} />
      </mesh>
      {segments.map((segment, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(segment.angle) * radius,
            segment.offset,
            Math.sin(segment.angle) * radius,
          ]}
          rotation={[0, -segment.angle, 0]}
        >
          <boxGeometry args={[segment.length, 0.018, 0.035]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function GateFrame() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <group ref={ref} position={[0, -0.35, -0.25]}>
      <mesh position={[-1.35, 0, 0]}>
        <boxGeometry args={[0.12, 2.25, 0.12]} />
        <meshStandardMaterial color={INK} metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[1.35, 0, 0]}>
        <boxGeometry args={[0.12, 2.25, 0.12]} />
        <meshStandardMaterial color={INK} metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.03, 0]}>
        <boxGeometry args={[3, 0.13, 0.14]} />
        <meshStandardMaterial color={INK} metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.78, 0.02]}>
        <boxGeometry args={[2.35, 0.035, 0.06]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[-1.35, -1.1, 0.02]}>
        <boxGeometry args={[0.36, 0.05, 0.08]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.32} />
      </mesh>
      <mesh position={[1.35, -1.1, 0.02]}>
        <boxGeometry args={[0.36, 0.05, 0.08]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.32} />
      </mesh>
    </group>
  );
}

function DataRibbon({ phase = 0 }: { phase?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2.4, -0.65, -0.65),
        new THREE.Vector3(-1.25, 0.58, 0.2),
        new THREE.Vector3(0.1, -0.2, 0.72),
        new THREE.Vector3(1.45, 0.72, 0.05),
        new THREE.Vector3(2.3, -0.45, -0.72),
      ],
      false,
      "catmullrom",
      0.7
    );
    return new THREE.TubeGeometry(curve, 120, 0.018, 8, false);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime + phase;
    ref.current.rotation.y = Math.sin(time * 0.3) * 0.18;
    ref.current.position.y = Math.sin(time * 0.7) * 0.08;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial color={RED_HOT} transparent opacity={0.55} />
    </mesh>
  );
}

function FloatingFragment({
  position,
  rotationSpeed = 0.5,
  scale = 1,
}: {
  position: [number, number, number];
  rotationSpeed?: number;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotationSpeed;
    ref.current.rotation.z += delta * rotationSpeed * 0.7;
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.9}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial
          color={STEEL}
          metalness={0.9}
          roughness={0.14}
          emissive={RED}
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

function MissionCore({ scrollProgress }: { scrollProgress?: ScrollValue }) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const progress = scrollProgress?.get() ?? 0;
    const time = state.clock.elapsedTime;
    const mobileScale = viewport.width < 6 ? 0.72 : 1;

    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, mobileScale, 0.08));
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      progress * 1.5 + state.pointer.x * 0.16,
      4,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -0.08 + progress * 0.35 - state.pointer.y * 0.08,
      4,
      delta
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      -0.25 - progress * 0.85,
      4,
      delta
    );

    core.current.rotation.x += delta * 0.32;
    core.current.rotation.y -= delta * 0.48;
    core.current.scale.setScalar(1 + Math.sin(time * 1.7) * 0.035);
    wire.current.rotation.y += delta * 0.18;
    wire.current.rotation.z -= delta * 0.11;
  });

  return (
    <group ref={group} position={[1.4, -0.25, -0.55]}>
      <GateFrame />
      <CircuitBand radius={1.62} count={22} />
      <group rotation={[Math.PI / 2.4, 0, 0]}>
        <CircuitBand radius={1.1} count={16} />
      </group>

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.62, 2]} />
          <meshStandardMaterial
            color="#0E1118"
            metalness={0.8}
            roughness={0.16}
            emissive={RED}
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh ref={wire} scale={1.18}>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshBasicMaterial color={RED_HOT} transparent opacity={0.28} wireframe />
        </mesh>
        <mesh scale={0.42}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial
            color={RED}
            emissive={RED_HOT}
            emissiveIntensity={0.65}
            metalness={0.55}
            roughness={0.18}
          />
        </mesh>
      </Float>

      <DataRibbon phase={0} />
      <DataRibbon phase={1.7} />
      <Shuriken position={[-1.95, 0.9, 0.2]} scale={0.42} speed={1.1} />
      <Shuriken position={[1.9, -0.95, -0.35]} scale={0.34} speed={1.6} color={RED_HOT} />
    </group>
  );
}

function Scene({ scrollProgress }: { scrollProgress?: ScrollValue }) {
  useFrame((state, delta) => {
    const progress = scrollProgress?.get() ?? 0;
    const targetZ = THREE.MathUtils.lerp(6.2, 7.2, progress);
    const targetY = THREE.MathUtils.lerp(0.1, 0.9, progress);
    const targetX = THREE.MathUtils.lerp(0, -0.45, progress);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);
    state.camera.lookAt(0.6, -0.25, -1);
  });

  return (
    <>
      <ambientLight intensity={0.22} />
      <spotLight position={[2.5, 4.5, 5]} intensity={1.15} color={RED_HOT} angle={0.42} penumbra={0.65} />
      <pointLight position={[-4.5, -2.5, 3]} intensity={0.55} color="#FFFFFF" />
      <pointLight position={[4, -3, 1]} intensity={0.38} color={RED} />

      <Stars
        radius={50}
        depth={50}
        count={1100}
        factor={2.6}
        saturation={0}
        fade
        speed={0.5}
      />
      <Sparkles count={55} scale={[8, 4, 6]} size={2.4} speed={0.25} color={RED_HOT} opacity={0.45} />

      <MissionCore scrollProgress={scrollProgress} />

      <Shuriken position={[-3.5, -0.9, -2.5]} scale={0.34} speed={1.2} />
      <Shuriken position={[3.9, 1.45, -3.2]} scale={0.42} speed={0.75} color={RED_HOT} />
      <Shuriken position={[-1.2, 2.5, -4.1]} scale={0.26} speed={1.55} />

      <FloatingFragment position={[2.9, 0.45, -1.7]} rotationSpeed={0.3} scale={1.1} />
      <FloatingFragment position={[-3.2, 1.5, -2.2]} rotationSpeed={0.5} />
      <FloatingFragment position={[4, -2, -3]} rotationSpeed={0.4} scale={0.8} />
      <FloatingFragment position={[-1, -1.75, -1.4]} rotationSpeed={0.6} scale={0.85} />
      <FloatingFragment position={[0, 3, -2.8]} rotationSpeed={0.35} />

      <ParticleField count={300} />
      <fog attach="fog" args={["#070707", 5, 24]} />
    </>
  );
}

export default function ThreeBackground({ scrollProgress }: { scrollProgress?: ScrollValue }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0.1, 6.2], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_38%,rgba(196,30,58,0.12),transparent_32%),linear-gradient(90deg,rgba(10,10,10,0.82),rgba(10,10,10,0.28)_48%,rgba(10,10,10,0.72))] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none" />
    </div>
  );
}

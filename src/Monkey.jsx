import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Monkey(props) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF("/MonkeyRun5.glb");
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		actions["armature|mixamo.com|Layer0"].play();

		// Make the material double-sided
	}, [actions, materials]);

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				<group
					name="armature"
					position={[0.0, 0.0, 0]}
					rotation={[0, -0.0, 0.0]}
					scale={1}
				>
					<primitive object={nodes.Hips} />
					<skinnedMesh
						name="Body"
						geometry={nodes.Body.geometry}
						material={materials.Material}
						skeleton={nodes.Body.skeleton}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/MonkeyRun.glb");

export const Ceiling = () => {
    const tileSize = 2;
    const roomWidth = 40;
    const roomDepth = 26;
    const ceilingHeight = 10;
  
    const tiles = [];
  
    for (let x = -roomWidth / 2; x < roomWidth / 2; x += tileSize) {
      for (let z = -roomDepth / 2; z < roomDepth / 2; z += tileSize) {
        tiles.push(
          <mesh
            key={`${x}-${z}`}
            position={[
              x + tileSize / 2,
              ceilingHeight,
              z + tileSize / 2,
            ]}
            receiveShadow
          >
            <boxGeometry args={[tileSize - 0.04, 0.12, tileSize - 0.04]} />
            <meshStandardMaterial
              color="#091540"
              roughness={0.9}
              metalness={0}
            />
          </mesh>
        );
      }
    }
  
    return <group>{tiles}</group>;
  };
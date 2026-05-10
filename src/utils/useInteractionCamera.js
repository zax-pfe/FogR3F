import * as THREE from "three";
 
export function toVector3(pos) {
  if (!pos) return null;

  if (pos instanceof THREE.Vector3) return pos.clone();

  if (Array.isArray(pos)) {
    return new THREE.Vector3(pos[0], pos[1], pos[2]);
  }

  if (
    typeof pos.x === "number" &&
    typeof pos.y === "number" &&
    typeof pos.z === "number"
  ) {
    return new THREE.Vector3(pos.x, pos.y, pos.z);
  }

  return null;
}
 
// rotate player to face target (XZ only)
export function faceTarget(playerRef, playerPos, targetPos) {
    console.log("Facing target. Player position:", playerPos, "Target position:", targetPos);
  const playerVec = toVector3(playerPos);
  const targetVec = toVector3(targetPos);

  if (!playerRef?.current || !playerVec || !targetVec) return;

  const dx = targetVec.x - playerVec.x;
  const dz = targetVec.z - playerVec.z;

  if (Math.hypot(dx, dz) < 1e-6) return;

  const angle = Math.atan2(dx, dz);
  playerRef.current.rotation.y = angle;
}

export function saveCamera(ctrl) {
  if (!ctrl) return null;

  return {
    position: ctrl.object.position.clone(),
    target: ctrl.target.clone(),
  };
}

export function moveCameraToObject(ctrl, objectPosition, shot) {
  if (!ctrl || !objectPosition || !shot) return false;

  const cameraPosition = objectPosition.clone().add(shot.cameraOffset);
  const targetPosition = objectPosition.clone().add(shot.targetOffset);

  ctrl.object.position.copy(cameraPosition);
  ctrl.target.copy(targetPosition);
  ctrl.update();

  return true;
}

export function restoreCamera(ctrl, savedCamera) {
  if (!ctrl || !savedCamera?.position || !savedCamera?.target) return false;

  ctrl.object.position.copy(savedCamera.position);
  ctrl.target.copy(savedCamera.target);
  ctrl.update();

  return true;
}
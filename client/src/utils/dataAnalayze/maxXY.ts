const maxXY = (parent: any, childProp: string) => {
  let maxX = 0;
  let maxY = 0;
  parent.forEach((area: any) => {
    if (area[childProp].position[0] > maxX) maxX = area[childProp].position[0];
    if (area[childProp].position[1] > maxY) maxY = area[childProp].position[1];
  });
  return [maxX, maxY];
};

export default maxXY;

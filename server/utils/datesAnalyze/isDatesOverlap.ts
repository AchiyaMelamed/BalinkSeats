const isDatesOverlap = (
  [start1, end1]: [Date | number, Date | number],
  [start2, end2]: [Date | number, Date | number],
): boolean => {
  // start1 = new Date(start1).setHours(0, 0, 0, 0);
  // end1 = new Date(end1).setHours(0, 0, 0, 0);
  // start2 = new Date(start2).setHours(0, 0, 0, 0);
  // end2 = new Date(end2).setHours(0, 0, 0, 0);
  return (start1 < end2 && start2 < end1) || start1 === end2 || start2 === end1;
};

export default isDatesOverlap;

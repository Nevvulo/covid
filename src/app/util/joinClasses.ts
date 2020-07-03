export default (existingClasses: String | any, ...newClasses: String | any): string => {
  return existingClasses.split(' ').concat(newClasses.filter(Boolean)).join(' ');
};

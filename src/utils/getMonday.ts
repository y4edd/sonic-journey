const getMondayOfThisWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today.setDate(today.getDate() + diff));
  return monday;
};
export const GETMONDAYOFTHISWEEK = getMondayOfThisWeek();

const getMondayOfLastWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today.setDate(today.getDate() + diff - 7));
  return monday;
};
export const GETMONDAYOFLASTWEEK = getMondayOfLastWeek();

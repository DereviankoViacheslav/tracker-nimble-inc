import moment from 'moment';

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function getItem(key) {
  const result = JSON.parse(localStorage.getItem(key))
    .map((elem) => {
      return {
        ...elem,
        creationDate: moment(elem.creationDate),
        duration: moment.duration(elem.duration),
      }
    });
  return result;
};

export { getItem, setItem };
/* eslint-disable import/no-anonymous-default-export */
class Helper {
  validateEmail(email) {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
  }
  errorEmptyChecker = (data, exceptions) => {
    const emptyValueNames = [];
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        exceptions.indexOf(key) === -1 &&
        data[key] === ""
      ) {
        emptyValueNames.push(key);
      }
    }
    return emptyValueNames;
  };
  validateSingaporeMobileNumber = (mobileNumber) => {
    const singaporeMobileNumberRegex = /^(?:\+65|0)(?:\d{8}|\d{4}\s\d{4})$/;

    return singaporeMobileNumberRegex.test(mobileNumber);
  };
  validateBirthday = (birthday) => {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!dateRegex.test(birthday)) {
      return false;
    }

    const dateParts = birthday.split("/");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);

    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

    if (isNaN(inputDate.getTime())) {
      return false;
    }

    if (inputDate >= currentDate) {
      return false;
    }

    return true;
  };
  validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^\d{6}$/;

    return postalCodeRegex.test(postalCode);
  };
}
export default new Helper();

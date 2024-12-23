export const validateUserFields = (user, userList) => {
  const errors = {};

  // uuid
  if (!user.uuid) {
    errors.uuid = 'need to add a uuid.';
  }
// first name
  if (!user.name?.first || user.name.first.length < 3) {
    errors.firstName = 'First name must be at least 3 characters long.';
  }

  // last name
  if (!user.name?.last || user.name.last.length < 3) {
    errors.lastName = 'Last name must be at least 3 characters long.';
  }

  // location - city country (street is not required)
  if (!user.location?.city || !user.location?.country) {
    errors.location = 'City and country are required.';
  }

  // email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.email = 'Email must be in a valid format (e.g., example@gmail.com).';
  }

  // unique email
  const emailExists = userList.some(
    (existingUser) => existingUser.email === user.email && existingUser.id !== user.id
  );
  if (emailExists) {
    errors.email = 'Email must be unique.';
  }

  return errors;
};

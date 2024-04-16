export default function OutputUserName(user) {
  return user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.email.split("@")[0];
}

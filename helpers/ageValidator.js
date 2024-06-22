export function ageValidator(age) {
  if (!age) return "Age can't be empty."
  if (parseInt(age) < 18) return "Age can't be less then 18."
  return ''
}

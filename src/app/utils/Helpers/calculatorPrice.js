
const calPrice = (value) => {
  if (!value) return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default calPrice
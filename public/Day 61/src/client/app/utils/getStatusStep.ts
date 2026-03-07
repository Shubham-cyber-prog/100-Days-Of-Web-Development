export default function getStatusStep(status) {
  switch (status) {
    case "DELIVERED":
      return 4;
    case "SHIPPED":
      return 3;
    case "PAID":
      return 2;
    case "PENDING":
    default:
      return 1;
  }
}

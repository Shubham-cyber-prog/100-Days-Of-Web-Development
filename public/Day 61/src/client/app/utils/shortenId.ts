export default function shortenId(id: string, startLength = 3, endLength = 3) {
  if (!id || id.length <= startLength + endLength) return id;
  return `${id.slice(0, startLength)}...${id.slice(-endLength)}`;
}

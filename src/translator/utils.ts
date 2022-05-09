export function format(str, ...args): string {
  return str.replace(/{(\d+)}/g, (match, number) =>
    args[number] ? args[number] : match,
  );
}

export function objectMap(obj, fn) {
  return Object.assign(
    {},
    ...Object.keys(obj).map((key) => ({ [key]: fn(obj[key]) })),
  );
}

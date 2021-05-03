const prefixSliceName = (sliceName: string, actionName: string) => `${sliceName}/${actionName}`;
export function constructActionType<T>(sliceName: string, enumValue: T): T {
  return Object
    .entries(enumValue)
    .reduce((acc: any, [key, value]) => {
      acc[key] = prefixSliceName(sliceName, value);
      return acc;
    }, {});
};

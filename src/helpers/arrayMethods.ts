// import { HasOrderAndId } from "../store/interface/common.interface";

// export const getMaxOrder = (arr: HasOrderAndId[]) : number => {
//   let maxOrder = 1
//   for (const item of arr) {
//     if (item.order > maxOrder) {
//       maxOrder = item.order
//     }
//   }
//   return maxOrder;
// }
export const getNameFromId = (arr: { id: number, name: string }[], id: number) => {
  return arr.find(x => x.id === id)?.name
}
export const toggleArrayItem = <T>(arr: T[], item: T) => {
  const i = arr.indexOf(item)
  if (i > -1) {
    arr.splice(i, 1)
  } else {
    arr.push(item)
  }
}
export const removeArrayItem = <T>(arr: T[], item: T) => {
  const i = arr.indexOf(item)
  if (i > -1) {
    arr.splice(i, 1)
  }
}
export const removeArrayItems = <T>(arr: T[], items: T[]) => {
  for (const item of items) {
    removeArrayItem(arr, item)
  }
}

// removeArrayItemByName find an object item by its name property and deletes it from array. Note that only one item will be deleted
export const removeArrayItemByName = (arr: { name: string }[], name: string) => {
  let i = -1
  for (let j = 0; j < arr.length; j++) {
    if (arr[j].name === name) {
      i = j
      break
    }
  }
  if (i > -1) {
    arr.splice(i, 1)
  }
}
// removeArrayItemById find an object item by its name property and deletes it from array. Note that only one item will be deleted
export const removeArrayItemById = (arr: { id: number }[], id: number) => {
  let i = -1
  for (let j = 0; j < arr.length; j++) {
    if (arr[j].id === id) {
      i = j
      break
    }
  }
  if (i > -1) {
    arr.splice(i, 1)
  }
}
export const addArrayItemWithoutDuplicate = <T>(arr: T[], item: T) => {
  const i = arr.indexOf(item)
  if (i === -1) {
    arr.push(item)
  }
}
export const addArrayItemsWithoutDuplicate = <T>(arr: T[], items: T[]) => {
  for (const item of items) {
    addArrayItemWithoutDuplicate(arr, item)
  }
}

export const isNameDuplicatedCaseInsensitive = (name: string, arr: { name: string }[]): boolean => {
  for (const item of arr) {
    if (item.name.toLowerCase() === name.toLowerCase()) {
      return true
    }
  }
  return false
}
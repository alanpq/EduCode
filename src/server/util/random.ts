export const rand = (min: number, max: number) => {
  return min + (Math.random() * (max - min))
}

export const randInt = (min: number, max: number) => {
  return Math.floor(rand(min, max))
}

export const pickRandom = (arr: any[]) => {
  return arr[randInt(0, arr.length)]
}
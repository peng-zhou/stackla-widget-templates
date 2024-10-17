import { generateRandomPartitions } from "./masonry.lib"

const SCREEN_SIZE = 1000

describe("generateRandomPartitions", () => {
  it("should generate random partitions", () => {
    const partitions = generateRandomPartitions(SCREEN_SIZE)
    expect(partitions.length).toBeGreaterThan(0)
  })

  it("should generate partitions that sum up to the screen size", () => {
    const partitions = generateRandomPartitions(SCREEN_SIZE)
    const sum = partitions.reduce((acc, curr) => acc + curr, 0)
    expect(sum).toBe(SCREEN_SIZE)
  })

  it("should generate partitions that are less than or equal to the screen size", () => {
    const partitions = generateRandomPartitions(SCREEN_SIZE)
    const isLessThanScreenSize = partitions.every(partition => partition <= SCREEN_SIZE)
    expect(isLessThanScreenSize).toBe(true)
  })

  it("should generate partitions that are greater or equal to 150", () => {
    const partitions = generateRandomPartitions(SCREEN_SIZE)
    const isGreaterThan150 = partitions.every(partition => partition >= 150)
    expect(isGreaterThan150).toBe(true)
  })
})

export function createSquareMap(size) {
    const halfSize = size / 2

    return {
        bounds: {
            minX: -halfSize,
            maxX: halfSize,
            minY: -halfSize,
            maxY: halfSize,
        },
    }
}

export function createDefaultMap() {
    return createSquareMap(4096)

}

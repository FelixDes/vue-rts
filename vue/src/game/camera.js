import {clamp} from './geometry.js'

export const MIN_ZOOM = 0.25
export const MAX_ZOOM = 3

export function createCamera() {
    return {
        x: 0,
        y: 0,
        zoom: 1,
    }
}

export function screenToWorld(camera, viewport, screenPoint) {
    return {
        x: camera.x + (screenPoint.x - viewport.width / 2) / camera.zoom,
        y: camera.y + (screenPoint.y - viewport.height / 2) / camera.zoom,
    }
}

export function getCameraTransform(camera, viewport) {
    const translateToCenter = 'translate(' + viewport.width / 2 + ' ' + viewport.height / 2 + ')'
    const scale = 'scale(' + camera.zoom + ')'
    const translateToCamera = 'translate(' + -camera.x + ' ' + -camera.y + ')'
    return translateToCenter + ' ' + scale + ' ' + translateToCamera
}

export function moveCameraByScreenOffset(camera, screenOffset, bounds) {
    camera.x = clamp(camera.x + screenOffset.x / camera.zoom, bounds.minX, bounds.maxX)
    camera.y = clamp(camera.y + screenOffset.y / camera.zoom, bounds.minY, bounds.maxY)
}

export function zoomCameraAtScreenPoint(camera, viewport, screenPoint, zoomFactor, bounds) {
    const worldPointUnderCursor = screenToWorld(camera, viewport, screenPoint)

    camera.zoom = clamp(camera.zoom * zoomFactor, MIN_ZOOM, MAX_ZOOM)

    const newCameraX = worldPointUnderCursor.x - (screenPoint.x - viewport.width / 2) / camera.zoom
    const newCameraY = worldPointUnderCursor.y - (screenPoint.y - viewport.height / 2) / camera.zoom
    camera.x = clamp(newCameraX, bounds.minX, bounds.maxX)
    camera.y = clamp(newCameraY, bounds.minY, bounds.maxY)
}

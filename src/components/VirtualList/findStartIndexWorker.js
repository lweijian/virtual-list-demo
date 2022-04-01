
self.addEventListener('message',(event)=>{
    const {scrollTop,positionData}=event.data
    let target=findStartIndex(scrollTop,positionData)
    self.postMessage(target)
})
const findStartIndex = (scrollTop,positionData) => {
    let left = 0;
    let right = positionData.length - 1
    let mid = left + Math.floor((right - left) / 2)
    while (left <= right) {
        mid = left + Math.floor((right - left) / 2)
        let bottom = positionData[mid].bottom
        if (bottom < scrollTop) {
            left = mid + 1
        } else if (bottom > scrollTop) {
            right = mid - 1
        } else {
            break
        }
    }
    return mid
}


self.addEventListener('message',(event)=>{
    const {positionData,nodes,startIndex}=event.data
    updateHandle(nodes,startIndex,positionData)
    self.postMessage(positionData)
})



const updateHandle = (nodes,startIndex,positionData) => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const itemHeight = node.clientHeight;
        const positionItem = positionData[i + startIndex]
        const dValue = itemHeight - positionItem.height;

        if (dValue) {
            positionItem.dValue = dValue
            positionItem.height = itemHeight;
            positionItem.bottom = positionItem.bottom + dValue
            for (let j = i + startIndex + 1; j < positionData.length; j++) {
                const nextItem = positionData[j]
                nextItem.top = nextItem.top + dValue
                nextItem.bottom = nextItem.bottom + dValue
            }
        }
    }

}

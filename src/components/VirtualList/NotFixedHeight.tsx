import {useEffect, useState, useMemo, useRef} from 'react'
import UpdateWorker from './updateWorker?worker'
import FindStartIndexWorker from './findStartIndexWorker?worker'

const findStartIndexWorker = new FindStartIndexWorker()
const updateWorker = new UpdateWorker()
const content1 = '111'.repeat(100)
const content2 = '22222222'.repeat(100)
const content3 = '3'.repeat(100)

interface contentItem {
    id: string,
    height: number,
    content: string
}

const temp: Array<contentItem> = []
for (let i = 0; i < 50; i++) {
    temp.push({id: i + content1, height: 100, content: content1}, {
        id: i + content2,
        height: 200,
        content: content2
    }, {id: i + content3, height: 300, content: content3})
}
temp.push({id: '121321312312', height: 200, content: 'end'})
let positionData: Array<{ top: number, dValue: number, height: number, bottom: number }> = []
for (let i = 0; i < temp.length; i++) {
    let top = i * 150
    positionData.push({
        top: top,
        dValue: 0,
        height: 150,
        bottom: top + 150,
    })
}

export const VirtualList = () => {


    /**state  state部分**/
    const [data] = useState<any>(temp)
    const [startIndex, setStartIndex] = useState(0)
    const ref = useRef(null)
    const nodeCounts = 10;
    /**effect  effect部分**/
    const endIndex = useMemo(() => {
        return Math.min(startIndex + nodeCounts - 1, positionData.length)
    }, [startIndex])
    const currentData = useMemo(() => {
        return data.slice(startIndex, endIndex)
    }, [startIndex])
    const offset = useMemo(() => {
        return positionData[startIndex].top
    }, [startIndex])
    useEffect(() => {
        //@ts-ignore
        const doms = [...ref.current?.childNodes]
        const nodes = doms.map(item => ({clientHeight: item.clientHeight}))
        let promise = new Promise<{ data: [] }>(((resolve, reject) => {

            updateWorker.postMessage({nodes, startIndex, positionData})
            updateWorker.addEventListener('message', (data) => {
                resolve(data)
            })
        }))
        promise.then(res => {
            positionData = res.data
        })


        return () => {

        }
    }, [ref.current])
    /**methods 方法部分**/
        // @ts-ignore
    const findStartIndex = (top, positionData) => {
            let left = 0;
            let right = positionData.length - 1
            let mid = left + Math.floor((right - left) / 2)
            while (left <= right) {
                mid = left + Math.floor((right - left) / 2)
                console.log(left + Math.floor((right - left) / 2))
                let bottom = positionData[mid].bottom
                if (bottom < top) {
                    left = mid + 1
                } else if (bottom > top) {
                    right = mid - 1
                } else {
                    break
                }
            }
            return mid
        }
    const onScrollCallback = (event: any) => {
        const {scrollTop} = event.target
        let promise = new Promise<{ data: number }>(((resolve, reject) => {
            findStartIndexWorker.postMessage({scrollTop, positionData})
            findStartIndexWorker.addEventListener('message', (data) => {
                resolve(data)
            })
        }))
        promise.then(res => {
            let start = res.data
            if (start !== startIndex) {
                start = Math.min(positionData.length - nodeCounts + 1, start)
                setStartIndex(start)
            }
        })
    }


    /**styles 样式部分**/

    /**render**/
    return (
        <div style={{
            width: 500,
            height: 500,
            border: '1px solid red',
            overflowY: "auto",
            overflowX: 'hidden',
            position: 'relative'
        }}

             onScroll={onScrollCallback}>
            <div style={{width: 500, height: positionData[positionData.length - 1].bottom, position: "absolute"}}></div>
            <div style={{transform: `translate3d(0,${offset}px,0)`}} ref={ref}>
                {currentData.map((item: contentItem) => {
                        return (<div key={item.id} style={{overflow: "hidden"}}>
                            <div style={{
                                height: item.height,
                                margin: '10px',
                                background: "yellow",
                                textAlign: "center"
                            }}>{item.content}</div>
                        </div>)
                    }
                )}
            </div>

        </div>
    )
}

export default VirtualList;

import {useEffect, useState,useMemo} from 'react'


export const VirtualList = () => {

    /**state  state部分**/
    const [data] = useState(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    )
    const [startIndex,setStartIndex] = useState(0)
    const itemHeight=100
    /**effect  effect部分**/
    const  endIndex=useMemo(()=>{
        return startIndex+9
    },[startIndex])
    const  currentData=useMemo(()=>{
        return data.slice(startIndex,endIndex)
    },[startIndex])
    const offset=useMemo(()=>{
        return itemHeight*startIndex
    },[startIndex])
     useEffect(() => {
         console.log(offset)
        return () => {

        }
      }, [offset])

    /**methods 方法部分**/
        // @ts-ignore
    const onScrollCallback = (event) => {
        const { scrollTop} = event.target
       const  start=Math.floor(scrollTop/itemHeight)
        if(start!==startIndex){
        setStartIndex(start)
        }
    }
    /**styles 样式部分**/

    /**render**/
    return (
        <div style={{width: 500, height: 500, border: '1px solid red', overflow: "auto",position:'relative'}} onScroll={onScrollCallback}>
            <div style={{width: 500, height: itemHeight*data.length,position:"absolute"}}></div>
           <div  style={{transform:`translate3d(0,${offset}px,0)`}} >
               {currentData.map(item => (
                   <div key={item} style={{overflow: "hidden"}}>
                       <div style={{height: itemHeight, background: "yellow", textAlign: "center"}}>{item}</div>
                   </div>
               ))}
           </div>

        </div>
    )
}

export default VirtualList;

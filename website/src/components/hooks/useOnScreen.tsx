import { useState,useEffect } from "react"

const useOnScreen=(ref:React.RefObject<HTMLDivElement>,rootMargin="0px")=>{
    const [isVisible,setIsVisible] = useState<boolean>(false)

    useEffect(()=>{
        const observe = new IntersectionObserver(([entry])=>{
            setIsVisible(entry.isIntersecting)
        },{rootMargin})

        const currentElement = ref.current

        if(currentElement){
            observe.observe(currentElement)
        }

        return()=>{
            observe.unobserve(currentElement as HTMLDivElement)
        }
    },[])

    return isVisible
}

export default useOnScreen
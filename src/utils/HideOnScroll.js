    // Change footer position on scroll

import { useEffect, useState } from "react";

   
const useHideOnScroll = () => {
    const [show, handleShow] = useState(false);

    const transitionFooter = () => {
       if (window.scrollY > 50) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionFooter)
        return () => window.removeEventListener("scroll", transitionFooter)
    }, [])

    return {show}
};

export default useHideOnScroll;
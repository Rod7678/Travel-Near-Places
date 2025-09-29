import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
function Modal ({open, children, onClose}){
    const dialog = useRef();

    useEffect(()=>{
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open])

    return createPortal(
            <dialog ref={dialog} className="modal" onClose={onClose}>
                {children}
            </dialog>,
            document.getElementById("modal")
        )
    }

export default Modal;
import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
const Modal = forwardRef(function Modal ({children},ref){
    const dialog = useRef()

    useImperativeHandle(ref, ()=>{
        return {
            open: ()=>{
                dialog.current.showModal();
            },
            close: ()=>{
                dialog.current.close();
            },
        };
    });

    return createPortal(
            <dialog ref={dialog} className="modal">
                {children}
            </dialog>,
            document.getElementById("modal")
        )
    }
);

export default Modal;
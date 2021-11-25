import { useEffect, useState } from "react";


export default function useModal(wrapper, open: boolean) {

    const [modalOpen, setModalOpen] = useState(open);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                // @ts-ignore
                setModalOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapper, modalOpen, setModalOpen]);

    return {modalOpen, setModalOpen};
}
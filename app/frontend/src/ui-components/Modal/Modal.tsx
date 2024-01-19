export interface IModalProps {
    open: boolean;
    onClose: Function;
    children: React.ReactNode
}

// TODO: Modify later
export const Modal: React.FC<IModalProps> = ({ open, onClose, children }): React.JSX.Element => {
    return (
        // backdrop
        <div
            onClick={() => onClose()}
            className={`
                fixed inset-0 flex justify-center items-center transition-colors
                ${open ? "visible bg-black/20" : "invisible"}
            `}
        >
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-100"}
                `}
            >
                <button
                    onClick={() => onClose()}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                </button>
                {children}
            </div>
        </div>
    )
}

// Usage below
// const [open, setOpen] = useState(false)

// <button className="btn btn-danger" onClick={() => setOpen(true)}>
// Open Modal
// </button>
// <Modal open={open} onClose={() => setOpen(false)}>
//     <div className="text-center w-56">
//     <div className="mx-auto my-4 w-48">
//         <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
//         <p className="text-sm text-gray-500">
//         Are you sure you want to delete this item?
//         </p>
//     </div>
//     <div className="flex gap-4">
//         <button className="btn btn-danger w-full">Delete</button>
//         <button
//         className="btn btn-light w-full"
//         onClick={() => setOpen(false)}
//         >
//         Cancel
//         </button>
//     </div>
//     </div>
// </Modal>
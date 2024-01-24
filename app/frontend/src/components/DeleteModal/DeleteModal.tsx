import { ActionButtons } from "..";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "../../ui-components";

export interface IDeleteModalProps {
    open: boolean;
    setOpen: Function;
    onDelete?: Function;
};

export const DeleteModal: React.FC<IDeleteModalProps> = ({ open, setOpen, onDelete }): React.JSX.Element => {
    return (
        <Modal open={open} closeableBackground onClose={() => setOpen(false)}>
            <ModalContent>
                <ModalHeader>
                    <>
                        <h3 className="dark:text-white">
                            Delete product
                        </h3>
                        <button type="button" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setOpen(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://  www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </>
                </ModalHeader>
                <ModalBody>
                    <p className="dark:text-gray-400">
                        Are you sure you want to delete this product? This cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <ActionButtons
                        actionButtons={[
                            {variant: 'primary', label: 'Confirm', name:'deleteModal', onClick: () => onDelete && onDelete()},
                            {variant: 'secondary', label: 'Cancel', name:'cancelModal', onClick: () => setOpen(false)}
                        ]}
                    />                    
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
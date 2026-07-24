export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div
        onClick={onClose}
        style={{
            position: 'fixed', inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 50,
        }}>
            
            <div
            onClick={(e) => e.stopPropagation()}
            style={{
                background: '#fff', borderRadius: 8,
                padding: 24, maxWidth: 480, width: "90%",
                maxHeight: "85vh", overflowY: "auto",
            }}>

                {children}

            </div>

        </div>
    )
}
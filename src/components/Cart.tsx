'use client'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2>Handlekurv</h2>
          <button
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { X } from 'lucide-react'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50"
      onClick={onClose}
    >
      <div
        className="absolute top-20 right-4 left-4 md:left-auto md:w-96 bg-white rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Handlekurv</h2>
          <button
            onClick={onClose}
          >
            <X size={24}/>
          </button>
        </div>

      </div>
    </div>
  )
}
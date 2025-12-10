'use client'

export function AddToCartButton() {
  return (
    <button
      className="px-4 py-2 rounded border border-black drop-shadow-lg bg-amber-600 text-white hover:bg-amber-700 cursor-pointer font-bold"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      Legg i handlekurv
    </button>
  )
}

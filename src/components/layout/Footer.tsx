export default function Footer() {
  return (
    <footer className="border-t bg-amber-50 py-6">
      <div className="w-full px-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} BookDragons</p>
      </div>
    </footer>
  )
}

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-amber-50">
      <div className="w-full px-6 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} BookDragons</p>
      </div>
    </footer>
  )
}

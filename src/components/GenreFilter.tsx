'use client'

import { useState } from 'react'
import { Book, Genre } from '@/payload-types'
import BookCard from './BookCard'

interface GenreFilterProps {
  books: Book[]
  genres: Genre[]
}

export default function GenreFilter({ books, genres }: GenreFilterProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('')

  const filteredBooks = selectedGenre
    ? books.filter((book) => {
        const bookGenres = book.genres as Genre[]
        return bookGenres.some((g) => g.id === Number(selectedGenre))
      })
    : books

  const selectedGenreObjekt = genres.find((g) => g.id === Number(selectedGenre))

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="genre-select" className="block font-semibold mb-2">
          Filtrer etter sjanger:
        </label>

        <div className="flex items-center gap-4">
          <select
            id="genre-select"
            className="border rounded px-4 py-2 bg-amber-50"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Alle sjangre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          {selectedGenreObjekt?.description && (
            <p className="italic">{selectedGenreObjekt.description}</p>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </div>
  )
}

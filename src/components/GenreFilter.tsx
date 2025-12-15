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
        <label htmlFor="genre-select" className="mb-2 block font-semibold">
          Filtrer etter sjanger:
        </label>

        <div className="flex items-center gap-4">
          <select
            id="genre-select"
            className="rounded border bg-amber-50 px-4 py-2"
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
            <p id="genre-description" className="italic">
              {selectedGenreObjekt.description}
            </p>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </div>
  )
}

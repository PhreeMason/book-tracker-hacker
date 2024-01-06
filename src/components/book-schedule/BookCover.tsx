import Image from "next/image"
import { cn } from "@/lib/utils"
import { GoogleBook } from "@/types"

interface BookCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  book: GoogleBook['volumeInfo']
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

function BookCover({
  book,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: BookCoverProps) {
  const { title, imageLinks, authors } = book
  const imageUrl = imageLinks?.thumbnail
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-xs text-muted-foreground">{authors.join(", ")}</p>
      </div>
    </div>
  )
}

export default BookCover;
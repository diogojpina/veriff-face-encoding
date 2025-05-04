import {
  Flex,
  Button,
  IconButton,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons"
import { useState, useEffect } from "react"

export interface PaginationProps {
  page: number
  pages: number
  pageSize: number
  count: number
  onPageChange?: (page: number) => void
}

export default function DataTablePagination({
  count,
  page,
  pageSize,
  pages,
  onPageChange,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState<number>(page)
  const toast = useToast()

  useEffect(() => {
    setInputValue(page)
  }, [page])

  const maxVisiblePages = 5
  const halfVisible = Math.floor(maxVisiblePages / 2)

  let startPage = Math.max(page - halfVisible, 1)
  let endPage = Math.min(startPage + maxVisiblePages - 1, pages)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1)
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const handlePageChange = (newPage: number) => {
    if (onPageChange && newPage >= 1 && newPage <= pages) {
      onPageChange(newPage)
    } else {
      toast({
        title: "Página inválida.",
        description: `Digite um número entre 1 e ${pages}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setInputValue(page)
    }
  }

  const handleInputSubmit = () => {
    const parsedPage = Number(inputValue)
    if (!isNaN(parsedPage)) {
      handlePageChange(parsedPage)
    } else {
      toast({
        title: "Entrada inválida.",
        description: "Digite um número válido para a página.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      setInputValue(page)
    }
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <Flex
        as="nav"
        justify="center"
        align="center"
        gap="2"
        aria-label="Pagination"
      >
        <IconButton
          aria-label="Go to first page"
          icon={<ArrowLeftIcon />}
          isDisabled={page === 1}
          onClick={() => handlePageChange(1)}
          variant="outline"
        />

        <IconButton
          aria-label="Previous page"
          icon={<ChevronLeftIcon />}
          isDisabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          variant="outline"
        />

        {startPage > 1 && (
          <>
            <Button onClick={() => handlePageChange(1)} variant="outline">
              1
            </Button>
            {startPage > 2 && <Text>...</Text>}
          </>
        )}

        {pageNumbers.map((pageNumber) =>
          pageNumber === page ? (
            <Input
              key={pageNumber}
              width="60px"
              size="sm"
              value={inputValue}
              textAlign="center"
              onChange={(e) => {
                const value = +e.currentTarget.value

                if (isNaN(value)) {
                  setInputValue(pageNumber)
                } else {
                  setInputValue(value)
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
            />
          ) : (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              variant="outline"
            >
              {pageNumber}
            </Button>
          )
        )}

        {endPage < pages && (
          <>
            {endPage < pages - 1 && <Text>...</Text>}
            <Button onClick={() => handlePageChange(pages)} variant="outline">
              {pages}
            </Button>
          </>
        )}

        <IconButton
          aria-label="Next page"
          icon={<ChevronRightIcon />}
          isDisabled={page === pages}
          onClick={() => handlePageChange(page + 1)}
          variant="outline"
        />

        <IconButton
          aria-label="Go to last page"
          icon={<ArrowRightIcon />}
          isDisabled={page === pages}
          onClick={() => handlePageChange(pages)}
          variant="outline"
        />
      </Flex>

      {pages > 1 && (
        <Text mt="2" fontSize="sm">
          Mostrando {Math.min((page - 1) * pageSize + 1, count)}-
          {Math.min(page * pageSize, count)} de {count} itens
        </Text>
      )}
    </Flex>
  )
}

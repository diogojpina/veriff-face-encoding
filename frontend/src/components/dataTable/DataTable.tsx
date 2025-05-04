/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Hide,
  Show,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import DataTablePagination, {
  PaginationProps,
} from "./pagination/DataTablePagination";
import "./DataTable.scss";
import DataTablePaginationMobile from "./pagination/DataTablePaginationMobile";

interface DataTableRow {
  headerName: string;
  field?: string;
  renderCell?: (params: any, idx: number) => any;
}

interface TypeProps {
  title?: string;
  caption?: string;
  rows: any[];
  columns: DataTableRow[];
  checkboxSelection?: boolean;
  selectedIds?: (ids: number[]) => void;
  pagination?: PaginationProps;
  onPageChange?: (page: number) => void;
  loading?: boolean;
}

export default function DataTable(props: TypeProps) {
  useEffect(() => {
    if (props.loading === true) {
      setSelected([]);
      if (props?.selectedIds) props.selectedIds([]);
    }
  }, [props.loading]);

  const getFieldValue = (row: any, fieldName: string) => {
    if (fieldName.includes(".") === false) return row[fieldName];

    const fieldNames = fieldName.split(".");
    let value = row;
    for (const fname of fieldNames) {
      value = value[fname] || "";
    }
    return typeof value === "string" ? value : "";
  };

  const [selected, setSelected] = useState<number[]>([]);

  const selectId = (id: number) => {
    const newSelected = [...selected];
    const idx = newSelected.findIndex((item) => item === id);
    if (idx === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(idx, 1);
    }
    setSelected(newSelected);
    if (props?.selectedIds) props.selectedIds(newSelected);
  };

  return (
    <Flex
      w="100%"
      display="flex"
      flexDirection="column"
      gap="1rem"
      overflowX="hidden"
    >
      {/* {props.title && (
        <>
          {" "}

          <Box w="100%" h="1px" bg="#E2E8F0"></Box>
        </>
      )} */}
      <Hide below="lg">
        <TableContainer
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              height: "8px",
              borderRadius: "0.375rem",
            },
            "&::-webkit-scrollbar-track": {
              height: "8px",
              borderRadius: "0.375rem",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "0.375rem",
              background: "var(--color-secondary)",
            },
          }}
        >
          <Flex direction="column" gap="1rem">
            <Table size="sm" className="chakra-data-table">
              {props.caption && <TableCaption>{props.caption}</TableCaption>}
              <Thead>
                <Tr>
                  {props.checkboxSelection !== false && (
                    <Th>{/* <Checkbox /> */}</Th>
                  )}
                  {props.columns.map((column: any, idx: number) => (
                    <Th
                      fontFamily="DM Sans"
                      color="#8E99AB"
                      fontSize="0.75rem"
                      fontWeight="500"
                      textTransform="uppercase"
                      key={`column-header-${idx}`}
                    >
                      {column.headerName}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {props.rows.map((row: DataTableRow, idxRow: number) => (
                  <Tr key={`table-tr-${idxRow}`}>
                    {props.checkboxSelection !== false && (
                      <Td>
                        <input
                          type="checkbox"
                          checked={selected.includes(
                            parseInt(getFieldValue(row, "id"))
                          )}
                          onChange={() =>
                            selectId(parseInt(getFieldValue(row, "id")))
                          }
                        />
                      </Td>
                    )}
                    {props.columns.map((column: any, idxCol: number) => (
                      <Td
                        p="0.15rem 1rem"
                        key={`table-td-${idxRow}-${idxCol}`}
                        maxW="210px"
                        fontFamily="DM Sans"
                        color="#2D3748"
                        overflowX="hidden"
                        fontSize="1rem"
                        fontWeight="700"
                      >
                        {column.renderCell ? (
                          <>
                            <Flex gap="1rem">
                              {column.renderCell(row, idxRow)}
                            </Flex>
                          </>
                        ) : (
                          <>{getFieldValue(row, column.field || "")}</>
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {props.pagination && (
              <DataTablePagination {...props.pagination} {...props} />
            )}
          </Flex>
        </TableContainer>
      </Hide>
      <Show below="lg">
        {props.rows.map((row: DataTableRow, idxRow: number) => (
          <div key={`table-tr-${idxRow}`}>
            <Flex w="100%" maxW="500px" flexWrap="wrap">
              {props.checkboxSelection !== false && (
                <span>
                  <input type="checkbox" name="selectAll" id="selectAll" />
                </span>
              )}
              {props.columns.map((column: any, idxCol: number) => (
                <Flex
                  key={`table-td-${idxRow}-${idxCol}`}
                  direction="column"
                  minW={column?.mWidth || ""}
                  mb="1rem"
                  textAlign={column?.mAlign || ""}
                  //border="1px solid red"
                  mr="0.5rem"
                >
                  <Text
                    fontFamily="DM Sans"
                    fontSize="0.625rem"
                    fontWeight="500"
                    color="#8E99AB"
                    display={column?.mDisplay || ""}
                  >
                    {column.headerName}
                  </Text>

                  {column.renderCell ? (
                    <>
                      <Text
                        fontFamily="DM Sans"
                        fontSize="0.875rem"
                        fontWeight="700"
                        color="#2D3748"
                      >
                        {column.renderCell(row, idxRow)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        fontFamily="DM Sans"
                        fontSize="0.875rem"
                        fontWeight="700"
                        color="#2D3748"
                      >
                        {getFieldValue(row, column.field || "")}
                      </Text>
                    </>
                  )}
                </Flex>
              ))}
            </Flex>
            <Box w="100%" h="1px" bg="#E2E8F0"></Box>
          </div>
        ))}
        <>
          <DataTablePaginationMobile />
        </>
      </Show>
    </Flex>
  );
}

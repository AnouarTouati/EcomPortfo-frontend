import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import AxiosContext from "../../AxiosProvider";
type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  resourceURL: string;
  reloadCallback: () => {};
  numSelected: number;
  name: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    selected,
    setSelected,
    resourceURL,
    reloadCallback,
    numSelected,
    name,
  } = props;
  const axios = React.useContext(AxiosContext);
  const deleteSelected = async () => {
      let failed = false;
      //for loop and not forEach to use await and let all deletes happen before calling reloadCallback
      for (let i = 0; i < selected.length; i++) {
        const result = await axios.delete(`${resourceURL}/${selected[i]}`);
        if (result.status != 200) failed = true;
      }
      setSelected([]);
      reloadCallback();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title="Delete"
          onClick={() => {
            deleteSelected();
          }}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
type EnhancedTablePropType = {
  name: string;
  resourceURL: string;
  searchParams: any;
  headCells: any;
};
export default function EnhancedTable({
  name,
  resourceURL,
  searchParams,
  headCells,
}: EnhancedTablePropType) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalRowsInDb, setTotalRowsInDb] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState([]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const [emptyRows, setEmptyRows] = React.useState(0);

  const axios = React.useContext(AxiosContext);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((row: any) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  async function getData() {
    const params = {
      page: page + 1,
      rowsPerPage: rowsPerPage,
      order: order,
      orderBy: orderBy,
    };
    const result = await axios.get(resourceURL, {
      params: params,
    });

    const query = result.request.responseURL.replace(result.data.path, "");
    navigate(query);
    setEmptyRows(Math.max(0, -(result.data.data.length - rowsPerPage)));
    setTotalRowsInDb(result.data.total);
    setVisibleRows(result.data.data);
    setIsLoaded(true);
  }
  React.useEffect(() => {
    if (isLoaded == false) {
      if (searchParams.get("page")) {
        setPage(parseInt(searchParams.get("page")) - 1);
      }
      if (searchParams.get("rowsPerPage")) {
        setRowsPerPage(parseInt(searchParams.get("rowsPerPage")));
      }
      if (searchParams.get("order")) {
        setOrder(searchParams.get("order"));
      }
      if (searchParams.get("orderBy")) {
        setOrderBy(searchParams.get("orderBy"));
      }
    }
    getData();
  }, [order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          setSelected={setSelected}
          resourceURL={resourceURL}
          numSelected={selected.length}
          name={name}
          reloadCallback={getData}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row: any, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((column: HeadCell, index: number) => {
                      if (index == 0) {
                        return (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            key={row.id + index}
                          >
                            {row[column.id]}
                          </TableCell>
                        );
                      }
                      if (column.id == "created_at") {
                        row[column.id] = new Date(
                          row[column.id]
                        ).toDateString();
                      }
                      return (
                        <TableCell align="right" key={row.id + index}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRowsInDb}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

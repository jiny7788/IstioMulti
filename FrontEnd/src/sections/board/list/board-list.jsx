import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'src/routes/hooks';
import BoardService from '../../../apis/BoardService';
import Iconify from 'src/components/iconify';
import { AuthContext } from '../../../context/auth';

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: '번호',
    width: '5%',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: '제목',
    width: '40%',
  },
  {
    id: 'member_no',
    numeric: false,
    disablePadding: false,
    label: '작성자',
    width: '10%',
  },
  {
    id: 'reg_date',
    numeric: false,
    disablePadding: false,
    label: '작성일',
    width: '15%',
  },
  {
    id: 'update_date',
    numeric: false,
    disablePadding: false,
    label: '수정일',
    width: '15%',
  },
  {
    id: 'like_cnt',
    numeric: true,
    disablePadding: true,
    label: '좋아요',
    width: '5%',
  },
  {
    id: 'view_cnt',
    numeric: true,
    disablePadding: true,
    label: '조회',
    width: '5%',
  },
];

function EnhancedTableHead(props) {
  const {userId, isAdmin}  = React.useContext(AuthContext);
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" width="5%">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            disabled={!isAdmin}            
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {userId, isAdmin}  = React.useContext(AuthContext);
  const { type, numSelected, selected } = props;
  const router = useRouter();

  const createBoard = () => {
    router.push(`/boardwrite/${type}`);
  }

  const deleteBoard = () => {
    if (
      window.confirm(
        "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
      )
    ) {
      selected.map((no) => {
        BoardService.deleteBoard(no).then((res) => {
          if (res.status === 200) {
            console.log("deleteBoard => " + JSON.stringify(res.data));
          } else {
            console.log("deleteBoard error => " + JSON.stringify(res.data));
            alert("글 삭제에 실패하였습니다.");
          }
        });
      });
      router.reload();
    }
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          No selected
        </Typography>
      )}

      {isAdmin && numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteBoard}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={createBoard}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function BoardList(props) {

  let { type, pageno } = props;
  if (pageno === undefined) pageno = 1;

  const {userId, isAdmin}  = React.useContext(AuthContext);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageInfo, setPageInfo] = React.useState({
    p_num: pageno,
    paging: {
      "currentPageNum": 1,
      "objectCountTotal": 37,
      "objectCountPerPage": 10,
      "objectStartNum": 0,
      "objectEndNum": 15,
      "pageNumCountTotal": 1,
      "pageNumCountPerPage": 10,
      "pageNumStart": 1,
      "pageNumEnd": 3,
      "prev": false,
      "next": true
    },
    boards: [],
  });

  const router = useRouter();

  React.useEffect(() => {
    BoardService.getBoards(type, pageInfo.p_num, pageInfo.paging.objectCountPerPage).then((res) => {
//      console.log("getBoards => " + JSON.stringify(res.data));
      setPageInfo({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });

    return () => {

    };
  }, [type]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = pageInfo.boards.map((n) => n.no);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleDoubleClick = (event, id) => {
    router.push(`/boardread/${type}/${id}/${pageInfo.p_num}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    BoardService.getBoards(type, newPage + 1, pageInfo.paging.objectCountPerPage).then((res) => {
      setPageInfo({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const count_per_page = parseInt(event.target.value, 10);
    setRowsPerPage(count_per_page);
    setPage(0);
    BoardService.getBoards(type, 1, count_per_page).then((res) => {
      setPageInfo({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pageInfo.objectCountTotal) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar type={type} numSelected={selected.length} selected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={pageInfo.boards.length}
            />
            <TableBody>
              {pageInfo.boards.map((item, index) => {
                const isItemSelected = isSelected(item.no);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, item.no)}
                    onDoubleClick={(event) => handleDoubleClick(event, item.no)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={item.no}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox" width="5%">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}                        
                        disabled={!isAdmin}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                      width="5%"
                    >
                      {item.no}
                    </TableCell>
                    <TableCell align="left" width="40%">{item.title}</TableCell>
                    <TableCell align="center" width="10%">{item.writer}</TableCell>
                    <TableCell align="center" width="15%">{
                      new Date(item.createdTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      }).replace(/\./g, '-').replace(/ /, ' ').replace(/:/g, ':')}
                    </TableCell>
                    <TableCell align="center" width="15%">{
                      new Date(item.updatedTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      }).replace(/\./g, '-').replace(/ /, ' ').replace(/:/g, ':')}
                    </TableCell>
                    <TableCell align="center" width="5%">{item.likes}</TableCell>
                    <TableCell align="center" width="5%">{item.counts}</TableCell>
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
          count={pageInfo.paging.objectCountTotal}
          rowsPerPage={rowsPerPage}
          page={pageInfo.p_num - 1}
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


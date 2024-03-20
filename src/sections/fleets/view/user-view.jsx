import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { useNavigate } from "react-router-dom";

import Toolbar from '@mui/material/Toolbar';


// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress } from '@mui/material';

import { users } from 'src/_mock/user';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { typeOfFleet } from 'src/data/fleet';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@emotion/react';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER, NAV } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import axios from 'axios';

// ----------------------------------------------------------------------
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState();
  const [pathQ, setPathQ] = useState();

  const [tabData, setTabData] = useState();

  const navigate = useNavigate();
  const pathname = usePathname();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    var pn = pathname.split("/")[2];
    console.log(pn);
    // setValue(pn);
    var new_value = 1;
    if (!pn) {
      setValue(1);
      return;
    }
    for (var i = 0; i < typeOfFleet.length; i++) {
      if (typeOfFleet[i].path == pn) {
        console.log(typeOfFleet[i].id);
        setValue(typeOfFleet[i].id);
        return;
      }
    }
  }, [pathname])

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    async function getAllVehicles() {
      await axios.get("http://localhost:5050/y/vehicle/erpvehicles",
        { withCredentials: true }
      )
        .then((res) => {
          console.log(res.data);
          setTabData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getAllVehicles();
  }, [])

  return (
    <>
      <TabContext value={value}>
        <Box sx={{
          position: 'fixed',
          width: '100%',
          // boxShadow: 'none',
          // height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 10,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          // background: "white",
          // transition: theme.transitions.create(['height'], {
          //   duration: theme.transitions.duration.shorter,
          // }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            // height: HEADER.H_DESKTOP,
          }),
        }}

        >
          <Toolbar
            sx={{
              height: 1,
              px: { lg: 5 },
            }}
          >
            <Typography sx={{ flexGrow: 0 }} variant="h4">Fleets</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
          </Toolbar>
          {/* 
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
          <Box sx={{
            borderBottom: 1, borderColor: 'divider', marginBottom: 2,
          }}>
            <TabList onChange={handleChange} aria-label="basic tabs example">
              {typeOfFleet.map((el, in2) => {
                // console.log(in2);
                return (
                  <Tab label={el.name} value={Number(in2 + 1)} onClick={() => { navigate(`/fleets/${el.path}`) }} />
                )
              })}
            </TabList>
          </Box>

        </Box>
      </TabContext>
      <Container sx={{ width: "100%" }}>


        {/* <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
        <Box sx={{ paddingTop: "9rem" }}>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={users.length}
                    numSelected={selected.length}
                    // onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'Veh', label: 'Vehicle No.' },
                      { id: 'summary', label: 'Summary' },
                      { id: 'role', label: 'Driver Info.' },
                      { id: 'isVerified', label: 'Current Status', align: 'center' },
                      { id: 'status', label: 'Status' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {tabData ?
                      <>
                        {tabData.map((row) => (
                          <UserTableRow
                            key={row._id}
                            name={row.VEHNO}
                            role={row.role}
                            status={row.status}
                            company={row.DriverName}
                            avatarUrl={row.avatarUrl}
                            isVerified={row.isVerified}
                            selected={selected.indexOf(row.name) !== -1}
                            handleClick={(event) => handleClick(event, row.name)}
                          />
                        ))}
                      </>
                      :
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <CircularProgress />
                      </Box>


                      // <TableEmptyRows
                      //   height={77}
                      //   emptyRows={emptyRows(page, rowsPerPage, users.length)}
                      // />

                      // {notFound && <TableNoData query={filterName} />}
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Box>


      </Container>
    </>

  );
}

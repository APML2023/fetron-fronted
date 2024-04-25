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
import { useLocation, useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Skeleton, TableCell, TableRow } from '@mui/material';

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
import { useQuery } from '@tanstack/react-query';
import ALoader from 'src/components/ALoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { width } from '@mui/system';

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

  const [skipValue, setSkipValue] = useState(0);

  const [fetchVehicleLoading, setFVLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  // const { isPending, error, data, refetch } = useQuery({
  //   queryKey: ['fleetData'],
  //   queryFn: async () => {
  //     pn = pathname.split("/")[2];
  //     setFVLoading(true);
  //     var dpn = pn;
  //     var ssk = skipValue;
  //     if (!dpn || dpn == "" || dpn == "all") {
  //       dpn = "available";
  //     }
  //     dpn = dpn.replace("-", "_")
  //     dpn = dpn.replace("-", "_")
  //     const result = await axios.get(`http://localhost:5050/y/vehicle/erpvehicles?status=${dpn}&skip=${ssk}`,
  //       { withCredentials: true }
  //     )
  //       .then((res) => {
  //         // console.log(res.data);
  //         return res.data.data;
  //         // setTabData(res.data.data);
  //       })
  //     return result;
  //     // .catch((err) => {
  //     // setTabData([]);
  //     // window.alert("Some error occurred")
  //     // console.log(err);
  //     // })
  //     // setFVLoading(false);
  //   }
  // })


  // useEffect(() => {
  //   if (isPending) {
  //     // console.log("Pending....")
  //     setFVLoading(true);
  //     setTabData([]);
  //   }
  //   else if (data) {
  //     setFVLoading(false);
  //     setTabData(data);
  //     console.log(data);
  //   }
  // }, [isPending, data, error]);


  const navigate = useNavigate();
  const pathname = usePathname();
  var pn = pathname.split("/")[2];



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
    // var pn = pathname.split("/")[2];
    // console.log(pn);
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
    // refetch();
  }, [pn])

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  // const pathName = useLocation().pathname;

  async function getAllVehicles() {
    pn = pathname.split("/")[2];
    setFVLoading(true);
    var dpn = pn;
    var ssk = skipValue;
    if (!dpn || dpn == "") {
      dpn = "all";
    }
    dpn = dpn.replace("-", "_")
    dpn = dpn.replace("-", "_")
    await axios.get(`http://localhost:5050/y/vehicle/erpvehicles?status=${dpn}&skip=${ssk}`,
      { withCredentials: true }
    )
      .then((res) => {
        // console.log(res.data);
        setTabData(res.data.data);
      })
      .catch((err) => {
        setTabData([]);
        window.alert("Some error occurred")
        // console.log(err);
      })
    setFVLoading(false);
  }

  useEffect(() => {
    getAllVehicles();
    // }
    // refetch();
  }, [pathname]);

  useEffect(() => {
    if (fetchAgain) {
      getAllVehicles();
      setFetchAgain(false);
    }
  }, [fetchAgain])

  return (
    <>
      <ALoader isLoading={fetchVehicleLoading} />

      <Container sx={{ width: "100%", maxWidth: "100%" }}>
        <TabContext value={value} className="w-full" sx={{ width: "100%" }}>
          <Box sx={{
            // position: 'fixed',
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
            // ...(lgUp && {
            //   width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            //   // height: HEADER.H_DESKTOP,
            // }),
          }}
          >
            <Toolbar
              sx={{
                // height: 1,
                // px: { lg: 12 },
                // width: "100%",
                // background: "grey"
              }}
              className='flex justify-between w-full'
            >
              <div className='w-full gap-2 flex justify-start items-center'>
                <Typography sx={{ flexGrow: 0 }} variant="h5">Fleets</Typography>
                {/* <Box sx={{ flexGrow: 1 }} /> */}
                {/* <UserTableToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                /> */}
              </div>

              {/* <div className=''> */}
              <button className='text-sm p-2 bg-slate-100 rounded-lg hover:bg-slate-200'
                onClick={() => { setFetchAgain(true) }}

              >
                <span className='inline-flex justify-center items-center gap-1'><FontAwesomeIcon icon={faRefresh} /> Refresh</span>
              </button>
              {/* </div> */}
            </Toolbar>
            <Box sx={{
              borderBottom: 1, borderColor: 'divider', marginBottom: 2,
            }}>
              <TabList onChange={handleChange} aria-label="basic tabs example">
                {typeOfFleet.map((el, in2) => {
                  // console.log(in2);
                  return (
                    <Tab label={el.name} value={Number(in2 + 1)} onClick={() => { navigate(`/fleetMonitoring/${el.path}`) }} />
                  )
                })}
              </TabList>
            </Box>

          </Box>
        </TabContext>
        <Box
        //  sx={{ paddingTop: "8rem" }}
        >


          <Card>

            {/* <Scrollbar> */}
            <TableContainer sx={{ overflowY: 'auto', maxHeight: "calc(100vh - 12rem)" }}>
              <Table sx={{ minWidth: 800 }}>

                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  // onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Veh', label: 'Vehicle' },
                    { id: 'summary', label: 'Summary' },
                    { id: 'origin', label: 'Origin' },
                    { id: 'destination', label: 'Destination' },
                    { id: 'status', label: 'Status' }
                  ]}
                />
                {/* {pn == "enroute-for-pickup" ?
                  <>
                    {tabData && tabData.length ?
                      <TableBody>
                        {tabData.map((row) => {
                          return <>
                            {
                              row?.current_fleet && row?.current_fleet.length && row?.current_fleet[0].fleetstatus?.available === "false"
                                && !row?.current_fleet[0].fleetstatus?.atpickup
                                ?
                                // && console.log(row) ?
                                <UserTableRow
                                  // Data={tabData}
                                  key={row?.data?._id}
                                  vehicleNumber={row?.data?.VEHNO}
                                  vehicleType={row?.data?.VehicleType}
                                  status="enroute-for-pickup"
                                  vehicleData={row}
                                  // company={row.DriverName}
                                  // avatarUrl={row.avatarUrl}
                                  // isVerified={row.isVerified}
                                  selected={selected.indexOf(row.name) !== -1}
                                  handleClick={(event) => handleClick(event, row.name)}
                                />
                                // <p>Hello</p>
                                : <></>
                            }
                          </>

                        }
                        )
                        }
                      </TableBody>
                      :
                      <TableBody>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                          <CircularProgress />
                        </Box>
                      </TableBody>
                    }
                  </>
                  :
                  <></>
                } */}
                {/* {pn == "undefined" || pn != "enroute-for-pickup" ? */}
                <TableBody>
                  {tabData && tabData.length ?
                    <>
                      {tabData.map((row) => (
                        <UserTableRow
                          Data={tabData}
                          key={row?.data?._id}
                          vehicleNumber={row?.data?.VEHNO}
                          vehicleType={row?.data?.VehicleType}
                          status={row?.current_status ? Number(row.current_status) : null}
                          vehicleData={row}
                          fetchAgain={fetchAgain}
                          setFetchAgain={setFetchAgain}
                          // company={row.DriverName}
                          // avatarUrl={row.avatarUrl}
                          // isVerified={row.isVerified}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                        />
                      ))}
                    </>
                    :
                    <>
                      {
                        fetchVehicleLoading ?
                          <TableRow
                            tabIndex={- 1}
                            role="checkbox"
                            selected={selected}
                            className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                          // onClick={(e) => {
                          //   setMOpen((mopen) => !mopen);
                          // }}
                          >
                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={200} height={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>

                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>

                            <TableCell>
                              <Skeleton variant="text" width={100} height={100} />
                            </TableCell>
                          </TableRow>
                          : <div className='w-full h-full p-4 flex justify-center items-center'>No data</div>
                      }
                    </>
                  }

                </TableBody>
                {/* : <></>
                } */}

              </Table>
            </TableContainer>
            {/* </Scrollbar> */}

            {/* <TablePagination
              page={page}
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              // rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Card>
        </Box>


      </Container >
    </>

  );
}
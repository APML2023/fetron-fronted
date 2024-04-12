import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TabContext from '@mui/lab/TabContext';
import { useLocation, useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { users } from 'src/_mock/user';
import UserTableHead from '../fleets/user-table-head';
import UserTableToolbar from '../fleets/user-table-toolbar';
import {driver} from 'src/data/driver';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@emotion/react';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER, NAV } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import axios from 'axios';
import { AccordionCustomIcon } from 'src/components/AAccordian';

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  // const pathName = useLocation().pathname;

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
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          }),
        }}
        >
          <Toolbar
            sx={{
              height: 1,
              px: { lg: 5 },
            }}
          >
            <Typography sx={{ flexGrow: 0 }} variant="h4">Load Vs Available</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
          </Toolbar>

        </Box>
      </TabContext>
      <Container sx={{ width: "100%" }}>
        <Box sx={{ paddingTop: "8rem" }}>
          <Card>
            <TableContainer sx={{ overflowY: 'auto', maxHeight: "60vh" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  // onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                   { id: 'total', label: 'TOTAL VLRs' },
                    { id: 'indents', label: 'TOTAL INDENTs' },
                    { id: 'totalEnquiries', label: 'TOTAL TP ENQUIRIES' },
                    { id: 'bids', label: 'TOTAL BIDs' },
                    { id: 'unplanneds', label: 'TOTAL UNPLANNEDs' }
                  ]}
                />
              </Table>
            </TableContainer>
          </Card>
                <AccordionCustomIcon
                head="APML PALWAL HUB - 2 VLR "
                baseLoc="Base Location" loc="Chow Maharastra"
                indentsNos="0" button="Find Load"
                vrlsNos="0" nosCon="0"
                />
        </Box>
      </Container>
    </>

  );
}
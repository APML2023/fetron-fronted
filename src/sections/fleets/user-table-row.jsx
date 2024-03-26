import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCancel, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';

import { MapProvider } from "react-simple-maps"
import ModalMap from 'src/components/Modal/Map';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 3rem)',
  height: 'calc(100vh - 3rem)',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 1,
  borderRadius: 1.5,
  transition: 'all 0.2s ease-in',
};

export default function UserTableRow({
  selected,
  name,
  vehicleType,
  company,
  role,
  isVerified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [mopen, setMOpen] = useState(false);
  const [address, setAddress] = useState();

  const handleOpenMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChange = address => {
    setAddress({ address });
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  return (
    <>
      <TableRow tabIndex={-1} role="checkbox" selected={selected}
        className=' hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out'
        onClick={(e) => { setMOpen(mopen => !mopen) }}
      >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="0.4">
          <Stack direction="column" alignItems="start" spacing={0.5}>
            <p className='text-sm'>{vehicleType}</p>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Modal
        open={mopen}
        onClose={() => { setMOpen(mopen => !mopen) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='bg-transparent'
      >
        <Box className="overflow-hidden" sx={style}>
          <div className='w-full h-full flex justify-start content-center flex-col'>
            <div className='flex justify-between p-3 bg-slate-300'>
              <div className='flex justify-center content-center'>
                <p className='text-normal font-semibold'>23JhU987</p>
              </div>
              <div className='flex justify-center content-center gap-3 px-2'>
                <button><FontAwesomeIcon icon={faBell} /></button>
                <button><FontAwesomeIcon icon={faXmark} onClick={() => { setMOpen(false) }} /></button>
              </div>
            </div>
            <div className='flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm'>
              <div className='rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit'>Available</div>
              <div className='rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit'>En-route</div>
              <div className='rounded-lg border-2 border-green-300 bg-emerald-100 p-2 w-fit'>Intransit</div>
            </div>
            <div className='w-full h-96 overflow-hidden bg-sky-900'>
              <ModalMap />
            </div>
            <div className='flex justify-start items-center gap-4 w-full p-4 flex-col'>
              <div className='w-full flex justify-center items-center flex-wrap gap-4'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                  style={{ width: "calc(50% - 15px)" }}
                >
                  <p className='text-normal font-semibold bg-slate-200 w-full p-2'>Origin</p>
                  <div className='w-full p-2'>
                    <div className='w-full border-2 rounded-md border-gray-200 p-2 bg-slate-100'>
                      {/* <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete> */}
                      Mumbai
                    </div>
                  </div>

                </div>
                <div className='flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                  style={{ width: "calc(50% - 15px)" }}
                >
                  <p className='text-normal font-semibold bg-slate-200 w-full p-2'>Origin</p>
                  <div className='w-full p-2'>
                    <div className='w-full border-2 rounded-md border-gray-200 p-2 bg-slate-100'>Mumbai</div>
                  </div>
                </div>
              </div>
              <button className='rounded-lg border-2 border-cyan-900 bg-cyan-200 p-2'
                style={{ width: "calc(100% - 10px)" }}
              >Create Trip</button>
            </div>



          </div>

        </Box>
      </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

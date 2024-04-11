import SvgColor from 'src/components/svg-color';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'live Tracking',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Fleet Managment',
    path: '/fleets',
    icon: icon('ic_fleets'),
    children : [
      {
        subTitle:'Fleet Monitoring',
        subpath:'/fleetMonitoring',
      },
      {
        subTitle:'Load Assginment',
        subpath:'/loadAssginment',
      }
    ]
  },
  {
    title: 'Shipment',
    path: '/products'
  },
  {
    title: 'Consignment',
    path: '/blog'
  },
  {
    title: 'Issue Tracking',
    path: '/404'
  },
  {
    title: 'Order Management',
    path: '/404',
    children:[
      {
        subTitle:"Contract",
        path:"/Contract"
      },{
        subTitle:"Sales",
        path:"/Sales",
        nestedNav:[
          {
          childTitle:"Order",
          path:"/order"
        }
      ]
      }
    ]
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

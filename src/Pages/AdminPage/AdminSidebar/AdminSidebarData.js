import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CreateIcon from '@material-ui/icons/Create';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const AdminSidebarData = [
  {
    Icon: <WorkOutlineIcon />,
    Title: 'Account Control',
    Selection: 1,
  },
  {
    Icon: <CreateIcon />,
    Title: 'Event Control',
    Selection: 2,
  },
  {
    Icon: <ListAltIcon />,
    Title: 'Statistics',
    Selection: 3,
  },
  {
    Icon: <VerifiedUserIcon />,
    Title: 'Verification',
    Selection: 4,
  },
];

export default AdminSidebarData;

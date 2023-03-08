import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function SkeletonHolder() {
    return (
        <div className='skeleton' style={{maxWidth: '25rem' }}>
            <Skeleton variant="rectangular" width={'100%'} height={'25rem'} className="skeleton" />

            <Box sx={{ pt: 0.5 }}>
                <Skeleton width="30%" height={30} className="skeleton" />
              <Skeleton variant="rectangular" width="40%" height={'6rem'} className="skeleton" />
            </Box>
        </div>
    )
}

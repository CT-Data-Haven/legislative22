import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Panel from '../Layout/Panel/Panel';

const ProfileLink = ({ href, text }) => (
    <Link
        href={href}
        target='_blank'
        rel='noopener'
        // underline='hover'
        sx={{
            fontSize: '0.9rem',
            // textTransform: 'uppercase',
            fontWeight: 500,
        }}
    >{text}</Link>
);

const Profile = ({ topic, distInfo, data }) => {
    const title = `${topic} at a glance: ${distInfo.district}`;
    let subtitle, footer, links;
    if (distInfo.member) {
        subtitle = distInfo.member
        footer = `Includes all or part of ${distInfo.towns}`;
        links = (
            <Stack direction='row' spacing={2} sx={{ mx: 1 }}>
                <ProfileLink href={distInfo.website} text='Website' />
                <ProfileLink href={distInfo.bills} text='Current bills' />
            </Stack>
        );
    } else {
        subtitle = '';
        footer = '';
        links = <></>;
    }
    return (
        <Panel
            headings={[title, subtitle]}
            hLevels={['h2', 'h3']}
            footer={footer}
        >
            {links}
            <TableContainer sx={{ mb: 1 }}>
                <Table size='small' aria-label='Neighborhood profile table'>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{
                                    fontWeight: 'medium'
                                }}>{row.indicator}</TableCell>
                                <TableCell
                                    align='right'
                                >{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Panel>
    );
};

export default Profile;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { schemeBuPu, interpolateBuPu } from 'd3-scale-chromatic';

import App from './App.jsx';

import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';

import './index.css';
import 'leaflet/dist/leaflet.css';

const rootElement = document.getElementById('root');

const scheme = schemeBuPu;
const palette = scheme[5];
const hilite = palette[3];

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            }
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            }
        },
        MuiLink: {
            defaultProps: {
                fontWeight: 700,
            },
        },
    },
    typography: {
        fontFamily: 'Barlow, sans-serif',
        fontWeightBold: 600,
        h1: {
            fontWeight: 700,
            fontSize: '1.6rem',
            marginTop: '1rem',
            marginBottom: '1rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.05rem',
        },
        body1: {
            marginBottom: '0.5rem',
        },
        caption: {
            lineHeight: 1.25,
        }
    },
    palette: {
        primary: {
            main: hilite,
        },
        secondary: {
            main: palette[4],
        },
        background: {
            default: '#fcfcfc',
        },
    }
});

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App scheme={scheme} />
        </ThemeProvider>
    </React.StrictMode>
);
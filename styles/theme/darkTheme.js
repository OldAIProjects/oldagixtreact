import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },

          /*
            writing-mode: horizontal-tb !important;
            font-style: ;
            font-variant-ligatures: ;
            font-variant-caps: ;
            font-variant-numeric: ;
            font-variant-east-asian: ;
            font-variant-alternates: ;
            font-weight: ;
            font-stretch: ;
            font-size: ;
            font-family: monospace;
            font-optical-sizing: ;
            font-kerning: ;
            font-feature-settings: ;
            font-variation-settings: ;
            text-rendering: auto;
            color: fieldtext;
            letter-spacing: normal;
            word-spacing: normal;
            line-height: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            appearance: auto;
            -webkit-rtl-ordering: logical;
            resize: auto;
            cursor: text;
            white-space-collapse: preserve;
            text-wrap: wrap;
            overflow-wrap: break-word;
            background-color: field;
            column-count: initial !important;
            margin: 0em;
            border-width: 1px;
            border-style: solid;
            border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
            border-image: initial;
            padding: 2px;
        }*/
        },
      },
    },
  },
});

export default darkTheme;

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import CustomAppBar from "./AppBar";
import Image from "next/image";

import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";

import { loader } from "@/lib/loader";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerItems = [
  {
    text: "Agents",
    icon: <InboxIcon />,
  },
  {
    text: "Prompts",
    icon: <MailIcon />,
  },
  {
    text: "Chains",
    icon: <MailIcon />,
  },
  {
    text: "Interactions",
    icon: <MailIcon />,
  },
];

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isLoading = useSelector((state) => {
    switch (state.environment.selectedContent) {
      case "Agents":
        return state.environment.isAgentsLoading;
      case "Prompts":
        return state.environment.isPromptsLoading;
      case "Chains":
        return state.environment.isChainsLoading;
      case "Interactions":
        return state.environment.isInteractionsLoading;
    }
  });

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CustomAppBar
        drawerHandler={handleDrawerOpen}
        drawerStateHandler={open}
        drawerWidth={drawerWidth}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box ml="auto" mr="auto">
            <Image
              width={75}
              height={48}
              src="https://josh-xt.github.io/AGiXT/images/AGiXT-gradient-flat.svg"
              alt="agixt-logo"
            />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider variant="middle" />
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  loader(item.text, dispatch);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {isLoading ? <div></div> : <Layout />}
      </Main>
    </Box>
  );
}

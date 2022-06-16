import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MapIcon from "@mui/icons-material/Map";

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    sx={{ px: { xs: 0, md: 2 }, justifyContent: "center" }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            color: "inherit",
                        }}
                    >
                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                            }}
                            href="https://github.com/pillious/Bitcamp2022"
                        >
                            Github
                        </Button>
                    </Typography>
                    <MapIcon sx={{ ml: { xs: 0, md: 2 }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: { xs: 0, md: 2 },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: { xs: "normal", md: 1 },
                            color: "inherit",
                        }}
                    >
                        WilderTrace
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            color: "inherit",
                        }}
                    >
                        <Button
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                            }}
                            href="https://devpost.com/software/wild-stats"
                        >
                            Devpost
                        </Button>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

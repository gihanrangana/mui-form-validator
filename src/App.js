/*
 * Created by Gihan
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
/* Material UI Components */
import {
    Button,
    CircularProgress,
    Grid,
    Grow,
    Paper, AppBar, Toolbar, SvgIcon, IconButton,CssBaseline
} from "@material-ui/core/es/index";
import withStyles from "@material-ui/core/styles/withStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { blue } from "@material-ui/core/colors";
import { MuiForm, MuiValidator } from "mui-form-validator";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit *2
    },
    progress: {
        margin: theme.spacing.unit * 6 + "px auto",
        position: "absolute",
        right: 0,
        left: 0
    },
    posRelative: {
        position: "relative"
    }
});

function GitHub(props) {
    return (
        <SvgIcon {...props}>
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
        </SvgIcon>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            formData: {
                fname: "",
                lname: "",
                email: ""
            },
            fields: [],
            theme:'light'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ loading: false })
        }, 500);
    }


    handleSubmit = (e) => {
        // console.log(e);
        let formData = new FormData(e.target);
        formData.append("data", JSON.stringify(this.state.formData));
        let data = JSON.parse(formData.getAll("data"));
    };


    handleChange = (e) => {
        console.log(e.target);
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({ formData });
        console.log(this.state.formData);
    };

    //register fields to validate
    register(field) {
        let s = this.state.fields;
        s.push(field);
        this.setState({ fields: s });
    };

    handleThemeChange() {
        const theme = this.state.theme;
        if (theme === "light") {
            this.setState({ theme: "dark" })
        } else {
            this.setState({ theme: "light" })
        }
    }

    handleChange = (e) => {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({ formData });
    };

    render() {
        const { classes } = this.props;

        const theme = createMuiTheme({
            palette: {
                secondary: {
                    main: blue[700],
                },
                type: this.state.theme,
                background : {
                    default: this.state.theme === 'dark' ? '#424242' : '#ffffff'
                }
            },
        });


        if (this.state.loading) {
            return (
                <div className={classes.posRelative}>
                    <CircularProgress size={80} className={classes.progress} />
                </div>
            )
        }

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="secondary" variant={"raised"} onClick={this.handleThemeChange}>Change Theme
                            Light / Dark</Button>

                            <div style={{ flexGrow: 1 }} />

                            <IconButton style={{ color: '#fff' }} component={'a'} href={'https://github.com/GihanRangana/mui-form-validator'}>
                                <GitHub />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Grow in={true} style={{ transformOrigin: "0 0 0" }}>
                        <Paper className={classes.root}>

                            <MuiForm
                                onSubmit={this.handleSubmit}
                                noValidate onComponentMounted={this.register} fields={this.state.formData}>

                                <Grid container spacing={16}>
                                    <Grid item xs={12} sm={5}>
                                        <MuiValidator placeholder={"First Name"} name={"fname"} type={"text"} label={'First Name'}
                                            onChange={this.handleChange} value={this.state.formData.fname}
                                            inputProps={{ required: true }} onComponentMounted={this.register}
                                            fullWidth={true} fields={this.state.formData} />
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <MuiValidator placeholder={"Last Name"} label={'Last Name'} name={"lname"}
                                            onChange={this.handleChange} value={this.state.formData.lname}
                                            inputProps={{ required: true }} onComponentMounted={this.register}
                                            fullWidth={true} />
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <MuiValidator placeholder={"Email"} label={'Email'} name={"email"} type={"email"}
                                            onChange={this.handleChange} value={this.state.formData.email}
                                            inputProps={{ required: true }} onComponentMounted={this.register}
                                            fullWidth={true} />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Button type={"submit"} variant={"raised"} color={"primary"}>Submit</Button>
                                    </Grid>

                                </Grid>

                            </MuiForm>
                        </Paper>
                    </Grow>
                </MuiThemeProvider>
            </div>
        );
    }

}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
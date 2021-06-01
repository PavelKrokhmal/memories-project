import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, ButtonBase} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = () => {

    }

    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleChanged = (event) => {

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input 
                                    name="firsName" 
                                    label="First name" 
                                    handleChanged={handleChanged} 
                                    autoFocus 
                                    half/>
                                <Input 
                                    name="lastName" 
                                    label="Last name" 
                                    handleChanged={handleChanged} 
                                    half/>
                            </>
                        )}
                        <Input 
                            name="email" 
                            label="Email address" 
                            type="email" 
                            handleChanged={handleChanged}/>
                        <Input 
                            name="password" 
                            label="Password" 
                            type={showPassword ? "text" : "password"} 
                            handleChanged={handleChanged} 
                            handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input 
                            name="consfirmPassword" 
                            label="Repeat password" 
                            type="password"
                            handleChanged={handleChanged} 
                            handleShowPassword={handleShowPassword}/>}
                    </Grid>
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 
                                    'Already have an account? Sign In' 
                                    :
                                    "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

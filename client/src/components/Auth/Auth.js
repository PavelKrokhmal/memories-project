import React, {useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Avatar, Button, Paper, Grid, Typography, Container, ButtonBase} from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import Icon from './icon'

import {signUp, signIn} from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (isSignup) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
    }

    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleChanged = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in unsuccessful. Try again later.")
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
                                    name="firstName" 
                                    label="First name" 
                                    onChange={handleChanged} 
                                    autoFocus 
                                    half/>
                                <Input 
                                    name="lastName" 
                                    label="Last name" 
                                    onChange={handleChanged} 
                                    half/>
                            </>
                        )}
                        <Input 
                            name="email" 
                            label="Email address" 
                            type="email" 
                            onChange={handleChanged}/>
                        <Input 
                            name="password" 
                            label="Password" 
                            type={showPassword ? "text" : "password"} 
                            onChange={handleChanged} 
                            handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input 
                            name="confirmPassword" 
                            label="Repeat password" 
                            type="password"
                            onChange={handleChanged} 
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
                    <GoogleLogin clientId="405682172248-qefa9bbml4e0np3fedvdb9buuehsuoim.apps.googleusercontent.com" 
                        render={(renderProps) => (
                            <Button 
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"
                                className={classes.googleButton}>
                                Google sign in
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        >
                    </GoogleLogin>
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

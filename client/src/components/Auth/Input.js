import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({name, label, type, autoFocus, half, onChange, handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name} 
            label={label} 
            onChange={onChange} 
            autoFocus={autoFocus}
            type={type}
            variant="outlined"
            required
            fullWidth
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
            />
        </Grid>
    )
}

export default Input

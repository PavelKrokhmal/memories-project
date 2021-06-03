import React, {useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('memories-profile'))

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const [postData, setPostData] = useState({
        creator: '', 
        title: '', 
        message: '', 
        tags: '',
        selectedFile: ''
    })
    const classes = useStyles()

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = {...postData, name: user?.result?.name} 

        if (currentId) {
            dispatch(updatePost(currentId, data))
        } else {
            dispatch(createPost(data))
        }

        clear()
    }
    
    const clear = () => {
        setCurrentId(null)
        setPostData({
            title: '', 
            message: '', 
            tags: '',
            selectedFile: ''
        })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>   
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other`s memories. 
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={postData.title}
                        onChange={(event) => setPostData({...postData, title: event.target.value})}/>
                <TextField name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        multiline 
                        rows={4}
                        value={postData.message}
                        onChange={(event) => setPostData({...postData, message: event.target.value})}/>
                <TextField name="tags" 
                        variant="outlined" 
                        label="Tags (coma separated)" 
                        fullWidth
                        value={postData.tags}
                        onChange={(event) => setPostData({...postData, tags: event.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} 
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form
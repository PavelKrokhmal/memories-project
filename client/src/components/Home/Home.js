import React, {useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'

import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core' 
import Pagination from '../Pagination'

import {getPosts, getPostsBySearch} from '../../actions/posts'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [currentId, setCurrentId] = useState(null)

    const [search, setSearch] = useState('')

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const [tags, setTags] = useState([])

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container 
                    justify="space-between" 
                    alignItems="stretch" 
                    spacing={3} 
                    className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId = {setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => {setSearch(e.target.value)}}
                                />
                            <ChipInput style={{margin: '10px 0'}} 
                                value={tags} 
                                label="Search Tags"
                                variant="outlined"
                                onDelete={handleDelete}
                                onAdd={handleAdd}/>
                            <Button onClick={searchPost} 
                                variant="contained"
                                className={classes.searchButton} 
                                color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId = {setCurrentId}/>

                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
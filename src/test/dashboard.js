import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles.css'
import AddEdit from './edit-post'
import AddTask from './add-post'

// import BorderColorIcon from '@mui/icons-material/BorderColor';



const Dashboard = () => {
    const [posts, setposts] = React.useState([]);
    const [fetchingPosts, setfetchingPosts] = React.useState(false);



    useEffect(() => {
        const postUrl = "https://jsonplaceholder.typicode.com/users";
        const headers = {
            "content-type": "application/json",
        }
        async function fetchMyAPI() {
            let response = await fetch(postUrl, {
                headers: headers
            })
            response = await response.json()
            console.log(response);
            setfetchingPosts(true)
            setposts(response)
        }
        fetchMyAPI()
    }, [])
    
   
    return (
        <div className="dashboardPosts">
            <div className="headName">Posts
            
            <div className="addTaskbtn" ><AddTask/></div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">S No</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Website</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchingPosts ?
                            posts.map((post) => (
                                <TableRow
                                    key={post.name}
                                >
                                    <TableCell component="th" scope="post">
                                        {post.id}
                                    </TableCell>
                                    <TableCell component="th" scope="post">
                                        {post.name}
                                    </TableCell>
                                    <TableCell align="center">{post.email}</TableCell>
                                    <TableCell align="center">{post.username}</TableCell>
                                    <TableCell align="center">{post.phone}</TableCell>
                                    <TableCell align="center">{post.website}</TableCell>
                                    <TableCell align="center" className="editIcon"><AddEdit  editPost={post}/></TableCell>
                                </TableRow>
                            )) : <div className="fetchingPosts">Please wait Fetching Posts...</div>}
                    </TableBody>
                </Table>
            </TableContainer>

            
        </div>
    )
}

export default Dashboard;
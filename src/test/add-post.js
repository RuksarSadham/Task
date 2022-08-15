import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import './styles.css'

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [editPostdata, seteditPostdata] = React.useState({
        postData: {
            title: "",
            body: "",
            userId: "",
        }
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addEditPost = async () => {
        const postUrl = `https://jsonplaceholder.typicode.com/posts`;
        const headers = {
            "content-type": "application/json",
        }
        const addPost = {
            ...editPostdata.postData
        }
        await fetch(postUrl, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(addPost),
        })
            .then(async (res) => {
                if (res.status === 201) {
                    alert(`Task Added Successfully`)
                    setOpen(false);
                }
                return await res.json()
            })
            .then(async (res) => {
                console.log(res);
            })
            .catch(async (err) => {
                console.log(err);
            })
    }
    const addPostTask = (e) => {
        let posts = editPostdata.postData;
        posts[e.target.name] = e.target.value;
        seteditPostdata({ postData: posts })
    }


    return (
        <div>
            <div onClick={handleClickOpen} style={{display:"flex", alignItems:"center"}}>
            Add Task 
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Your Task"}
                </DialogTitle>
                <DialogContent>
                    <div className="inputBox"><TextField name="title" value={editPostdata.postData.title} onChange={addPostTask} placeholder="User Name" /></div>
                    <div className="inputBox"><TextField name="body" value={editPostdata.postData.body} onChange={addPostTask} placeholder="Name" /></div>
                    <div className="inputBox"><TextField name="userId" value={editPostdata.postData.userId} onChange={addPostTask} placeholder="Email" /></div>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
          </DialogContentText> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={addEditPost} autoFocus>
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

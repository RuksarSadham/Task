import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from '@mui/material/TextField';
import './styles.css'

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [editPostdata, seteditPostdata] = React.useState({
        postData: {
            title:  props.editPost?.username,
            body:  props.editPost?.name,
            userId:  props.editPost?.email,
        }
    })
 

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addEditPost = async () => {
        const postUrl = `https://jsonplaceholder.typicode.com/posts/${props.editPost.id}`;
        const headers = {
            "content-type": "application/json",
        }
        const editPost = {
            id: props.editPost.id,
            ...editPostdata.postData
        }
        await fetch(postUrl, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(editPost),
        })
            .then(async (res) => {
                if (res.status === 200) {
                    alert(`Task Edited Successfully`)
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
    const editPostTask = (e) => {
        let posts = editPostdata.postData;
        posts[e.target.name] = e.target.value;
        seteditPostdata({ postData: posts })
    }


    return (
        <div>
            <div onClick={handleClickOpen}>
                Edit
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Your Task"}
                </DialogTitle>
                <DialogContent>
                    <div className="inputBox"><TextField name="title" value={editPostdata.postData.title} onChange={editPostTask} placeholder="User Name" /></div>
                    <div className="inputBox"><TextField name="body" value={editPostdata.postData.body} onChange={editPostTask} placeholder="Name" /></div>
                    <div className="inputBox"><TextField name="userId" value={editPostdata.postData.userId} onChange={editPostTask} placeholder="Email" /></div>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
          </DialogContentText> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={addEditPost} autoFocus>
                        Edit Task
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import { Button, Grid } from '@mui/material'
import React from 'react'
import style from "./index.module.css";
import { useState } from 'react';
import { useDeleteMessageDataMutation } from '../../../store/apis/meMessageApi';
const Data = ({ item, color }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteMessageData, results] = useDeleteMessageDataMutation();

    const deleteItem = () => {
        deleteMessageData(item._id)
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            {
                results.isLoading ? ("Delete...") : (<div
                    style={color}
                    className={style.gridItem}
                    onClick={() => setIsOpen(!isOpen)}
                    title="Click Me"
                >
                    <div>
                        Full Name:{" "}
                        <strong>
                            {item.name} {item.surname}
                        </strong>
                    </div>
                    <div>
                        Email: <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                    {isOpen && (
                        <div>
                            <p><strong>- {item.message}</strong></p>
                            <Button onClick={deleteItem} variant='contained' color='error'>Delete</Button>
                        </div>
                    )}

                </div>)
            }
        </Grid>
    )
}

export default Data
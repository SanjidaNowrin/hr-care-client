import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import useAuth from '../../../../hooks/useAuth'

const Request = () => {
    const { user } = useAuth();
    const [tasksDone, SetTaskDone] = useState([]);
    // const [workinProgress, setworkinProgress] = useState([])
    useEffect(() => {
        fetch(`https://ancient-thicket-61342.herokuapp.com/taskAssign`)
            .then(res => res.json())
            .then(data => SetTaskDone(data.data))
    }, []);
    //total work
    const totalWork = tasksDone.map(taskId => taskId.tags.length);
    const workResult = totalWork.concat();
    console.log(workResult)

    //array number sum
    let totalWorkSum = 0;

    for (let i = 0; i < workResult.length; i++) {
        totalWorkSum += workResult[i];
    }
    console.log(totalWorkSum);

    //total work done
    const totalWorkinProgress = tasksDone.map(taskComplete => taskComplete.taskDone.length);
    const workdoneResult = totalWorkinProgress.concat();
    console.log(workdoneResult);

    //array work done number sum
    let doneWorkSum = 0;

    for (let i = 0; i < workdoneResult.length; i++) {
        doneWorkSum += workdoneResult[i];
    }
    console.log(doneWorkSum);

    //total work on fild
    const totalOnfild = totalWorkSum - doneWorkSum;
    console.log(totalOnfild);

    //persentage of workin Prcess
    const persentageWorkProgress = (100 * totalOnfild) / totalWorkSum;
    const persentWorkProcess = persentageWorkProgress.toFixed();
    //persentage Of Work Done
    const persentageOfWorkDone =(100 * doneWorkSum) / totalWorkSum;
   const persentWorkDone = persentageOfWorkDone.toFixed();


    return (
        <div style={{ padding: "10px", boxShadow: "1px 4px 8px 0px", marginTop: '60px', background: "#c3e4f7" }}>
            <h3 style={{ textAlign: "center" }}>Request</h3>
            <div className="paper-request">
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className="icon">
                            <h4><CameraswitchIcon></CameraswitchIcon></h4>
                            <h4><AddTaskIcon></AddTaskIcon></h4>
                            <h4><CameraswitchIcon></CameraswitchIcon></h4>
                            <h4><AddTaskIcon></AddTaskIcon></h4>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="item">
                            <h4>Employee Work in Progress</h4>
                            <h4>Employee Work Done</h4>
                            <h4>Employee Total Holiday</h4>
                            <h4>Employee Total Leave</h4>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="count">
                            <h4>{persentWorkProcess}%</h4>
                            <h4>{persentWorkDone}%</h4>
                            <h4>80%</h4>
                            <h4 style={{ marginTop: '5px' }}>20%</h4>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Request;
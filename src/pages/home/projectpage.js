import { useEffect } from "react"
import { DataStore } from '@aws-amplify/datastore';
import { NewProject } from '../../models';
import Header from "./header";

const ProjectPage = () => {
    useEffect(()=>{
        DataStore.query(NewProject).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    })
    return (
        <div>
            <Header/>
            <p>Project Project</p>
        </div>
    )
}

export default ProjectPage
import { useParams } from "react-router-dom"

const ProjectPreview = () => {
    const {pid} = useParams()
    return (
        <div>
            <p>Preocject preview : {pid}</p>
        </div>
    )
}

export default ProjectPreview
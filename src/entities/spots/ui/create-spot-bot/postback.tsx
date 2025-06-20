import AddPixel from "@feature/add-pixel";

type PostBackSpotAppProps = {
    name: string
};


const PostBackTab = ({ name }: PostBackSpotAppProps) => {
    return (
        <>
            <AddPixel name={name} />
        </>
    )
}

export default PostBackTab
const Page = ({image, link, text, about}) => {
    return (
        <>
            <div className="box">
                <a href={link} target="_blank" rel="noreferrer noopener">
                    <img src={image} className="image"></img>
                    <div className="text">
                        <h1>{text}</h1>
                        <p>{about}</p>
                    </div>
                </a>
            </div>
        </>
    )
}

export default Page;
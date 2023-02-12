import React from "react"

export default function Form(props) {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        img:"http://i.imgflip.com/1bij.jpg"
    })

    const [memeData, setMemeData] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setMemeData(data.data.memes)) 
    }, [])

    function handleClick(){
        const index = Math.floor(Math.random() * memeData.length)
        const url = memeData[index].url
        setMeme((prev) => {
            return {
                ...prev,
                img:url
            }
        })
    }

    function handleChange(event) {
        const {name,value} = event.target
        setMeme( prev => ({
            ...prev,
            [name] : value
        }))
    }

    return (
        <main>
                <div className="form">
                    <input type="text"  className="form-input1"  name="topText" value={meme.topText} placeholder="Top text" onChange={handleChange}/>
                    <input type="text"  className="form-input2" placeholder="Bottom text" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
                    <button className="form-btn" onClick={handleClick}>Get a new meme image 🖼</button>
                </div>
                <div className="meme">
                    <img src={meme.img} className="meme-img"/>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
        </main>
    )
}
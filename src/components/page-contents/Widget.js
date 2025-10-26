import { useEffect } from "react";

const Widget = ({title, description="", link="", summary, badges, badgeColours}) => {

    useEffect(() => {
        console.log(badgeColours)
    }, [badgeColours])

    const shuffle = (array) => {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array
    }

    return <div className="item-widget">
        <p className="widget-title">
            {(link === "")? <h4>{title}</h4> : <h4><a href={link}>{title}</a></h4>}
            <i>{description}</i>
        </p>
        <p className="widget-description">
            {summary}
        </p>
        <div className="widget-badges">
            {shuffle(badges).map((badgeName) => {
                const colour = `hsl(${badgeColours[badgeName]}, 90%, 80%)`
                return <p className="widget-badge" style={{backgroundColor: colour}}>
                    {badgeName}
                </p>
            })}
        </div>
    </div>
}

export default Widget;